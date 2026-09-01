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

const ALL_EMOJIS = [];
const seenCodes = new Set();

Object.keys(KAOMOJI).forEach((code) => {
  ALL_EMOJIS.push({ code, preview: KAOMOJI[code] });
  seenCodes.add(code);
});

if (emoji.data) {
  Object.values(emoji.data).forEach((dataArray) => {
    const shortcodes = dataArray[3];
    if (shortcodes && Array.isArray(shortcodes)) {
      shortcodes.forEach((sc) => {
        const code = `:${sc}:`;
        if (!seenCodes.has(code)) {
          ALL_EMOJIS.push({ code, preview: emoji.replace_colons(code) });
          seenCodes.add(code);
        }
      });
    }
  });
}

const isInProtectedBlock = (text, cursorIndex) => {
  const textBefore = text.substring(0, cursorIndex);
  const tokens = textBefore.match(/(```|`|\$\$|\$|==)/g);

  if (!tokens) return false;

  let inCodeBlock = false;
  let inInlineCode = false;
  let inMathBlock = false;
  let inInlineMath = false;
  let inHighlight = false;

  for (const token of tokens) {
    if (
      token === '```' &&
      !inInlineCode &&
      !inMathBlock &&
      !inInlineMath &&
      !inHighlight
    )
      inCodeBlock = !inCodeBlock;
    else if (
      token === '`' &&
      !inCodeBlock &&
      !inMathBlock &&
      !inInlineMath &&
      !inHighlight
    )
      inInlineCode = !inInlineCode;
    else if (
      token === '$$' &&
      !inCodeBlock &&
      !inInlineCode &&
      !inInlineMath &&
      !inHighlight
    )
      inMathBlock = !inMathBlock;
    else if (
      token === '$' &&
      !inCodeBlock &&
      !inInlineCode &&
      !inMathBlock &&
      !inHighlight
    )
      inInlineMath = !inInlineMath;
    else if (
      token === '==' &&
      !inCodeBlock &&
      !inInlineCode &&
      !inMathBlock &&
      !inInlineMath
    )
      inHighlight = !inHighlight;
  }

  return (
    inCodeBlock || inInlineCode || inMathBlock || inInlineMath || inHighlight
  );
};

