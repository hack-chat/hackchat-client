/**
 * ChatInput provides a textarea for user input, manages message history,
 * and displays command suggestions.
 */

import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  memo,
  useImperativeHandle,
  forwardRef,
} from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import EmojiConvertor from 'emoji-js';
import { FaPaperPlane } from 'react-icons/fa';

import { COMMANDS, MAX_MSG_HISTORY, KAOMOJI } from './constants';
import messages from './messages';

import Container from './Container';
import UserInput from './UserInput';
import SendButton from './SendButton';
import { SuggestionContainer, SuggestionItem } from './SuggestionBox';

const emoji = new EmojiConvertor();
emoji.replace_mode = 'unified';
emoji.allow_native = true;

const parseMessage = (text) => {
  if (!text) return '';

  let processedText = text;
  Object.keys(KAOMOJI).forEach((shortcode) => {
    processedText = processedText.split(shortcode).join(KAOMOJI[shortcode]);
  });

  return emoji.replace_colons(processedText);
};

function ChatInput({ channel, users, onSendMessage }, ref) {
  const [inputValue, setInputValue] = useState('');
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [suggestions, setSuggestions] = useState([]);
  const [activeSuggestion, setActiveSuggestion] = useState(0);

  const [mentionState, setMentionState] = useState({
    isCycling: false,
    originalPrefix: '',
    matches: [],
    currentIndex: 0,
    startIndex: -1,
  });

  const inputRef = useRef(null);

  const resizeTextarea = useCallback(() => {
    if (inputRef.current) {
      const el = inputRef.current;
      el.style.height = 'auto';
      el.style.height = `${el.scrollHeight}px`;
    }
  }, []);

  const insertTextAtCaret = (text) => {
    if (!inputRef.current) return;

    const input = inputRef.current;
    const start = input.selectionStart;
    const end = input.selectionEnd;
    const currentValue = input.value;

    const newValue =
      currentValue.substring(0, start) + text + currentValue.substring(end);

    setInputValue(newValue);

    setTimeout(() => {
      input.focus();
      const newCursorPos = start + text.length;
      input.setSelectionRange(newCursorPos, newCursorPos);
      resizeTextarea();
    }, 0);
  };

  useImperativeHandle(ref, () => ({
    setCommand: (commandText) => {
      setInputValue(commandText);
      if (inputRef.current) {
        inputRef.current.focus();
      }

      setTimeout(resizeTextarea, 0);
    },
    insertText: (textToInsert) => {
      insertTextAtCaret(textToInsert);
    },
  }));

  useEffect(() => {
    if (inputValue.startsWith('/')) {
      const commandText = inputValue.slice(1).toLowerCase();
      const filtered = COMMANDS.filter((cmd) =>
        cmd.command.startsWith(commandText),
      );
      setSuggestions(filtered);
      setActiveSuggestion(0);
    } else {
      setSuggestions([]);
    }
  }, [inputValue]);

  const updateHistory = useCallback(
    (text) => {
      if (!text) return;
      const newHistory = [text, ...history.filter((h) => h !== text)].slice(
        0,
        MAX_MSG_HISTORY,
      );
      setHistory(newHistory);
    },
    [history],
  );

  const submitInput = useCallback(() => {
    const text = parseMessage(inputValue.trim());

    if (text) {
      onSendMessage(channel, text);
      updateHistory(text);
      setInputValue('');
      setHistoryIndex(-1);
      setMentionState((prev) => ({ ...prev, isCycling: false }));
      setTimeout(resizeTextarea, 0);
    }
  }, [inputValue, onSendMessage, channel, updateHistory, resizeTextarea]);

  const handleKeyDown = useCallback(
    (evt) => {
      if (evt.key !== 'Tab' && evt.key !== 'Shift' && mentionState.isCycling) {
        setMentionState((prev) => ({ ...prev, isCycling: false }));
      }

      if (evt.key === 'Enter' && !evt.shiftKey) {
        evt.preventDefault();
        if (suggestions.length > 0 && activeSuggestion < suggestions.length) {
          const selectedCommand = suggestions[activeSuggestion];
          setInputValue(`/${selectedCommand.command} `);
          setSuggestions([]);
        } else {
          submitInput();
        }
      } else if (evt.key === 'ArrowUp') {
        if (suggestions.length > 0) {
          evt.preventDefault();
          setActiveSuggestion((prev) => (prev > 0 ? prev - 1 : 0));
        } else {
          if (historyIndex !== -1 && inputRef.current.selectionStart !== 0) {
            evt.preventDefault();
            inputRef.current.setSelectionRange(0, 0);
            return;
          }

          if (inputRef.current.selectionStart === 0) {
            evt.preventDefault();
            const newIndex = Math.min(historyIndex + 1, history.length - 1);
            if (newIndex >= 0) {
              setHistoryIndex(newIndex);
              setInputValue(history[newIndex]);
              setTimeout(resizeTextarea, 0);
            }
          }
        }
      } else if (evt.key === 'ArrowDown') {
        if (suggestions.length > 0) {
          evt.preventDefault();
          setActiveSuggestion((prev) =>
            prev < suggestions.length - 1 ? prev + 1 : prev,
          );
        } else if (inputRef.current.selectionStart === inputValue.length) {
          evt.preventDefault();
          const newIndex = Math.max(historyIndex - 1, -1);
          setHistoryIndex(newIndex);
          setInputValue(newIndex >= 0 ? history[newIndex] : '');
          setTimeout(resizeTextarea, 0);
        }
      } else if (evt.key === 'Tab') {
        evt.preventDefault();

        if (suggestions.length > 0) {
          const selectedCommand = suggestions[activeSuggestion];
          setInputValue(`/${selectedCommand.command} `);
          setSuggestions([]);
        } else {
          const cursor = inputRef.current.selectionStart;
          let mState = { ...mentionState };

          if (!mState.isCycling) {
            const textBeforeCursor = inputValue.slice(0, cursor);
            const match = textBeforeCursor.match(/(?:^|\s)(@\S+)$/);

            if (match) {
              const prefix = match[1].toLowerCase();
              const startIndex = cursor - match[1].length;
              const userList = users
                ? Object.values(users).map((u) => u.username)
                : [];

              const matches = userList.filter((u) =>
                `@${u.toLowerCase()}`.startsWith(prefix),
              );

              if (matches.length > 0) {
                mState = {
                  isCycling: true,
                  originalPrefix: prefix,
                  matches,
                  currentIndex: 0,
                  startIndex,
                };
              }
            }
          } else {
            mState.currentIndex =
              (mState.currentIndex + 1) % mState.matches.length;
          }

          if (mState.isCycling) {
            const matchName = `@${mState.matches[mState.currentIndex]}`;
            const textBefore = inputValue.slice(0, mState.startIndex);
            const textAfter = inputValue.slice(inputRef.current.selectionEnd);

            const newValue = textBefore + matchName + textAfter;
            setInputValue(newValue);
            setMentionState(mState);

            setTimeout(() => {
              if (inputRef.current) {
                const newCursor = mState.startIndex + matchName.length;
                inputRef.current.setSelectionRange(newCursor, newCursor);
                resizeTextarea();
              }
            }, 0);
          }
        }
      }
    },
    [
      submitInput,
      history,
      historyIndex,
      inputValue,
      suggestions,
      activeSuggestion,
      resizeTextarea,
      mentionState,
      users,
    ],
  );

  const handleInputChange = (evt) => {
    setInputValue(evt.target.value);
    resizeTextarea();

    if (historyIndex !== -1) {
      setHistoryIndex(-1);
    }

    if (mentionState.isCycling) {
      setMentionState((prev) => ({ ...prev, isCycling: false }));
    }
  };

  return (
    <Container>
      {suggestions.length > 0 && (
        <SuggestionContainer>
          {suggestions.map((cmd, index) => (
            <SuggestionItem
              key={cmd.command}
              className={index === activeSuggestion ? 'active' : ''}
              onClick={() => {
                setInputValue(`/${cmd.command}`);
                setSuggestions([]);
                inputRef.current.focus();
              }}
            >
              /{cmd.command} <span>{cmd.params.join(' ')}</span>
            </SuggestionItem>
          ))}
        </SuggestionContainer>
      )}
      <FormattedMessage
        id={messages.MainInput.id}
        defaultMessage={messages.MainInput.defaultMessage}
      >
        {(placeholder) => (
          <UserInput
            ref={inputRef}
            autoFocus
            rows="1"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
          />
        )}
      </FormattedMessage>
      <SendButton onClick={submitInput}>
        <FaPaperPlane />
      </SendButton>
    </Container>
  );
}

const ChatInputWithRef = forwardRef(ChatInput);
ChatInputWithRef.displayName = 'ChatInput';
ChatInputWithRef.propTypes = {
  channel: PropTypes.string,
  users: PropTypes.object,
  onSendMessage: PropTypes.func.isRequired,
};

export default memo(ChatInputWithRef);
