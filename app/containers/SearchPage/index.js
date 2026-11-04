/**
 * SearchPage exports
 */

import React, {
  memo,
  useState,
  useMemo,
  useRef,
  useCallback,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useNavigate } from 'react-router-dom';
import { injectIntl } from 'react-intl';

import { makeSelectChannelData } from 'containers/CommunicationProvider/selectors';
import {
  makeSelectCachedLargeMode,
  makeSelectCachedLTR,
  makeSelectCachedUsername,
} from 'containers/SettingsPage/selectors';

import MainContainer from 'components/Generic/MainContainer';
import ScrollArea from 'components/Generic/ScrollArea';
import SettingsGroup from 'components/Generic/SettingsGroup';
import StripedContainer from 'components/Generic/StripedContainer';
import CollapsibleSection from 'components/Generic/CollapsibleSection';
import InputRow from 'components/Generic/InputRow';
import StyledInput from 'components/Generic/StyledInput';
import SwitchRow from 'components/Generic/SwitchRow';
import LabelText from 'components/Generic/LabelText';
import BooleanSwitch from 'components/Generic/BooleanSwitch';
import WideButton from 'components/Generic/WideButton';
import FooterSection from 'components/Generic/FooterSection';

import messages from './messages';

import SearchResultCard from './SearchResultCard';
import SearchResultHeader from './SearchResultHeader';
import SearchResultName from './SearchResultName';
import SearchResultChannel from './SearchResultChannel';
import SearchResultContent from './SearchResultContent';
import SearchResultJumpButton from './SearchResultJumpButton';
import ChannelContainer from './ChannelContainer';
import SearchResultsGroup from './SearchResultsGroup';
import NoResultsLabel from './NoResultsLabel';
import ResultsCountLabel from './ResultsCountLabel';

const isOverScrollable = (e) => {
  for (let el = e.target; el && el !== e.currentTarget; el = el.parentElement) {
    const { overflowY } = window.getComputedStyle(el);
    if (
      (overflowY === 'auto' || overflowY === 'scroll') &&
      el.scrollHeight > el.clientHeight
    ) {
      return true;
    }
  }

  return false;
};