const parseMessage = (text) => {
  if (!text) return '';

  const protectedRegex =
    /(```[\s\S]*?```|`[^`]+`|\$\$[\s\S]*?\$\$|\$[^$]+\$|==[^=]+==)/g;
  const chunks = text.split(protectedRegex);

  for (let i = 0; i < chunks.length; i++) {
    if (i % 2 === 0) {
      let processedChunk = chunks[i];
      Object.keys(KAOMOJI).forEach((shortcode) => {
        processedChunk = processedChunk
          .split(shortcode)
          .join(KAOMOJI[shortcode]);
      });
      chunks[i] = emoji.replace_colons(processedChunk);
    }
  }

  return chunks.join('');
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
  const suggestionsRef = useRef(null);

  useEffect(() => {
    if (suggestionsRef.current) {
      const activeElement = suggestionsRef.current.querySelector('.active');
      if (activeElement) {
        activeElement.scrollIntoView({
          block: 'nearest',
        });
      }
    }
  }, [activeSuggestion]);

  const updateSuggestions = useCallback((text, cursor) => {
    const textBeforeCursor = text.slice(0, cursor);

    if (textBeforeCursor.startsWith('/')) {
      const commandText = textBeforeCursor.slice(1).toLowerCase();
      const filtered = COMMANDS.filter((cmd) =>
        cmd.command.startsWith(commandText),
      );
      setSuggestions(
        filtered.map((cmd) => ({
          label: `/${cmd.command}`,
          subText: cmd.params.join(' '),
          value: `/${cmd.command} `,
          type: 'command',
          replaceStart: 0,
          replaceEnd: cursor,
        })),
      );
      setActiveSuggestion(0);
    } else {
      const match = textBeforeCursor.match(/(?:^|\s)(:[^\s:]+)$/);
      if (match) {
        const query = match[1].toLowerCase();
        const filtered = ALL_EMOJIS.filter((e) =>
          e.code.toLowerCase().startsWith(query),
        ).slice(0, 15);

        if (filtered.length > 0) {
          setSuggestions(
            filtered.map((e) => ({
              label: e.code,
              subText: e.preview,
              value: `${e.preview} `,
              type: 'emoji',
              replaceStart: cursor - match[1].length,
              replaceEnd: cursor,
            })),
          );
          setActiveSuggestion(0);
        } else {
          setSuggestions([]);
        }
      } else {
        setSuggestions([]);
      }
    }
  }, []);

  const resizeTextarea = useCallback(() => {
    window.requestAnimationFrame(() => {
      if (inputRef.current) {
        const el = inputRef.current;
        el.style.height = 'auto';
        el.style.height = `${el.scrollHeight}px`;
      }
    });
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

  const applySuggestion = useCallback(
    (sel) => {
      const textBefore = inputValue.slice(0, sel.replaceStart);
      const textAfter = inputValue.slice(sel.replaceEnd);
      const newValue = textBefore + sel.value + textAfter;

      setInputValue(newValue);
      setSuggestions([]);

      const newCursor = sel.replaceStart + sel.value.length;
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.setSelectionRange(newCursor, newCursor);
          inputRef.current.focus();
          resizeTextarea();
        }
      }, 0);
    },
    [inputValue, resizeTextarea],
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
          applySuggestion(suggestions[activeSuggestion]);
        } else {
          submitInput();
        }
      } else if (evt.key === 'ArrowUp') {
        if (suggestions.length > 0) {
          evt.preventDefault();
          setActiveSuggestion((prev) => (prev > 0 ? prev - 1 : 0));
        } else if (
          historyIndex !== -1 ||
          inputRef.current.selectionStart === 0
        ) {
          evt.preventDefault();
          const newIndex = Math.min(historyIndex + 1, history.length - 1);
          if (newIndex >= 0 && newIndex !== historyIndex) {
            setHistoryIndex(newIndex);
            setInputValue(history[newIndex]);

            setTimeout(() => {
              if (inputRef.current) {
                const len = history[newIndex].length;
                inputRef.current.setSelectionRange(len, len);
              }
              resizeTextarea();
            }, 0);
          }
        }
      } else if (evt.key === 'ArrowDown') {
        if (suggestions.length > 0) {
          evt.preventDefault();
          setActiveSuggestion((prev) =>
            prev < suggestions.length - 1 ? prev + 1 : prev,
          );
        } else if (
          historyIndex !== -1 ||
          inputRef.current.selectionStart === inputValue.length
        ) {
          evt.preventDefault();
          const newIndex = Math.max(historyIndex - 1, -1);
          if (newIndex !== historyIndex) {
            setHistoryIndex(newIndex);
            const newText = newIndex >= 0 ? history[newIndex] : '';
            setInputValue(newText);

            setTimeout(() => {
              if (inputRef.current) {
                const len = newText.length;
                inputRef.current.setSelectionRange(len, len);
              }
              resizeTextarea();
            }, 0);
          }
        }
      } else if (evt.key === 'Tab') {
        evt.preventDefault();

        if (suggestions.length > 0) {
          applySuggestion(suggestions[activeSuggestion]);
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
      applySuggestion,
    ],
  );

  const handleInputChange = (evt) => {
    let newVal = evt.target.value;
    let cursor = evt.target.selectionStart;

    if (historyIndex !== -1) {
      setHistoryIndex(-1);
    }

    if (mentionState.isCycling) {
      setMentionState((prev) => ({ ...prev, isCycling: false }));
    }

    if (!isInProtectedBlock(newVal, cursor)) {
      const textBefore = newVal.substring(0, cursor);
      const textAfter = newVal.substring(cursor);
      let replaced = false;
      let matchLength = 0;
      let replacementText = '';

      for (const shortcode of Object.keys(KAOMOJI)) {
        if (textBefore.endsWith(shortcode)) {
          replaced = true;
          matchLength = shortcode.length;
          replacementText = KAOMOJI[shortcode];
          break;
        }
      }

      if (!replaced) {
        const emojiMatch = textBefore.match(/:[a-zA-Z0-9_+-]+:$/);
        if (emojiMatch) {
          const matchedStr = emojiMatch[0];
          const potentialEmoji = emoji.replace_colons(matchedStr);

          if (potentialEmoji !== matchedStr) {
            replaced = true;
            matchLength = matchedStr.length;
            replacementText = potentialEmoji;
          }
        }
      }

      if (replaced) {
        newVal =
          textBefore.slice(0, -matchLength) + replacementText + textAfter;
        cursor = cursor - matchLength + replacementText.length;
      }
    }

    setInputValue(newVal);
    updateSuggestions(newVal, cursor);

    if (newVal !== evt.target.value) {
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.setSelectionRange(cursor, cursor);
          resizeTextarea();
        }
      }, 0);
    } else {
      resizeTextarea();
    }
  };

  return (
    <Container>
      {suggestions.length > 0 && (
        <SuggestionContainer ref={suggestionsRef}>
          {suggestions.map((item, index) => (
            <SuggestionItem
              key={item.label}
              className={index === activeSuggestion ? 'active' : ''}
              onClick={() => applySuggestion(item)}
            >
              {item.label} <span>{item.subText}</span>
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
            onKeyUp={(e) => {
              if (
                ['ArrowLeft', 'ArrowRight', 'Backspace', 'Delete'].includes(
                  e.key,
                )
              ) {
                updateSuggestions(inputValue, e.target.selectionStart);
              }
            }}
            onMouseUp={(e) =>
              updateSuggestions(inputValue, e.target.selectionStart)
            }
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
