/**
 * ChatManager displays the list of messages for a channel.
 */

import React, {
  useEffect,
  useRef,
  useMemo,
  useState,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import { Virtuoso } from 'react-virtuoso';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { BiArrowToBottom } from 'react-icons/bi';

import { Message } from 'components/Message';
import MessageFormatter from 'components/MessageFormatter';
import UserContextMenu from 'components/UserContextMenu';
import MessageContextMenu from 'components/MessageContextMenu';
import SearchBar from 'components/SearchBar';
import NickPlaceholder from 'components/Message/NickPlaceholder';

import messages from './messages';

import ChatFooter from './ChatFooter';
import Wrapper from './Wrapper';
import MobileTopBar from './MobileTopBar';
import MobileMenuToggle from './MobileMenuToggle';
import ChannelName from './ChannelName';
import MobileTopBarContent from './MobileTopBarContent';
import ScrollToBottomButton from './ScrollToBottomButton';

const EMPTY_USER = {};

export function ChatManager({
  channel,
  channelData,
  handleMenuCommand,
  handleInsertText,
  onExternalLinkClick,
  onTxAttemptClick,
  intl,
  externalScrollRef,
  isWalletConnected,
  isActive,
  isMobile,
  isSimpleSearchOpen,
  onToggleMainMenu,
  toggleSimpleSearch,
  myUsername,
  onAtBottomChange,
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const searchTargetId = location.state?.searchTargetId;

  const virtuosoRef = useRef(null);
  const isAtBottomRef = useRef(true);
  const welcomeTextRef = useRef(null);
  const processedSearchTargetRef = useRef(null);

  const [contextMenu, setContextMenu] = useState(null);
  const [messageContextMenu, setMessageContextMenu] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [mentionsOnly, setMentionsOnly] = useState(false);
  const [activeMatchCursor, setActiveMatchCursor] = useState(0);
  const [externalHighlightIndex, setExternalHighlightIndex] = useState(-1);
  const [isAtBottom, setIsAtBottom] = useState(true);

  const currentChannelData = useMemo(
    () => (channelData && channelData[channel]) || { users: [], messages: [] },
    [channelData, channel],
  );

  const matchingIndices = useMemo(() => {
    if (!isSimpleSearchOpen) return [];

    if (
      !currentChannelData ||
      !currentChannelData.messages ||
      !Array.isArray(currentChannelData.messages)
    ) {
      return [];
    }

    if (!searchQuery && !mentionsOnly) return [];

    let activeQuery = searchQuery.toLowerCase();

    if (mentionsOnly && myUsername) {
      activeQuery = `@${myUsername.toLowerCase()}`;
    }

    if (!activeQuery) return [];

    const matches = [];
    currentChannelData.messages.forEach((msg, index) => {
      if (msg && (msg.type === 'chat' || msg.type === 'whisper') && msg.data) {
        let rawString = '';

        if (typeof msg.data.content === 'string') {
          rawString = msg.data.content;
        } else if (
          msg.data.content &&
          typeof msg.data.content === 'object' &&
          msg.data.content.text
        ) {
          rawString = msg.data.content.text;
        } else {
          const extractText = (content) => {
            if (!content) return '';
            if (typeof content === 'string') return content;
            if (typeof content === 'number') return content.toString();

            if (Array.isArray(content))
              return content.map(extractText).join('');

            if (typeof content === 'object') {
              if (content.props && content.props.children)
                return extractText(content.props.children);

              if (content.text) return content.text;
            }

            return '';
          };
          rawString = extractText(msg.data.content);
        }

        if (rawString && rawString.toLowerCase().includes(activeQuery)) {
          matches.push(index + 1);
        }
      }
    });

    return matches;
  }, [
    currentChannelData.messages,
    searchQuery,
    mentionsOnly,
    myUsername,
    isSimpleSearchOpen,
  ]);

  const handleNextMatch = useCallback(() => {
    if (matchingIndices.length === 0) return;

    const nextCursor = (activeMatchCursor + 1) % matchingIndices.length;
    setActiveMatchCursor(nextCursor);

    setTimeout(() => {
      virtuosoRef.current?.scrollToIndex({
        index: matchingIndices[nextCursor],
        align: 'center',
        behavior: 'auto',
      });
    }, 0);
  }, [matchingIndices, activeMatchCursor]);

  const handlePrevMatch = useCallback(() => {
    if (matchingIndices.length === 0) return;

    const prevCursor =
      activeMatchCursor === 0
        ? matchingIndices.length - 1
        : activeMatchCursor - 1;
    setActiveMatchCursor(prevCursor);

    setTimeout(() => {
      virtuosoRef.current?.scrollToIndex({
        index: matchingIndices[prevCursor],
        align: 'center',
        behavior: 'auto',
      });
    }, 0);
  }, [matchingIndices, activeMatchCursor]);

  useEffect(() => {
    setActiveMatchCursor(0);

    if (matchingIndices.length > 0) {
      setTimeout(() => {
        virtuosoRef.current?.scrollToIndex({
          index: matchingIndices[0],
          align: 'center',
          behavior: 'auto',
        });
      }, 0);
    }
  }, [searchQuery, mentionsOnly, matchingIndices]);

  const handleCloseSearch = () => {
    setSearchQuery('');
    setMentionsOnly(false);
    toggleSimpleSearch();
  };

  const handleChatClick = (e) => {
    const linkTarget = e.target.closest('a');

    if (
      linkTarget &&
      linkTarget.getAttribute('target') === '_blank' &&
      linkTarget.href
    ) {
      e.preventDefault();
      if (onExternalLinkClick) {
        onExternalLinkClick(linkTarget.href);
      }
    }
  };

  const handleUserContextMenu = useCallback((user, event) => {
    if (user && user.mine) return;

    const selection = window.getSelection();
    if (
      selection &&
      !selection.isCollapsed &&
      selection.containsNode(event.target, true)
    ) {
      return;
    }

    event.preventDefault();
    setContextMenu({ user, x: event.clientX, y: event.clientY });
  }, []);

  const closeUserContextMenu = () => setContextMenu(null);

  const handleMessageLeftClick = useCallback(
    (payload, user) => {
      const username = user.username || payload.name || 'unknown';
      const prefix = user.mine ? '> ' : `> @${username}: `;

      const quoteText = payload.content
        .split('\n')
        .map((line, index) => (index === 0 ? `${prefix}${line}` : `> ${line}`))
        .join('\n');

      const replyString = `${quoteText}\n\n`;

      if (handleInsertText) {
        handleInsertText(replyString);
      }
    },
    [handleInsertText],
  );

  const handleMessageContextMenu = useCallback((payload, user, event) => {
    const selection = window.getSelection();
    if (
      selection &&
      !selection.isCollapsed &&
      selection.containsNode(event.target, true)
    ) {
      return;
    }

    event.preventDefault();
    setMessageContextMenu({
      payload,
      user,
      x: event.clientX,
      y: event.clientY,
    });
  }, []);

  const handleScrollToBottom = useCallback(() => {
    if (virtuosoRef.current) {
      virtuosoRef.current.scrollToIndex({
        index: 'LAST',
        align: 'end',
        behavior: 'auto',
        offset: 400,
      });
    }
  }, []);

  const closeMessageContextMenu = () => setMessageContextMenu(null);

  const handleMessageMenuAction = (command, payload, user) => {
    if (command === 'reply') {
      handleMessageLeftClick(payload, user);
    } else if (command === 'edit' && payload.id) {
      handleMenuCommand(`/edit ${payload.id} ${payload.content}`);
    }
  };

  const staticWelcomeText = useMemo(() => {
    if (welcomeTextRef.current) return welcomeTextRef.current;

    const onlineUsers = Object.values(currentChannelData.users)
      .filter((user) => user.online)
      .map((user) => user.username);

    if (onlineUsers.length === 0) {
      return `${intl.formatMessage(messages.currentChannel)} "${channel}"...`;
    }

    const usersString =
      onlineUsers.length <= 1
        ? intl.formatMessage(messages.aloneMsg)
        : `${intl.formatMessage(messages.onlineUsersText)} ${onlineUsers.join(', ')}`;

    const compiledText = `${intl.formatMessage(
      messages.currentChannel,
    )} "${channel}". ${usersString}`;

    welcomeTextRef.current = compiledText;

    return compiledText;
  }, [currentChannelData.users, channel, intl]);

  const enrichedMessages = useMemo(() => {
    let lastUserId = null;
    let stripe = false;

    const mappedMessages = currentChannelData.messages.map(
      (msg, index, allMessages) => {
        const currentUserId = msg.data.userid || (msg.user && msg.user.userid);
        const user = currentUserId
          ? currentChannelData.users[currentUserId] || msg.user || EMPTY_USER
          : msg.user || EMPTY_USER;

        const previousMsg = allMessages[index - 1];
        const previousUserId = previousMsg
          ? previousMsg.data.userid ||
            (previousMsg.user && previousMsg.user.userid)
          : null;

        const isExtended =
          previousMsg &&
          previousMsg.type === 'chat' &&
          msg.type === 'chat' &&
          previousUserId === currentUserId;

        if (currentUserId && currentUserId !== lastUserId) {
          stripe = !stripe;
          lastUserId = currentUserId;
        }

        return {
          ...msg,
          computedUser: user,
          isExtended,
          stripe,
        };
      },
    );

    const welcomeMessageObj = {
      type: 'welcome',
      data: staticWelcomeText,
      computedUser: EMPTY_USER,
      isExtended: false,
      stripe: false,
    };

    return [welcomeMessageObj, ...mappedMessages];
  }, [
    currentChannelData.messages,
    currentChannelData.users,
    staticWelcomeText,
  ]);

  useEffect(() => {
    if (
      searchTargetId &&
      isActive &&
      searchTargetId !== processedSearchTargetRef.current
    ) {
      const arrayIndex = enrichedMessages.findIndex(
        (msg) => msg.data && msg.data.id === searchTargetId,
      );

      if (arrayIndex !== -1) {
        processedSearchTargetRef.current = searchTargetId;

        const offset = Math.max(0, 1000000 - enrichedMessages.length);
        const targetIndex = arrayIndex + offset;

        setExternalHighlightIndex(targetIndex);

        setTimeout(() => {
          if (virtuosoRef.current) {
            virtuosoRef.current.scrollToIndex({
              index: targetIndex,
              align: 'center',
              behavior: 'auto',
            });
          }
        }, 150);

        setTimeout(() => {
          setExternalHighlightIndex(-1);
        }, 5000);

        const newState = { ...location.state };
        delete newState.searchTargetId;

        navigate(location.pathname + location.search, {
          replace: true,
          state: newState,
        });
      }
    }
  }, [searchTargetId, enrichedMessages, isActive, location, navigate]);

  const prevIsActiveRef = useRef(isActive);
  const prevLenRef = useRef(enrichedMessages.length);

  useEffect(() => {
    const channelSwitched = isActive && !prevIsActiveRef.current;
    const newMessagesArrived =
      isActive && enrichedMessages.length > prevLenRef.current;

    if (channelSwitched || newMessagesArrived) {
      if (
        isAtBottomRef.current &&
        virtuosoRef.current &&
        !isSimpleSearchOpen &&
        externalHighlightIndex === -1
      ) {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (virtuosoRef.current) {
              virtuosoRef.current.scrollTo({
                top: 99999999,
                behavior: 'auto',
              });
            }
          });
        });
      }
    }

    prevIsActiveRef.current = isActive;
    prevLenRef.current = enrichedMessages.length;
  }, [
    isActive,
    enrichedMessages.length,
    isSimpleSearchOpen,
    externalHighlightIndex,
  ]);

  const myPermissionLevel = useMemo(() => {
    const me = Object.values(currentChannelData.users).find(
      (user) => user.mine,
    );
    return me ? me.permissionLevel : 0;
  }, [currentChannelData.users]);

  const lastMessage = enrichedMessages[enrichedMessages.length - 1];

  const virtuosoContext = useMemo(
    () => ({
      stripe: lastMessage ? lastMessage.stripe : false,
      highlightedIndex:
        isSimpleSearchOpen && matchingIndices.length > 0
          ? matchingIndices[activeMatchCursor]
          : externalHighlightIndex,
    }),
    [
      lastMessage,
      matchingIndices,
      activeMatchCursor,
      isSimpleSearchOpen,
      externalHighlightIndex,
    ],
  );

  const virtuosoComponents = useMemo(
    () => ({
      Footer: ({ context }) => <ChatFooter $hasBackground={context?.stripe} />,
    }),
    [],
  );

  return (
    <Wrapper
      key={channel}
      translate="no"
      className="notranslate chat-log"
      onClick={handleChatClick}
      style={{ display: isActive ? 'flex' : 'none' }}
    >
      {isMobile && (
        <MobileTopBar>
          <NickPlaceholder />
          <MobileTopBarContent>
            <ChannelName>?{channel}</ChannelName>
            <MobileMenuToggle onClick={onToggleMainMenu}>
              <FaBars />
            </MobileMenuToggle>
          </MobileTopBarContent>
        </MobileTopBar>
      )}

      {isSimpleSearchOpen && (
        <SearchBar
          onClose={handleCloseSearch}
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          mentionsOnly={mentionsOnly}
          onMentionsOnlyChange={setMentionsOnly}
          matchCount={matchingIndices.length}
          currentMatchIndex={activeMatchCursor}
          onNextMatch={handleNextMatch}
          onPrevMatch={handlePrevMatch}
          resultText={
            matchingIndices.length > 0
              ? `${activeMatchCursor + 1} / ${matchingIndices.length}`
              : intl.formatMessage(messages.noResults)
          }
        />
      )}

      <Virtuoso
        ref={virtuosoRef}
        scrollerRef={(element) => {
          if (externalScrollRef) {
            externalScrollRef.current = element;
          }
        }}
        data={enrichedMessages}
        style={{ flex: 1 }}
        defaultItemHeight={50}
        increaseViewportBy={{ top: 1200, bottom: 800 }}
        initialTopMostItemIndex={enrichedMessages.length - 1}
        firstItemIndex={Math.max(0, 1000000 - enrichedMessages.length)}
        alignToBottom={true}
        followOutput={false}
        atBottomThreshold={50}
        atBottomStateChange={(atBottom) => {
          if (document.hidden) return;

          isAtBottomRef.current = atBottom;
          setIsAtBottom(atBottom);

          if (onAtBottomChange) {
            onAtBottomChange(channel, atBottom);
          }
        }}
        context={virtuosoContext}
        components={virtuosoComponents}
        itemContent={(index, msg) => (
          <Message
            isSearchHighlighted={index === virtuosoContext.highlightedIndex}
            msgForm={MessageFormatter}
            handleMention={handleMenuCommand}
            handleContextMenu={handleUserContextMenu}
            onMessageClick={handleMessageLeftClick}
            onMessageContextMenu={handleMessageContextMenu}
            extended={msg.isExtended}
            type={msg.type}
            payload={msg.data}
            user={msg.computedUser}
            intl={intl}
            hasBackground={msg.stripe}
            onTxAttemptClick={onTxAttemptClick}
          />
        )}
      />

      <UserContextMenu
        contextMenu={contextMenu}
        closeContextMenu={closeUserContextMenu}
        onCommandClick={handleMenuCommand}
        myPermissionLevel={myPermissionLevel}
        isWalletConnected={isWalletConnected}
      />

      <MessageContextMenu
        contextMenu={messageContextMenu}
        closeContextMenu={closeMessageContextMenu}
        onCommandClick={handleMessageMenuAction}
      />

      {!isAtBottom && !isSimpleSearchOpen && (
        <ScrollToBottomButton onClick={handleScrollToBottom}>
          <BiArrowToBottom />
        </ScrollToBottomButton>
      )}
    </Wrapper>
  );
}

ChatManager.propTypes = {
  channel: PropTypes.string,
  channelData: PropTypes.object,
  handleMenuCommand: PropTypes.func,
  handleInsertText: PropTypes.func,
  onExternalLinkClick: PropTypes.func,
  intl: PropTypes.object.isRequired,
  onTxAttemptClick: PropTypes.func,
  isWalletConnected: PropTypes.bool,
  externalScrollRef: PropTypes.object,
  isActive: PropTypes.bool,
  isMobile: PropTypes.bool,
  isSimpleSearchOpen: PropTypes.bool,
  onToggleMainMenu: PropTypes.func,
  toggleSimpleSearch: PropTypes.func,
  myUsername: PropTypes.string,
  onAtBottomChange: PropTypes.func,
};

export default compose(injectIntl)(ChatManager);
