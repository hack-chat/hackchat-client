/**
 * HomePage will
 */

import React, {
  useEffect,
  useMemo,
  useState,
  memo,
  useRef,
  useCallback,
} from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import DOMPurify from 'dompurify';
import {
  PublicKey,
  Transaction,
  VersionedTransaction,
  TransactionMessage,
  AddressLookupTableAccount,
} from '@solana/web3.js';

import { FaMarkdown, FaGithub } from 'react-icons/fa6';
import { SiLatex } from 'react-icons/si';
import { FaUser } from 'react-icons/fa';
import { IoMdSettings } from 'react-icons/io';

import {
  changeChannel,
  sendChat,
  kickUser,
  banUser,
  ignoreUser,
  unignoreUser,
  inviteUser,
  muteUser,
  unmuteUser,
  uwuifyUser,
  leaveChannel,
  clearChannel,
  clearAuthReqs,
} from 'containers/CommunicationProvider/actions';
import {
  makeSelectChannel,
  makeSelectChannelData,
  makeSelectMeta,
  makeSelectSessionReady,
  makeSelectPendingCaptcha,
  makeSelectPendingPasswordReq,
} from 'containers/CommunicationProvider/selectors';

import { makeSelectIsLocaleModalOpen } from 'containers/LanguageProvider/selectors';
import {
  closeLocaleModal,
  openLocaleModal,
} from 'containers/LanguageProvider/actions';

import {
  disconnectWallet,
  signMessageRequest,
  doTransfer,
  checkChannelInfo,
} from 'containers/WalletLayer/actions';
import {
  makeSelectConnectedTo,
  makeSelectConnectedAccount,
  makeSelectPendingSignRequest,
} from 'containers/WalletLayer/selectors';

import {
  makeSelectCachedLTR,
  makeSelectCachedMenuBtnPos,
} from 'containers/SettingsPage/selectors';

import LoadingIndicator from 'components/LoadingIndicator';
import ChatManager from 'components/ChatManager';
import ChatInput from 'components/ChatInput';
import Modal from 'components/Modal';
import JoinMenu from 'components/JoinMenu';
import LocaleModal from 'components/LocaleModal';
import MainMenu from 'components/MainMenu';
import WalletMenu from 'components/WalletMenu';
import ChannelList from 'components/ChannelList';

import messages from './messages';

import MainContainer from './MainContainer';
import ChatLayout from './ChatLayout';
import LandingPageContents from './Contents';
import Banner from './Banner';
import Center from './Center';
import Socials from './Socials';
import ChannelButton from './ChannelButton';
import ModalHeader from './ModalHeader';
import ModalBody from './ModalBody';
import ModalLabel from './ModalLabel';
import ModalActions from './ModalActions';
import CodeAction from './CodeAction';
import ResetButton from './ResetButton';
import CaptchaText from './CaptchaText';
import FadeInContainer from './FadeInContainer';
import LoadingContainer from './LoadingContainer';
import SlowWarningText from './SlowWarningText';
import AuthModalHeader from './AuthModalHeader';
import AuthInput from './AuthInput';
import HiddenInput from './HiddenInput';
import TxPreviewImage from './TxPreviewImage';
import TxSummaryContainer from './TxSummaryContainer';
import TxTotalSol from './TxTotalSol';
import TxFeesSummary from './TxFeesSummary';
import TxDetails from './TxDetails';
import TxSummaryToggle from './TxSummaryToggle';
import TxInstructionList from './TxInstructionList';
import TxInstructionItem from './TxInstructionItem';
import TxInstructionHeader from './TxInstructionHeader';
import TxInstructionDetail from './TxInstructionDetail';
import TxInstructionPid from './TxInstructionPid';
import PublicChannelButton from './PublicChannelButton';
import PublicChannelListWrapper from './PublicChannelListWrapper';
import SectionHeader from './SectionHeader';

const useUrlChannel = () => {
  const { search } = useLocation();
  return useMemo(() => search.substring(1), [search]);
};