export function SearchPage({
  channelData,
  cachedLargeMode,
  cachedLtr,
  cachedUsername,
  intl,
}) {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const [textQuery, setTextQuery] = useState('');
  const [searchAllChannels, setSearchAllChannels] = useState(true);
  const [selectedChannels, setSelectedChannels] = useState({});
  const [usernameQuery, setUsernameQuery] = useState('');
  const [useridQuery, setUseridQuery] = useState('');
  const [exactMatch, setExactMatch] = useState(false);
  const [mentionsOnly, setMentionsOnly] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const joinedChannels = useMemo(
    () => (channelData ? Object.keys(channelData) : []),
    [channelData],
  );

  useEffect(() => {
    const initialSelections = {};

    joinedChannels.forEach((chan) => {
      initialSelections[chan] = true;
    });

    setSelectedChannels(initialSelections);
  }, [joinedChannels]);

  const handleGlobalWheel = useCallback((e) => {
    if (scrollRef.current && !isOverScrollable(e)) {
      scrollRef.current.scrollTop += e.deltaY;
    }
  }, []);

  const handleChannelToggle = (chan) => {
    setSelectedChannels((prev) => ({ ...prev, [chan]: !prev[chan] }));
  };

  const handleSearch = () => {
    let results = [];

    const channelsToSearch = searchAllChannels
      ? joinedChannels
      : joinedChannels.filter((c) => selectedChannels[c]);

    channelsToSearch.forEach((chan) => {
      if (!channelData[chan] || !channelData[chan].messages) return;

      const msgs = channelData[chan].messages;
      msgs.forEach((msg) => {
        if (msg.type !== 'chat') return;

        let matches = true;

        if (textQuery) {
          if (exactMatch) {
            if (!msg.data.content.includes(textQuery)) matches = false;
          } else {
            if (
              !msg.data.content.toLowerCase().includes(textQuery.toLowerCase())
            )
              matches = false;
          }
        }

        if (usernameQuery && matches) {
          if (exactMatch) {
            if (msg.data.name !== usernameQuery) matches = false;
          } else {
            if (
              !msg.data.name
                ?.toLowerCase()
                .includes(usernameQuery.toLowerCase())
            )
              matches = false;
          }
        }

        if (useridQuery && matches) {
          if (msg.data.userid?.toString() !== useridQuery) matches = false;
        }

        if (mentionsOnly && cachedUsername && matches) {
          if (
            !msg.data.content
              ?.toLowerCase()
              .includes(`@${cachedUsername.toLowerCase()}`)
          ) {
            matches = false;
          }
        }

        if (
          matches &&
          (textQuery || usernameQuery || useridQuery || mentionsOnly)
        ) {
          results.push({ ...msg, _channel: chan });
        }
      });
    });

    results.sort((a, b) => b.data.time - a.data.time);

    setSearchResults(results);
    setHasSearched(true);
  };

  const handleBack = () => navigate(-1);

  const handleJumpToMessage = (channelName, messageId) => {
    navigate(`/?${channelName}`, {
      state: { searchTargetId: messageId },
    });
  };

  const advancedSearch = intl.formatMessage(messages.advancedSearch);
  const backButton = intl.formatMessage(messages.backButton);
  const searchChat = intl.formatMessage(messages.searchChat);
  const searchAllChannelsText = intl.formatMessage(messages.searchAllChannels);
  const advancedFilters = intl.formatMessage(messages.advancedFilters);
  const usernamePlaceholder = intl.formatMessage(messages.usernamePlaceholder);
  const useridPlaceholder = intl.formatMessage(messages.useridPlaceholder);
  const exactMatchText = intl.formatMessage(messages.exactMatch);
  const mentionsOnlyText = intl.formatMessage(messages.mentionsOnly);
  const noResults = intl.formatMessage(messages.noResults);
  const jumpToMessageText = intl.formatMessage(messages.jumpToMessage);

  return (
    <MainContainer dir={cachedLtr ? 'ltr' : 'rtl'} onWheel={handleGlobalWheel}>
      <Helmet>
        <title>{advancedSearch} - hack.chat</title>
      </Helmet>

      <ScrollArea ref={scrollRef} $largeMode={cachedLargeMode}>
        <h4>{advancedSearch}</h4>

        <SettingsGroup>
          <StripedContainer>
            <InputRow>
              <StyledInput
                type="text"
                placeholder={searchChat}
                value={textQuery}
                onChange={(e) => setTextQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </InputRow>

            <SwitchRow onClick={() => setSearchAllChannels(!searchAllChannels)}>
              <LabelText>{searchAllChannelsText}</LabelText>
              <BooleanSwitch checked={searchAllChannels} />
            </SwitchRow>

            {!searchAllChannels && joinedChannels.length > 0 && (
              <ChannelContainer>
                <StripedContainer>
                  {joinedChannels.map((chan) => (
                    <SwitchRow
                      key={chan}
                      onClick={() => handleChannelToggle(chan)}
                    >
                      <LabelText>?{chan}</LabelText>
                      <BooleanSwitch checked={!!selectedChannels[chan]} />
                    </SwitchRow>
                  ))}
                </StripedContainer>
              </ChannelContainer>
            )}
          </StripedContainer>
        </SettingsGroup>

        <CollapsibleSection title={advancedFilters}>
          <StripedContainer>
            <SwitchRow onClick={() => setMentionsOnly(!mentionsOnly)}>
              <LabelText>{mentionsOnlyText}</LabelText>
              <BooleanSwitch checked={mentionsOnly} />
            </SwitchRow>
            <InputRow>
              <StyledInput
                type="text"
                placeholder={usernamePlaceholder}
                value={usernameQuery}
                onChange={(e) => setUsernameQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </InputRow>
            <InputRow>
              <StyledInput
                type="text"
                placeholder={useridPlaceholder}
                value={useridQuery}
                onChange={(e) => setUseridQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </InputRow>
            <SwitchRow onClick={() => setExactMatch(!exactMatch)}>
              <LabelText>{exactMatchText}</LabelText>
              <BooleanSwitch checked={exactMatch} />
            </SwitchRow>
          </StripedContainer>
        </CollapsibleSection>

        <WideButton onClick={handleSearch} $active>
          {searchChat}
        </WideButton>

        {hasSearched && (
          <SearchResultsGroup>
            {searchResults.length === 0 ? (
              <NoResultsLabel>{noResults}</NoResultsLabel>
            ) : (
              <>
                <ResultsCountLabel>
                  {intl.formatMessage(messages.resultsCount, {
                    count: searchResults.length,
                  })}
                </ResultsCountLabel>
                {searchResults.map((msg, idx) => (
                  <SearchResultCard key={`${msg.data.id}-${idx}`}>
                    <SearchResultHeader>
                      <span>
                        <SearchResultName>{msg.data.name}</SearchResultName>
                        {' • '}
                        {new Date(msg.data.time).toLocaleTimeString()}
                      </span>
                      <SearchResultChannel>?{msg._channel}</SearchResultChannel>
                    </SearchResultHeader>
                    <SearchResultContent>
                      {msg.data.content}
                    </SearchResultContent>
                    <SearchResultJumpButton
                      onClick={() =>
                        handleJumpToMessage(msg._channel, msg.data.id)
                      }
                    >
                      {jumpToMessageText}
                    </SearchResultJumpButton>
                  </SearchResultCard>
                ))}
              </>
            )}
          </SearchResultsGroup>
        )}

        <FooterSection>
          <WideButton onClick={handleBack}>{backButton}</WideButton>
        </FooterSection>
      </ScrollArea>
    </MainContainer>
  );
}

SearchPage.propTypes = {
  channelData: PropTypes.object,
  cachedLargeMode: PropTypes.bool,
  cachedLtr: PropTypes.bool,
  cachedUsername: PropTypes.string,
  intl: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  channelData: makeSelectChannelData(),
  cachedLargeMode: makeSelectCachedLargeMode(),
  cachedLtr: makeSelectCachedLTR(),
  cachedUsername: makeSelectCachedUsername(),
});

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect, injectIntl, memo)(SearchPage);