export function HomePage({
  channel,
  channelData,
  meta,
  onChangeChannel,
  onSendMessage,
  onKickUser,
  onBanUser,
  onIgnoreUser,
  onUnignoreUser,
  onInviteUser,
  onMuteUser,
  onUnmuteUser,
  onUwuifyUser,
  onLeaveChannel,
  isLocaleModalOpen,
  onCloseLocaleModal,
  onOpenLocaleModal,
  intl,
  connectedTo,
  connectedAccount,
  onDisconnectWallet,
  pendingSignRequest,
  onSignMessageRequest,
  onDoTransfer,
  onClearAuthReqs,
  sessionReady,
  pendingCaptcha,
  pendingPasswordReq,
  cachedLtr,
  cachedMenuBtnPos,
}) {
  const navigate = useNavigate();
  const channelFromUrl = useUrlChannel();
  const [isJoinModalOpen, setJoinModalOpen] = useState(false);
  const toggleJoinModal = () => setJoinModalOpen(!isJoinModalOpen);
  const [isWalletModalOpen, setWalletModalOpen] = useState(false);

  const [externalUrlToWarn, setExternalUrlToWarn] = useState(null);
  const [suppressLinkWarning, setSuppressLinkWarning] = useState(false);
  const [tempSuppressCheckbox, setTempSuppressCheckbox] = useState(false);

  const [txToWarn, setTxToWarn] = useState(null);
  const [suppressTxWarning, setSuppressTxWarning] = useState(false);
  const [tempSuppressTxCheckbox, setTempSuppressTxCheckbox] = useState(false);

  const [isFocused, setIsFocused] = useState(true);
  const [missedMessages, setMissedMessages] = useState(0);

  const [showSlowWarning, setShowSlowWarning] = useState(false);
  const [showResetButton, setShowResetButton] = useState(false);

  const [challengeCaptcha, setChallengeCaptcha] = useState('');
  const [challengePassword, setChallengePassword] = useState('');
  const captchaInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const currentMessageCount = channelData?.[channel]?.messages?.length || 0;
  const prevMessageCountRef = useRef(currentMessageCount);
  const baseTitle = channelFromUrl ? `?${channelFromUrl}` : 'hack.chat';

  const createOrJoinLabel = intl.formatMessage(messages.createOrJoinLabel);
  const publicChannelsHeader = intl.formatMessage(
    messages.publicChannelsHeader,
  );
  const currentGithub = intl.formatMessage(messages.currentGithub);
  // const legacyGithub = intl.formatMessage(messages.legacyGithub);
  // const thirdParty = intl.formatMessage(messages.thirdParty);
  const siwText = intl.formatMessage(messages.siwText);
  const siwFinish = intl.formatMessage(messages.siwFinish);
  const cancelText = intl.formatMessage(messages.cancelText);
  const understoodText = intl.formatMessage(messages.understoodText);
  const externalWarningText = intl.formatMessage(messages.externalLinkWarning);
  const suppressWarningMsg = intl.formatMessage(messages.suppressWarningText);
  const txWarningHeader = intl.formatMessage(messages.txWarningHeader);
  const txWarningBody = intl.formatMessage(messages.txWarningBody);
  const txCopy = intl.formatMessage(messages.txCopy);
  const txSignAndSend = intl.formatMessage(messages.txSignAndSend);
  const connectionSlowText = intl.formatMessage(messages.connectionSlowText);

  const joinedChannels = useMemo(
    () => (channelData ? Object.keys(channelData) : []),
    [channelData],
  );

  const chatInputRef = useRef(null);
  const channelUsersRef = useRef({});
  const chatScrollContainerRef = useRef(null);

  useEffect(() => {
    channelUsersRef.current = channelData?.[channel]?.users || {};
  }, [channelData, channel]);

  useEffect(() => {
    setIsFocused(document.hasFocus());

    const handleFocus = () => {
      setIsFocused(true);
      setMissedMessages(0);
      document.title = baseTitle;
    };
    const handleBlur = () => {
      setIsFocused(false);
    };

    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
    };
  }, [baseTitle]);

  useEffect(() => {
    if (!isFocused && currentMessageCount > prevMessageCountRef.current) {
      const diff = currentMessageCount - prevMessageCountRef.current;

      setMissedMessages((prev) => {
        const newMissedCount = prev + diff;
        document.title = `(${newMissedCount}) ${baseTitle}`;

        return newMissedCount;
      });
    }

    prevMessageCountRef.current = currentMessageCount;
  }, [currentMessageCount, isFocused, baseTitle]);

  useEffect(() => {
    setMissedMessages(0);
    prevMessageCountRef.current = channelData?.[channel]?.messages?.length || 0;
  }, [channel]);

  useEffect(() => {
    let warningTimer;
    let resetTimer;

    if (channelFromUrl && !sessionReady) {
      warningTimer = setTimeout(() => setShowSlowWarning(true), 5000);
      resetTimer = setTimeout(() => setShowResetButton(true), 10000);
    } else {
      setShowSlowWarning(false);
      setShowResetButton(false);
    }

    return () => {
      clearTimeout(warningTimer);
      clearTimeout(resetTimer);
    };
  }, [sessionReady, channelFromUrl]);

  const handleExternalLinkClick = useCallback(
    (url) => {
      if (suppressLinkWarning) {
        window.open(url, '_blank', 'noopener,noreferrer');
      } else {
        setTempSuppressCheckbox(false);
        setExternalUrlToWarn(url);
      }
    },
    [suppressLinkWarning],
  );

  const handleTxAttemptClick = useCallback(
    (payload) => {
      if (suppressTxWarning) {
        onDoTransfer(payload.tx);
      } else {
        setTempSuppressTxCheckbox(false);
        setTxToWarn(payload);
      }
    },
    [suppressTxWarning, onDoTransfer],
  );

  const handleMenuCommand = useCallback(
    (commandText) => {
      const mentionMatch = commandText.match(/^@\S+\s$/);

      if (mentionMatch) {
        chatInputRef.current?.insertText(
          commandText.substr(0, commandText.length),
        );
        return;
      }

      const kickMatch = commandText.match(/^\/kick @(.+)/);
      const banMatch = commandText.match(/^\/ban @(.+)/);
      const ignoreMatch = commandText.match(/^\/ignore @(.+)/);
      const unignoreMatch = commandText.match(/^\/unignore @(.+)/);
      const inviteMatch = commandText.match(/^\/invite @(.+)/);
      const muzzleMatch = commandText.match(/^\/muzzle @(.+)/);
      const unmuzzleMatch = commandText.match(/^\/unmuzzle @(.+)/);
      const uwuifyMatch = commandText.match(/^\/uwuify @(.+)/);

      if (
        kickMatch ||
        banMatch ||
        ignoreMatch ||
        unignoreMatch ||
        inviteMatch ||
        muzzleMatch ||
        unmuzzleMatch ||
        uwuifyMatch
      ) {
        const username =
          (kickMatch && kickMatch[1]) ||
          (banMatch && banMatch[1]) ||
          (ignoreMatch && ignoreMatch[1]) ||
          (unignoreMatch && unignoreMatch[1]) ||
          (inviteMatch && inviteMatch[1]) ||
          (muzzleMatch && muzzleMatch[1]) ||
          (unmuzzleMatch && unmuzzleMatch[1]) ||
          (uwuifyMatch && uwuifyMatch[1]);

        // read users through the ref so this callback (passed to every
        // Message) doesn't change identity on each channelData update
        const users = channelUsersRef.current;

        if (!users) {
          // eslint-disable-next-line no-console
          console.warn('User list not available for this channel.');
          return;
        }

        const targetUser = Object.values(users).find(
          (u) => u.username === username,
        );

        if (targetUser) {
          if (kickMatch) {
            onKickUser(channel, targetUser.userid);
          } else if (banMatch) {
            onBanUser(channel, targetUser.userid);
          } else if (ignoreMatch) {
            onIgnoreUser(channel, targetUser.userid);
          } else if (unignoreMatch) {
            onUnignoreUser(channel, targetUser.userid);
          } else if (inviteMatch) {
            onInviteUser(channel, targetUser.userid);
          } else if (muzzleMatch) {
            onMuteUser(channel, targetUser.userid);
          } else if (unmuzzleMatch) {
            onUnmuteUser(channel, targetUser.userid);
          } else if (uwuifyMatch) {
            onUwuifyUser(channel, targetUser.userid);
          }
        } else {
          // eslint-disable-next-line no-console
          console.warn(`Could not find user "${username}" to perform action.`);
          chatInputRef.current?.setCommand(commandText);
        }
        return;
      }

      chatInputRef.current?.setCommand(commandText);
    },
    [
      channel,
      onKickUser,
      onBanUser,
      onIgnoreUser,
      onUnignoreUser,
      onInviteUser,
      onMuteUser,
      onUnmuteUser,
      onUwuifyUser,
    ],
  );

  const handleInsertText = useCallback((text) => {
    chatInputRef.current?.insertText(text);
  }, []);

  const handleGlobalWheel = useCallback(
    (e) => {
      if (
        isJoinModalOpen ||
        isLocaleModalOpen ||
        externalUrlToWarn ||
        txToWarn ||
        pendingCaptcha ||
        pendingPasswordReq ||
        isWalletModalOpen ||
        pendingSignRequest
      ) {
        return;
      }

      if (chatScrollContainerRef.current) {
        chatScrollContainerRef.current.scrollTop += e.deltaY;
      }
    },
    [
      isJoinModalOpen,
      isLocaleModalOpen,
      externalUrlToWarn,
      txToWarn,
      pendingCaptcha,
      pendingPasswordReq,
      isWalletModalOpen,
      pendingSignRequest,
    ],
  );

  useEffect(() => {
    if (!sessionReady) return;

    if (pendingCaptcha || pendingPasswordReq) {
      setJoinModalOpen(false);
      return;
    }

    if (channelFromUrl) {
      const isAlreadyMember = channelData && channelData[channelFromUrl];

      if (isAlreadyMember) {
        if (channel !== channelFromUrl) {
          onChangeChannel(channelFromUrl);
        }
        setJoinModalOpen(false);
      } else {
        setJoinModalOpen(true);
      }
    } else {
      if (channel) {
        navigate(`/?${channel}`, { replace: true });
      }
    }
  }, [
    channelFromUrl,
    channel,
    channelData,
    onChangeChannel,
    navigate,
    sessionReady,
    pendingCaptcha,
    pendingPasswordReq,
  ]);

  useEffect(() => {
    if (pendingCaptcha && captchaInputRef.current) {
      setTimeout(() => captchaInputRef.current.focus(), 100);
    }
  }, [pendingCaptcha]);

  useEffect(() => {
    if (pendingPasswordReq && passwordInputRef.current) {
      setTimeout(() => passwordInputRef.current.focus(), 100);
    }
  }, [pendingPasswordReq]);

  const handleCopyTx = async () => {
    if (txToWarn && txToWarn.tx) {
      try {
        await navigator.clipboard.writeText(txToWarn.tx);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Failed to copy transaction', err);
      }
    }
  };

  const publicChannels = useMemo(() => {
    const sortedChannels = [...meta.channels].sort((a, b) => b.count - a.count);

    return sortedChannels.map((ch) => {
      const cleanName = DOMPurify.sanitize(ch.name);
      return (
        <PublicChannelButton key={`pchan-${cleanName}`} to={`/?${cleanName}`}>
          <b>?{cleanName}</b>
          <i>
            {ch.count} <FaUser />
          </i>
        </PublicChannelButton>
      );
    });
  }, [meta.channels]);

  // Not gated on sessionReady: once a channel has been joined, keep it on
  // screen through a dropped connection so the "lost connection" notice
  // in the chat is visible, rather than falling back to the connect spinner
  const showChat = Boolean(
    channel &&
    channel === channelFromUrl &&
    channelData &&
    channelData[channelFromUrl],
  );

  let homepageTitle = baseTitle;
  if (missedMessages > 0) {
    homepageTitle = `(${missedMessages}) ${baseTitle}`;
  }

  const HomePageContent = (
    <FadeInContainer>
      <Center>
        <Banner>
          {`
 _           _         _        _
| |_ ___ ___| |_   ___| |_ ___ | |_
|   |_ ||  _| '_| |  _|   |_  ||  _|
|_|_|__/|___|_,_|.|___|_|_|__/ |_|
        `}
        </Banner>
      </Center>
      <Center>
        <ChannelButton
          onClick={() => setJoinModalOpen(true)}
          disabled={!sessionReady}
          $isDisabled={!sessionReady}
        >
          {createOrJoinLabel}
        </ChannelButton>
      </Center>
      <br />
      <ChannelList
        channels={joinedChannels}
        onLeaveChannel={(ch) => onLeaveChannel(ch)}
      />

      <SectionHeader>{publicChannelsHeader}</SectionHeader>

      <PublicChannelListWrapper>
        {publicChannels.length === 0 ? <LoadingIndicator /> : publicChannels}
      </PublicChannelListWrapper>

      <Center>
        <Socials>
          <Link to="/settings">
            <IoMdSettings />
          </Link>
          <Link
            to="https://www.markdownguide.org/cheat-sheet/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <FaMarkdown />
          </Link>
          <Link
            to="https://katex.org/docs/supported"
            rel="noopener noreferrer"
            target="_blank"
          >
            <SiLatex />
          </Link>
          <Link
            to="https://github.com/hack-chat"
            rel="noopener noreferrer"
            target="_blank"
            title={currentGithub}
          >
            <FaGithub />
          </Link>
        </Socials>
      </Center>
    </FadeInContainer>
  );

  const {
    parsedInstructions,
    payloadSol,
    networkFeeSol,
    totalSol,
    totalLamports,
  } = useMemo(() => {
    if (!txToWarn?.tx)
      return {
        parsedInstructions: [],
        payloadSol: '0',
        networkFeeSol: '0',
        totalSol: '0',
        totalLamports: 0,
      };

    const KNOWN_WALLETS = {
      HaCKy1tUTBDkfUkcYcUFkhC887ucAs3tEjcmqRa5cHat: '🏦 hack.chat Treasury',
      AutHysEUfKrWDETzrDA7S7MwL1eSSc2BjySR2W8EuSEr:
        '📜 hack.chat Smart Contract',
      HACkoKCBiLiWjuVf4S4gTbFqJohVC6VkacBEBTtUCHat: '🔑 SC Upgrade Authority',
      HaCkAvuxxfnfNLfnENxQ1V3aHCjgDS1rMNYcm4qWsYNC: '🖼️ NFT Master Collection',
      AuTHa7GoqCvm8Hp1epZMwvpwkuYCZ1SAdbtzVeNbUser: '⚙️ Server Hot Wallet',
    };

    const HACKCHAT_ALT_ACCOUNT = new AddressLookupTableAccount({
      key: new PublicKey('GQij98JJ75GRBJZbjTgAtt8Y575U7XrVDsNYcgD1Fh4H'),
      state: {
        deactivationSlot: BigInt('18446744073709551615'),
        lastExtendedSlot: 0,
        lastExtendedSlotStartIndex: 0,
        authority: new PublicKey(
          'AuTHa7GoqCvm8Hp1epZMwvpwkuYCZ1SAdbtzVeNbUser',
        ),
        addresses: [
          /*
            00: System Program
            01: Token Program
            02: ATA Program
            03: Metadata Program
            04: Smart Contract
            05: Compute Budget
            06: Treasury
            07: Server
            08: Master Collection
            09: Master Collection Metadata PDA
            10: Master Collection Edition PDA
            11: Sysvar Rent
          */
          new PublicKey('11111111111111111111111111111111'),
          new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'),
          new PublicKey('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'),
          new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'),
          new PublicKey('AutHysEUfKrWDETzrDA7S7MwL1eSSc2BjySR2W8EuSEr'),
          new PublicKey('ComputeBudget111111111111111111111111111111'),
          new PublicKey('HaCKy1tUTBDkfUkcYcUFkhC887ucAs3tEjcmqRa5cHat'),
          new PublicKey('AuTHa7GoqCvm8Hp1epZMwvpwkuYCZ1SAdbtzVeNbUser'),
          new PublicKey('HaCkAvuxxfnfNLfnENxQ1V3aHCjgDS1rMNYcm4qWsYNC'),
          new PublicKey('CSWL7CLamvMcUDKDqKpjED29YHgwiCz2aUmMwpGnYEfo'),
          new PublicKey('2LUBQq1QuvUs5qaDxo1SL9UHpan2scqFmsjJTAsa3ZBT'),
          new PublicKey('SysvarRent111111111111111111111111111111111'),
        ],
      },
    });

    const formatSol = (lamports) => {
      let str = (lamports / 1000000000).toFixed(9);
      str = str.replace(/0+$/, '');
      if (str.endsWith('.')) str += '0';
      return str;
    };

    const readBorshString = (dataView, offset) => {
      const len = dataView.getUint32(offset, true);
      const bytes = new Uint8Array(
        dataView.buffer,
        dataView.byteOffset + offset + 4,
        len,
      );
      return new TextDecoder().decode(bytes);
    };

    try {
      const binaryString = atob(txToWarn.tx);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      let transactionInstructions = [];

      try {
        const transaction = Transaction.from(bytes);
        transactionInstructions = transaction.instructions;
      } catch (err) {
        if (err.message.includes('Versioned')) {
          const versionedTx = VersionedTransaction.deserialize(bytes);
          try {
            const decompiled = TransactionMessage.decompile(
              versionedTx.message,
              {
                addressLookupTableAccounts: [HACKCHAT_ALT_ACCOUNT],
              },
            );
            transactionInstructions = decompiled.instructions;
          } catch (decompileErr) {
            // eslint-disable-next-line no-console
            console.log('Failed v0', decompileErr);

            return {
              parsedInstructions: [
                {
                  index: 1,
                  name: '📦 Compressed v0 Transaction',
                  pid: 'Unknown',
                  details: 'Proceed to see details', // @todo translation
                },
              ],
              payloadSol: '0',
              networkFeeSol: '0',
              totalSol: '0',
              totalLamports: 0,
            };
          }
        } else {
          throw err;
        }
      }

      let accumulatedLamports = 0;
      let computeLimit = 200000;
      let computePriceMicroLamports = 0;

      const instructions = transactionInstructions.map((ix, index) => {
        const pid = ix.programId.toBase58();
        let name = '❓ Unknown Program';
        let details = null;

        const dataView = new DataView(
          ix.data.buffer,
          ix.data.byteOffset,
          ix.data.byteLength,
        );

        if (pid === '11111111111111111111111111111111') {
          name = '⚙️ System Program';
          if (ix.data.length === 12 && dataView.getUint32(0, true) === 2) {
            const lamports = Number(dataView.getBigUint64(4, true));
            accumulatedLamports += lamports;

            let destLabel = 'Unknown';
            if (ix.keys && ix.keys.length > 1) {
              const destPubkey = ix.keys[1].pubkey.toBase58();
              destLabel =
                KNOWN_WALLETS[destPubkey] ||
                `${destPubkey.slice(0, 4)}...${destPubkey.slice(-4)}`;
            }

            details = `💸 ${formatSol(lamports)} SOL ➡️ ${destLabel}`;
          }
        } else if (pid === 'AutHysEUfKrWDETzrDA7S7MwL1eSSc2BjySR2W8EuSEr') {
          name = '📜 hack.chat Smart Contract';
          if (ix.data.length > 0) {
            const ixType = ix.data[0];

            if (ixType === 0) {
              const channelName = readBorshString(dataView, 1);
              details = `📺 ${channelName}`; // Claim Channel
            } else if (ixType === 1) {
              details = `♻️ Reclaim`; // Reclaim Channel
            } else if (ixType === 2) {
              const tripCode = readBorshString(dataView, 1);
              details = `🛡️ ${tripCode}`; // Assign Mod
            } else if (ixType === 3) {
              const tripCode = readBorshString(dataView, 1);
              details = `🚫 ${tripCode}`; // Remove Mod
            } else if (ixType === 4) {
              details = `❌ Close`; // Burn Channel
            } else if (ixType === 5) {
              // Donation
              const effectId = ix.data[1];
              const lamports = Number(dataView.getBigUint64(2, true));
              accumulatedLamports += lamports;
              details = `🎁 Record Donation: ${formatSol(lamports)} SOL (✨ ${effectId})`;
            }
          }
        } else if (pid === 'ComputeBudget111111111111111111111111111111') {
          name = '⛽ Compute Budget';
          if (ix.data.length > 0) {
            const instructionType = ix.data[0];
            if (instructionType === 2 && ix.data.length === 5) {
              computeLimit = dataView.getUint32(1, true);
              details = `📏 ${computeLimit.toLocaleString()} units`;
            } else if (instructionType === 3 && ix.data.length === 9) {
              computePriceMicroLamports = Number(
                dataView.getBigUint64(1, true),
              );
              details = `⚡ ${computePriceMicroLamports.toLocaleString()} µLamports/u`;
            }
          }
        } else if (pid === 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA') {
          name = '🪙 SPL Token Program';
        } else if (pid === 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL') {
          name = '🔗 Associated Token Program';
        } else if (pid === 'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s') {
          name = '🖼️ Metaplex Metadata';
          if (ix.data.length > 0) {
            const discriminator = ix.data[0];
            if (discriminator === 33) {
              const MINT_RENT_LAMPORTS = 18835200; // ~0.0188 SOL rent
              accumulatedLamports += MINT_RENT_LAMPORTS;
              details = `📦 Storage Rent (~${formatSol(MINT_RENT_LAMPORTS)} SOL)`;
            } else if (discriminator === 17) {
              details = `👑 Master Edition Creation`;
            } else if (discriminator === 30) {
              details = `✅ Verify into Master Collection`;
            }
          }
        }

        return { index: index + 1, name, pid, details };
      });

      const baseFee = 5000;
      const priorityFeeLamports = Math.floor(
        (computeLimit * computePriceMicroLamports) / 1000000,
      );
      const maxNetworkFeeLamports = baseFee + priorityFeeLamports;
      const absoluteTotalLamports = accumulatedLamports + maxNetworkFeeLamports;

      return {
        parsedInstructions: instructions,
        payloadSol: formatSol(accumulatedLamports),
        networkFeeSol: formatSol(maxNetworkFeeLamports),
        totalSol: formatSol(absoluteTotalLamports),
        totalLamports: absoluteTotalLamports,
      };
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('Failed to build breakdown', err);

      return {
        parsedInstructions: [],
        payloadSol: '0',
        networkFeeSol: '0',
        totalSol: '0',
        totalLamports: 0,
      };
    }
  }, [txToWarn]);

  return (
    <MainContainer onWheel={handleGlobalWheel}>
      <Helmet>
        <title>{homepageTitle}</title>
        <meta
          name="description"
          content="a minimal, distraction-free chat application"
        />
      </Helmet>

      {(sessionReady || showChat) && channel && (
        <MainMenu
          channel={channel}
          channelData={channelData}
          menuLeft={cachedMenuBtnPos}
          isLtr={cachedLtr}
          onJoinOrCreateClick={toggleJoinModal}
          onCommandClick={handleMenuCommand}
          onOpenLocaleModal={onOpenLocaleModal}
          onOpenWalletModal={() => setWalletModalOpen(true)}
          isWalletConnected={!!connectedTo}
          walletAddress={connectedAccount ? connectedAccount.address : ''}
          onDisconnectWallet={onDisconnectWallet}
          onLeaveChannel={onLeaveChannel}
        />
      )}

      {showChat ? (
        <ChatLayout dir={cachedLtr ? 'ltr' : 'rtl'}>
          <ChatManager
            channel={channel}
            channelData={channelData}
            handleMenuCommand={handleMenuCommand}
            handleInsertText={handleInsertText}
            onExternalLinkClick={handleExternalLinkClick}
            onTxAttemptClick={handleTxAttemptClick}
            intl={intl}
            externalScrollRef={chatScrollContainerRef}
          />
          <ChatInput
            channel={channel}
            users={channelData?.[channel]?.users}
            onSendMessage={onSendMessage}
            ref={chatInputRef}
          />
        </ChatLayout>
      ) : (
        <LandingPageContents>
          {!!channelFromUrl && !sessionReady ? (
            <LoadingContainer>
              <LoadingIndicator />
              {showSlowWarning && (
                <SlowWarningText>{connectionSlowText}</SlowWarningText>
              )}
              {showResetButton && (
                <ResetButton
                  onClick={() => {
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  🧽✨🔄
                </ResetButton>
              )}
            </LoadingContainer>
          ) : isJoinModalOpen && !!channelFromUrl ? null : (
            HomePageContent
          )}
        </LandingPageContents>
      )}

      <Modal isOpen={isJoinModalOpen} doToggle={setJoinModalOpen}>
        <JoinMenu
          doToggle={toggleJoinModal}
          qString={!showChat ? channelFromUrl : ''}
        />
      </Modal>

      <Modal isOpen={isLocaleModalOpen} doToggle={onCloseLocaleModal}>
        <LocaleModal />
      </Modal>

      <Modal isOpen={!!pendingSignRequest} doToggle={() => {}}>
        <Center>{siwText}</Center>
        <Center>
          <ChannelButton
            onClick={() =>
              onSignMessageRequest(
                pendingSignRequest.wallet,
                pendingSignRequest.message,
              )
            }
          >
            {siwFinish}
          </ChannelButton>
        </Center>
      </Modal>

      <Modal
        isOpen={!!externalUrlToWarn}
        doToggle={() => setExternalUrlToWarn(null)}
      >
        <ModalHeader>{externalWarningText}</ModalHeader>

        <ModalBody>
          <a href={externalUrlToWarn} target="_blank" rel="noopener noreferrer">
            {externalUrlToWarn}
          </a>
        </ModalBody>

        <Center>
          <ModalLabel>
            <input
              type="checkbox"
              checked={tempSuppressCheckbox}
              onChange={(e) => setTempSuppressCheckbox(e.target.checked)}
            />
            {suppressWarningMsg}
          </ModalLabel>
        </Center>

        <ModalActions>
          <ChannelButton onClick={() => setExternalUrlToWarn(null)}>
            {cancelText}
          </ChannelButton>
          <ChannelButton
            onClick={() => {
              if (tempSuppressCheckbox) {
                setSuppressLinkWarning(true);
              }
              window.open(externalUrlToWarn, '_blank', 'noopener,noreferrer');
              setExternalUrlToWarn(null);
            }}
          >
            {understoodText}
          </ChannelButton>
        </ModalActions>
      </Modal>

      <Modal isOpen={!!txToWarn} doToggle={() => setTxToWarn(null)}>
        <ModalHeader>{txWarningHeader}</ModalHeader>

        <ModalBody>
          {txWarningBody}

          {(txToWarn?.imageUrl || totalLamports > 0) && (
            <Center>
              {txToWarn.imageUrl && (
                <a
                  href={txToWarn.imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-block' }}
                >
                  <TxPreviewImage src={txToWarn.imageUrl} />
                </a>
              )}
              {totalLamports > 0 && (
                <TxSummaryContainer $hasImage={!!txToWarn.imageUrl}>
                  <TxTotalSol>~{totalSol} SOL</TxTotalSol>
                  <TxFeesSummary>
                    📦 {payloadSol} SOL | ⛽ {networkFeeSol} SOL
                  </TxFeesSummary>
                </TxSummaryContainer>
              )}
            </Center>
          )}

          {parsedInstructions.length > 0 && (
            <TxDetails>
              <TxSummaryToggle>
                {intl.formatMessage(messages.txBreakdown, {
                  count: parsedInstructions.length,
                })}
              </TxSummaryToggle>
              <TxInstructionList>
                {parsedInstructions.map((ix) => (
                  <TxInstructionItem key={ix.index}>
                    <TxInstructionHeader>
                      #{ix.index} {ix.name}
                    </TxInstructionHeader>

                    {ix.details && (
                      <TxInstructionDetail>↳ {ix.details}</TxInstructionDetail>
                    )}

                    <TxInstructionPid>{ix.pid}</TxInstructionPid>
                  </TxInstructionItem>
                ))}
              </TxInstructionList>

              <CodeAction
                onClick={handleCopyTx}
                title={txCopy}
                style={{ marginTop: '0.5rem' }}
              >
                {txCopy}
              </CodeAction>
            </TxDetails>
          )}
        </ModalBody>

        <Center>
          <ModalLabel>
            <input
              type="checkbox"
              checked={tempSuppressTxCheckbox}
              onChange={(e) => setTempSuppressTxCheckbox(e.target.checked)}
            />
            {suppressWarningMsg}
          </ModalLabel>
        </Center>

        <ModalActions>
          <ChannelButton onClick={() => setTxToWarn(null)}>
            {cancelText}
          </ChannelButton>
          <ChannelButton
            onClick={() => {
              if (tempSuppressTxCheckbox) {
                setSuppressTxWarning(true);
              }
              onDoTransfer(txToWarn.tx);
              setTxToWarn(null);
            }}
          >
            {txSignAndSend}
          </ChannelButton>
        </ModalActions>
      </Modal>

      <Modal isOpen={!!pendingCaptcha} doToggle={onClearAuthReqs}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (challengeCaptcha.trim() !== '') {
              onSendMessage(pendingCaptcha.channel, challengeCaptcha.trim());
              setChallengeCaptcha('');
              onClearAuthReqs();
            }
          }}
        >
          <AuthModalHeader>🛡️ ?{pendingCaptcha?.channel} 🤖</AuthModalHeader>
          <ModalBody>
            <CaptchaText>{pendingCaptcha?.text}</CaptchaText>
          </ModalBody>
          <Center>
            <AuthInput
              ref={captchaInputRef}
              type="text"
              autoComplete="off"
              placeholder="🔤 . . ."
              value={challengeCaptcha}
              onChange={(e) => setChallengeCaptcha(e.target.value)}
            />
          </Center>
          <HiddenInput type="submit" />
        </form>
      </Modal>

      <Modal isOpen={!!pendingPasswordReq} doToggle={onClearAuthReqs}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (challengePassword !== '') {
              onSendMessage(pendingPasswordReq.channel, challengePassword);
              setChallengePassword('');
              onClearAuthReqs();
            }
          }}
        >
          <AuthModalHeader>
            🔐 ?{pendingPasswordReq?.channel} ❓
          </AuthModalHeader>

          <Center>
            <HiddenInput
              type="text"
              autoComplete="username"
              value="room_guest"
              readOnly
            />

            <AuthInput
              $margin="2rem 0"
              ref={passwordInputRef}
              type="password"
              autoComplete="current-password"
              placeholder="🗝️ . . ."
              value={challengePassword}
              onChange={(e) => setChallengePassword(e.target.value)}
            />
          </Center>
          <HiddenInput type="submit" />
        </form>
      </Modal>

      <WalletMenu isOpen={isWalletModalOpen} doToggle={setWalletModalOpen} />
    </MainContainer>
  );
}

HomePage.propTypes = {
  channel: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  channelData: PropTypes.object,
  meta: PropTypes.object,
  onChangeChannel: PropTypes.func,
  onSendMessage: PropTypes.func,
  onKickUser: PropTypes.func,
  onBanUser: PropTypes.func,
  onIgnoreUser: PropTypes.func,
  onUnignoreUser: PropTypes.func,
  onInviteUser: PropTypes.func,
  onMuteUser: PropTypes.func,
  onUnmuteUser: PropTypes.func,
  onUwuifyUser: PropTypes.func,
  onLeaveChannel: PropTypes.func,
  isLocaleModalOpen: PropTypes.bool,
  onCloseLocaleModal: PropTypes.func,
  onOpenLocaleModal: PropTypes.func,
  intl: PropTypes.object.isRequired,
  connectedTo: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  connectedAccount: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  onDisconnectWallet: PropTypes.func,
  pendingSignRequest: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  onSignMessageRequest: PropTypes.func,
  sessionReady: PropTypes.bool,
  pendingCaptcha: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  pendingPasswordReq: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  onDoTransfer: PropTypes.func,
  onClearAuthReqs: PropTypes.func,
  cachedLtr: PropTypes.bool,
  cachedMenuBtnPos: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  channel: makeSelectChannel(),
  channelData: makeSelectChannelData(),
  meta: makeSelectMeta(),
  isLocaleModalOpen: makeSelectIsLocaleModalOpen(),
  connectedTo: makeSelectConnectedTo(),
  connectedAccount: makeSelectConnectedAccount(),
  pendingSignRequest: makeSelectPendingSignRequest(),
  sessionReady: makeSelectSessionReady(),
  pendingCaptcha: makeSelectPendingCaptcha(),
  pendingPasswordReq: makeSelectPendingPasswordReq(),
  cachedLtr: makeSelectCachedLTR(),
  cachedMenuBtnPos: makeSelectCachedMenuBtnPos(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeChannel: (channelName) => dispatch(changeChannel(channelName)),
    onSendMessage: (channel, message) => {
      // bet there is a better spot for these. . .
      if (message.trim() === '/leave') {
        dispatch(leaveChannel(channel));
      } else if (message.trim() === '/clear') {
        dispatch(clearChannel(channel));
      } else if (message.trim() === '/channelinfo') {
        dispatch(checkChannelInfo(channel));
      } else {
        dispatch(sendChat(channel, message));
      }
    },
    onKickUser: (channel, user) => dispatch(kickUser(channel, user)),
    onBanUser: (channel, user) => dispatch(banUser(channel, user)),
    onIgnoreUser: (channel, userid) => dispatch(ignoreUser(channel, userid)),
    onUnignoreUser: (channel, userid) =>
      dispatch(unignoreUser(channel, userid)),
    onInviteUser: (channel, userid) => dispatch(inviteUser(channel, userid)),
    onMuteUser: (channel, user) => dispatch(muteUser(channel, user)),
    onUnmuteUser: (channel, user) => dispatch(unmuteUser(channel, user)),
    onUwuifyUser: (channel, user) => dispatch(uwuifyUser(channel, user)),
    onLeaveChannel: (channel) => dispatch(leaveChannel(channel)),
    onCloseLocaleModal: () => dispatch(closeLocaleModal()),
    onOpenLocaleModal: () => dispatch(openLocaleModal()),
    onDisconnectWallet: () => dispatch(disconnectWallet()),
    onSignMessageRequest: (wallet, message) =>
      dispatch(signMessageRequest(wallet, message)),
    onDoTransfer: (tx) => dispatch(doTransfer(tx)),
    onClearAuthReqs: () => dispatch(clearAuthReqs()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, injectIntl, memo)(HomePage);
