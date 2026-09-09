/**
 * This contains all the text for the Message container
 */

import { defineMessages } from 'react-intl';

export const scope = 'hcclient.components.Message';

const messages = {
  inviteTo: {
    id: `${scope}.inviteTo`,
    defaultMessage: 'You invited {userTo} to {targetChannel}',
  },
  inviteFrom: {
    id: `${scope}.inviteFrom`,
    defaultMessage: '{userFrom} invited you to {targetChannel}',
  },
  joined: {
    id: `${scope}.joined`,
    defaultMessage: '{nick} joined',
  },
  left: {
    id: `${scope}.left`,
    defaultMessage: '{nick} left',
  },
  whisperTo: {
    id: `${scope}.whisperTo`,
    defaultMessage: 'You whispered to {nick}:',
  },
  whisperFrom: {
    id: `${scope}.whisperFrom`,
    defaultMessage: '{nick} whispered:',
  },
  acceptCode: {
    id: `${scope}.acceptCode`,
    defaultMessage: '[ accept and run ]',
  },
  codeSuggestText: {
    id: `${scope}.codeSuggestText`,
    defaultMessage: ' is suggesting that you run the following code',
  },
  confirmWarningText: {
    id: `${scope}.confirmWarningText`,
    defaultMessage: `Warning, hitting okay will load unknown 3rd party code, this could result in many bad things happening- including (but not limited to) location disclosure, trip code theft, malicious trolling`,
  },
  globalRateLimit: {
    id: `${scope}.global.rateLimit`,
    defaultMessage:
      'You are sending too much text. Wait a moment and try again. Press the up arrow key to restore your last message',
  },
  globalUnknownUser: {
    id: `${scope}.global.unknownUser`,
    defaultMessage: 'Could not find user in that channel',
  },
  globalPermsFail: {
    id: `${scope}.global.permsFail`,
    defaultMessage: 'You do not have permission to do this',
  },
  joinRateLimit: {
    id: `${scope}.join.rateLimit`,
    defaultMessage:
      'You are joining channels too fast. Wait a moment and try again',
  },
  globalBadNick: {
    id: `${scope}.global.badNick`,
    defaultMessage:
      'Nickname must consist of up to 24 letters, numbers, and underscores',
  },
  globalTaken: {
    id: `${scope}.global.taken`,
    defaultMessage: 'Nickname taken',
  },
  inviteRateLimit: {
    id: `${scope}.invite.rateLimit`,
    defaultMessage:
      'You are sending invites too fast. Wait a moment before trying again',
  },
  warningLabel: {
    id: `${scope}.global.warningLabel`,
    defaultMessage: 'Warning',
  },
  errorLabel: {
    id: `${scope}.global.ErrorLabel`,
    defaultMessage: 'Error',
  },
  showLess: {
    id: `${scope}.showLess`,
    defaultMessage: 'Show less',
  },
  showMore: {
    id: `${scope}.showMore`,
    defaultMessage: 'Show more',
  },
  txRequest: {
    id: `${scope}.txRequest`,
    defaultMessage: '{name} is requesting you sign a transaction:',
  },
  txPreview: {
    id: `${scope}.txPreview`,
    defaultMessage: 'Preview Transaction',
  },

  blockedNotice: {
    id: `${scope}.blockedNotice`,
    defaultMessage: 'You are being rate-limited or blocked',
  },
  dcError: {
    id: `${scope}.dcError`,
    defaultMessage: 'Lost connection to server. . .',
  },
  rcWarning: {
    id: `${scope}.rcWarning`,
    defaultMessage: 'Reconnected- you may have missed messages',
  },

  errGlobalRatelimit: {
    id: `${scope}.err.Global.RATELIMIT`,
    defaultMessage:
      'Issuing commands too quickly. Wait a moment before trying again',
  },
  errGlobalUnknownUser: {
    id: `${scope}.err.Global.UNKNOWN_USER`,
    defaultMessage: 'Could not find user in that channel',
  },
  errGlobalPermission: {
    id: `${scope}.err.Global.PERMISSION`,
    defaultMessage: 'You may not do that',
  },
  /*errGlobalInternalError: {
    id: `${scope}.err.Global.INTERNAL_ERROR`,
    defaultMessage: '',
  },*/
  errGlobalMissingTripcode: {
    id: `${scope}.err.Global.MISSING_TRIPCODE`,
    defaultMessage: 'Failed. You must have a trip code',
  },
  errGlobalUnknownCmd: {
    id: `${scope}.err.Global.UNKNOWN_CMD`,
    defaultMessage: 'Unknown command: {text}',
  },

  errCaptchaMustSolve: {
    id: `${scope}.err.Captcha.MUST_SOLVE`,
    defaultMessage: 'Enter the following (case-sensitive)',
  },
  errCaptchaNoRejoin: {
    id: `${scope}.err.Captcha.NO_REJOIN`,
    defaultMessage:
      'Could not auto-rejoin ?{channel}. The channel requires captcha verification',
  },
  errCaptchaBadCaptcha: {
    id: `${scope}.err.Captcha.BAD_CAPTCHA`,
    defaultMessage: 'Incorrect captcha',
  },

  errJoinInvalidNick: {
    id: `${scope}.err.Join.INVALID_NICK`,
    defaultMessage:
      'Username must consist of up to 24 letters, numbers, and underscores',
  },
  errJoinAlreadyJoined: {
    id: `${scope}.err.Join.ALREADY_JOINED`,
    defaultMessage: 'You are already in that channel',
  },
  errJoinNameTaken: {
    id: `${scope}.err.Join.NAME_TAKEN`,
    defaultMessage: 'Nickname taken in channel: ?{channel}',
  },
  errJoinChannelLocked: {
    id: `${scope}.err.Join.CHANNEL_LOCKED`,
    defaultMessage: 'You have been locked out',
  },
  errJoinLegacyRestrict: {
    id: `${scope}.err.Join.LEGACY_RESTRICT`,
    defaultMessage: 'Legacy clients may not join multiple channels',
  },

  errChannelInvalidName: {
    id: `${scope}.err.Channel.INVALID_NAME`,
    defaultMessage: 'Invalid channel name',
  },
  errChannelInvalidLength: {
    id: `${scope}.err.Channel.INVALID_LENGTH`,
    defaultMessage: 'Invalid channel length',
  },
  errChannelDeyBanned: {
    id: `${scope}.err.Channel.DEY_BANNED`,
    defaultMessage: "You're banned, lmao",
  },

  errInviteRatelimit: {
    id: `${scope}.err.Invite.RATELIMIT`,
    defaultMessage:
      'You are sending invites too quickly. Wait a moment before trying again',
  },

  errSaveConfigGeneralFailure: {
    id: `${scope}.err.SaveConfig.GENERAL_FAILURE`,
    defaultMessage: 'Failed to save config, check logs',
  },

  errClaimChannelModsCant: {
    id: `${scope}.err.ClaimChannel.MODS_CANT`,
    defaultMessage:
      "Failed to take ownership: You're already a global moderator; it's free real estate. . .",
  },
  errClaimChannelAlreadyOwned: {
    id: `${scope}.err.ClaimChannel.ALREADY_OWNED`,
    defaultMessage: `Failed to take ownership:
This channel is already owned by the trip "{ownerTrip}",
until {claimExpires}`,
  },

  errMakePrivateMissingPerms: {
    id: `${scope}.err.MakePrivate.MISSING_PERMS`,
    defaultMessage: 'Failed to make channel private: You may not do that',
  },
  errMakePrivateAlreadyPrivate: {
    id: `${scope}.err.MakePrivate.ALREADY_PRIVATE`,
    defaultMessage:
      'Failed to make channel private: This channel is already private',
  },

  errMakePublicMissingPerms: {
    id: `${scope}.err.MakePublic.MISSING_PERMS`,
    defaultMessage: 'Failed to make channel public: You may not do that',
  },
  errMakePublicAlreadyPublic: {
    id: `${scope}.err.MakePublic.ALREADY_PUBLIC`,
    defaultMessage:
      'Failed to make channel public: This channel is already public',
  },

  errRenewClaimModsCant: {
    id: `${scope}.err.RenewClaim.MODS_CANT`,
    defaultMessage:
      "Failed to renew ownership: You're already a global moderator; it's free real estate. . .",
  },
  errRenewClaimNotOwner: {
    id: `${scope}.err.RenewClaim.NOT_OWNER`,
    defaultMessage: 'Failed to renew ownership: You may not do that',
  },
  errRenewClaimTooSoon: {
    id: `${scope}.err.RenewClaim.TOO_SOON`,
    defaultMessage:
      'Failed to renew ownership: You must wait. Hours until renewable: {timeLeft}',
  },

  errSetLevelBadTrip: {
    id: `${scope}.err.SetLevel.BAD_TRIP`,
    defaultMessage:
      'Failed to set level: Invalid trip. Refer to `/help setlevel` for instructions on how to use this command',
  },
  errSetLevelBadLabel: {
    id: `${scope}.err.SetLevel.BAD_LABEL`,
    defaultMessage:
      'Failed to set level: Invalid level label; choices are case sensitive: {validLabels}',
  },
  errSetLevelBadLevel: {
    id: `${scope}.err.SetLevel.BAD_LEVEL`,
    defaultMessage:
      'Failed to set level: Target has same or better credentials',
  },
  errSetLevelApplyError: {
    id: `${scope}.err.SetLevel.APPLY_ERROR`,
    defaultMessage: 'Failed to set level: {setError}',
  },
  errSetLevelLevelConflict: {
    id: `${scope}.err.SetLevel.LEVEL_CONFLICT`,
    defaultMessage:
      'Failed to set level: New level may not be the same or greater than your own',
  },

  errSetMotdTooLong: {
    id: `${scope}.err.SetMOTD.TOO_LONG`,
    defaultMessage: 'Failed to set motd: Invalid motd, max length: {maxLength}',
  },

  errUnclaimChannelNotOwned: {
    id: `${scope}.err.UnclaimChannel.NOT_OWNED`,
    defaultMessage:
      'Failed to release ownership: That which is not owned may not be unowned, and with strange aeons. . .',
  },
  errUnclaimChannelFakeOwner: {
    id: `${scope}.err.UnclaimChannel.FAKE_OWNER`,
    defaultMessage: 'Failed to release ownership: Wrong trip code',
  },

  errChangeColorInvalidColor: {
    id: `${scope}.err.ChangeColor.INVALID_COLOR`,
    defaultMessage: 'Invalid color! Color must be in hex value',
  },
  errEmoteMissingText: {
    id: `${scope}.err.Emote.MISSING_TEXT`,
    defaultMessage:
      'Refer to `/help emote` for instructions on how to use this command',
  },

  errWhisperMissingNick: {
    id: `${scope}.err.Whisper.MISSING_NICK`,
    defaultMessage:
      'Refer to `/help whisper` for instructions on how to use this command',
  },
  errWhisperNoReply: {
    id: `${scope}.err.Whisper.NO_REPLY`,
    defaultMessage: 'Cannot reply to nobody',
  },

  errForceColorMissingNick: {
    id: `${scope}.err.ForceColor.MISSING_NICK`,
    defaultMessage:
      'Refer to `/help forcecolor` for instructions on how to use this command',
  },

  errForceFlairInvalidFlair: {
    id: `${scope}.err.ForceFlair.INVALID_FLAIR`,
    defaultMessage: 'Invalid flair',
  },
  errForceFlairMissingNick: {
    id: `${scope}.err.ForceFlair.MISSING_NICK`,
    defaultMessage:
      'Refer to `/help forceflair` for instructions on how to use this command',
  },

  errUsersBadHashOrIp: {
    id: `${scope}.err.Users.BAD_HASH_OR_IP`,
    defaultMessage: "hash:'targethash' or ip:'1.2.3.4' is required",
  },

  errHackRequestBadPerms: {
    id: `${scope}.err.HackRequest.BAD_PERMS`,
    defaultMessage:
      'You must be using a trip code that is channelModerator or higher',
  },
  errHackRequestRatelimit: {
    id: `${scope}.err.HackRequest.RATELIMIT`,
    defaultMessage:
      'You are sending hack requests too fast. Wait a moment before trying again',
  },
  errHackRequestTooLong: {
    id: `${scope}.err.HackRequest.TOO_LONG`,
    defaultMessage: 'Your URL is too long',
  },
  errHackRequestBadUrl: {
    id: `${scope}.err.HackRequest.BAD_URL`,
    defaultMessage: 'Your URL should start with https://',
  },

  errKickMissingNick: {
    id: `${scope}.err.Kick.MISSING_NICK`,
    defaultMessage:
      'Failed to kick: Missing name. Refer to `/help kick` for instructions on how to use this command',
  },

  errLockRoomLevelTooHigh: {
    id: `${scope}.err.LockRoom.LEVEL_TOO_HIGH`,
    defaultMessage:
      'Target level too high ({lockLevel}). You may only lock up to {currentLevel}',
  },
  errLockRoomLevelRequired: {
    id: `${scope}.err.LockRoom.LEVEL_REQUIRED`,
    defaultMessage:
      'Expected "level" to be a number or string label: {validLabels}',
  },
  errLockRoomAlreadyLocked: {
    id: `${scope}.err.LockRoom.ALREADY_LOCKED`,
    defaultMessage: 'Channel is already locked',
  },
  errLockRoomNoRejoin: {
    id: `${scope}.err.LockRoom.NO_REJOIN`,
    defaultMessage:
      'Could not auto-rejoin ?{channel}. The channel is currently locked',
  },
  errLockRoomInvalidPassword: {
    id: `${scope}.err.LockRoom.INVALID_PASSWORD`,
    defaultMessage: 'Invalid password',
  },
  errLockRoomNotLocked: {
    id: `${scope}.err.LockRoom.NOT_LOCKED`,
    defaultMessage: 'Channel is not locked',
  },
  errLockRoomUnlockReq: {
    id: `${scope}.err.LockRoom.UNLOCK_REQ`,
    defaultMessage: 'Level {lockLevel} required, you are level {currentLevel}',
  },

  errWalletInvalidAmount: {
    id: `${scope}.err.Wallet.INVALID_AMOUNT`,
    defaultMessage: 'Invalid amount',
  },
  errWalletUserNotReady: {
    id: `${scope}.err.Wallet.USER_NOT_READY`,
    defaultMessage: '@{nick} has not connected a wallet',
  },
  errWalletRpcError: {
    id: `${scope}.err.Wallet.RPC_ERROR`,
    defaultMessage: 'RPC error, try again later',
  },
  errWalletCmdHelp: {
    id: `${scope}.err.Wallet.CMD_HELP`,
    defaultMessage:
      'Refer to `/help getwallet` for instructions on how to use this command',
  },
  errWalletNoSelf: {
    id: `${scope}.err.Wallet.NO_SELF`,
    defaultMessage: 'You cannot relay transactions to yourself',
  },
  errWalletBadTx: {
    id: `${scope}.err.Wallet.BAD_TX`,
    defaultMessage: 'Missing or invalid transaction data',
  },
  errWalletYourNotReady: {
    id: `${scope}.err.Wallet.YOUR_NOT_READY`,
    defaultMessage: 'You must connect a wallet first',
  },

  errPasswordNoAutoJoin: {
    id: `${scope}.err.Password.NO_AUTO_JOIN`,
    defaultMessage:
      'Could not auto-rejoin ?{channel}. The channel is now password protected',
  },

  infoAdminYouAreMod: {
    id: `${scope}.info.Admin.YOU_ARE_MOD`,
    defaultMessage: 'You are now a mod',
  },
  infoAdminModAdded: {
    id: `${scope}.info.Admin.MOD_ADDED`,
    defaultMessage: 'Added mod: {trip}',
  },
  /*infoAdminUserList: {
    id: `${scope}.info.Admin.USER_LIST`,
    defaultMessage: '',
  },
  infoAdminReloadStatus: {
    id: `${scope}.info.Admin.RELOAD_STATUS`,
    defaultMessage: '',
  },*/
  infoAdminYouAreUser: {
    id: `${scope}.info.Admin.YOU_ARE_USER`,
    defaultMessage: 'You are no longer a global moderator',
  },
  infoAdminModRemoved: {
    id: `${scope}.info.Admin.MOD_REMOVED`,
    defaultMessage: 'Removed mod: {trip}',
  },
  infoAdminConfigSaved: {
    id: `${scope}.info.Admin.CONFIG_SAVED`,
    defaultMessage: 'Config saved',
  },

  infoModBanned: {
    id: `${scope}.info.Mod.BANNED`,
    defaultMessage: 'Banned {targetNick}',
  },
  infoModBannedDetailed: {
    id: `${scope}.info.Mod.BANNED_DETAILED`,
    defaultMessage:
      '{nick}#{trip} banned {targetNick} in {currentChannel}, userhash: {hash}',
  },
  infoModMuzzledDetailed: {
    id: `${scope}.info.Mod.MUZZLED_DETAILED`,
    defaultMessage:
      '{nick}#{trip} muzzled {targetUser} in {targetChannel}, userhash: {targetHash}',
  },
  infoModKickedDetailed: {
    id: `${scope}.info.Mod.KICKED_DETAILED`,
    defaultMessage: '{nick} was banished to ?{destChannel}',
  },
  infoModKicked: {
    id: `${scope}.info.Mod.KICKED`,
    defaultMessage: 'Kicked {kickedNames}',
  },
  infoModLockedDetailed: {
    id: `${scope}.info.Mod.LOCKED_DETAILED`,
    defaultMessage:
      'Channel: ?{targetChannel} locked to {lockLevel} by [{trip}]{nick}',
  },
  infoModUnmuzzledAll: {
    id: `${scope}.info.Mod.UNMUZZLED_ALL`,
    defaultMessage: '{nick} unmuzzled all users',
  },
  infoModUnmuzzledDetailed: {
    id: `${scope}.info.Mod.UNMUZZLED_DETAILED`,
    defaultMessage: '{nick}#{trip} unmuzzled : {target}',
  },
  infoModUnbannedDetailed: {
    id: `${scope}.info.Mod.UNBANNED_DETAILED`,
    defaultMessage: '{nick}#{trip} unbanned: {target}',
  },
  infoModUnbannedAllDetailed: {
    id: `${scope}.info.Mod.UNBANNED_ALL_DETAILED`,
    defaultMessage: '{nick}#{trip} unbanned all ip addresses',
  },
  infoModUnlockedDetailed: {
    id: `${scope}.info.Mod.UNLOCKED_DETAILED`,
    defaultMessage: 'Channel: ?{targetChannel} unlocked by [{trip}]{nick}',
  },
  infoModUwuifyEnabled: {
    id: `${scope}.info.Mod.UWUIFY_ENABLED`,
    defaultMessage: '{nick}#{trip} turned {targetUser} into a catboy',
  },
  infoModUwuifyDisabled: {
    id: `${scope}.info.Mod.UWUIFY_DISABLED`,
    defaultMessage: '{nick}#{trip} de-catted {targetUser}',
  },
  infoModPassEnabled: {
    id: `${scope}.info.Mod.PASS_ENABLED`,
    defaultMessage:
      'Password protection enabled on: ?{targetChannel} by [{trip}]{nick}',
  },
  infoModPassDisabled: {
    id: `${scope}.info.Mod.PASS_DISABLED`,
    defaultMessage:
      'Password protection removed on: ?{targetChannel} by [{trip}]{nick}',
  },

  infoCoreNickChanged: {
    id: `${scope}.info.Core.NICK_CHANGED`,
    defaultMessage: '{previousNick} is now {newNick}',
  },
  /*infoCoreMyHash: {
    id: `${scope}.info.Core.MY_HASH`,
    defaultMessage: '',
  },
  infoCoreHelpText: {
    id: `${scope}.info.Core.HELP_TEXT`,
    defaultMessage: '',
  },
  infoCoreMotd: {
    id: `${scope}.info.Core.MOTD`,
    defaultMessage: '',
  },
  infoCoreStatsFull: {
    id: `${scope}.info.Core.STATS_FULL`,
    defaultMessage: '',
  },*/
  infoCoreStatsBasic: {
    id: `${scope}.info.Core.STATS_BASIC`,
    defaultMessage:
      '{uniqueClientCount} unique IPs in {uniqueChannels} channels',
  },
  /*infoCorePurgatoryQuote: {
    id: `${scope}.info.Core.PURGATORY_QUOTE`,
    defaultMessage: '',
  },
  infoCorePurgatoryNotify: {
    id: `${scope}.info.Core.PURGATORY_NOTIFY`,
    defaultMessage: '',
  },
  infoCoreChannelList: {
    id: `${scope}.info.Core.CHANNEL_LIST`,
    defaultMessage: '',
  },*/
  infoCoreNewPublic: {
    id: `${scope}.info.Core.NEW_PUBLIC`,
    defaultMessage: 'A new channel has been made public: ?{targetChannel}',
  },

  infoCaptchaNotEnabled: {
    id: `${scope}.info.Captcha.NOT_ENABLED`,
    defaultMessage: 'Captcha is not enabled',
  },
  infoCaptchaDisabled: {
    id: `${scope}.info.Captcha.DISABLED`,
    defaultMessage: 'Captcha disabled on: ?{targetChannel}',
  },
  infoCaptchaAlreadyEnabled: {
    id: `${scope}.info.Captcha.ALREADY_ENABLED`,
    defaultMessage: 'Captcha is already enabled',
  },
  infoCaptchaEnabled: {
    id: `${scope}.info.Captcha.ENABLED`,
    defaultMessage: 'Captcha enabled on: ?{targetChannel}',
  },

  infoWalletDisconnected: {
    id: `${scope}.info.Wallet.DISCONNECTED`,
    defaultMessage: 'Wallet disconnected ({address})',
  },
  infoWalletAddressRequested: {
    id: `${scope}.info.Wallet.ADDRESS_REQUESTED`,
    defaultMessage: '@{nick} requested your wallet address',
  },
  infoWalletTxRelayed: {
    id: `${scope}.info.Wallet.TX_RELAYED`,
    defaultMessage: 'TX sent to @{nick}',
  },
  infoWalletViewed: {
    id: `${scope}.info.Wallet.VIEWED`,
    defaultMessage: '@{nick} viewed your wallet',
  },
  infoWalletConnected: {
    id: `${scope}.info.Wallet.CONNECTED`,
    defaultMessage: 'Now connected to: {address}',
  },

  infoChannelInfoNowOwned: {
    id: `${scope}.info.ChannelInfo.NOW_OWNED`,
    defaultMessage: 'Channel now owned by "{trip}", until {claimExpires}',
  },
  infoChannelInfoPermsChanged: {
    id: `${scope}.info.ChannelInfo.PERMS_CHANGED`,
    defaultMessage: 'Changed permission level of "{trip}" to "{level}"',
  },
  infoChannelInfoMotdChanged: {
    id: `${scope}.info.ChannelInfo.MOTD_CHANGED`,
    defaultMessage: 'MOTD changed by [{trip}]{nick}, new motd:',
  },
  infoChannelInfoOwnerReset: {
    id: `${scope}.info.ChannelInfo.OWNER_RESET`,
    defaultMessage:
      'Channel ownership has been removed and the channel settings have been reset',
  },
  infoChannelInfoNoPass: {
    id: `${scope}.info.ChannelInfo.NO_PASS`,
    defaultMessage: 'Channel does not currently have a password',
  },
};

export const ERROR_ID = [];
export const INFO_ID = [];

// System Errors
ERROR_ID[987654321] = messages.dcError;
ERROR_ID[987654322] = messages.rcWarning;
ERROR_ID[987654323] = messages.blockedNotice;

// Global Errors
ERROR_ID[11] = messages.errGlobalRatelimit;
ERROR_ID[12] = messages.errGlobalUnknownUser;
ERROR_ID[13] = messages.errGlobalPermission;
//ERROR_ID[14] = messages.errGlobalInternalError;
ERROR_ID[15] = messages.errGlobalMissingTripcode;
ERROR_ID[16] = messages.errGlobalUnknownCmd;

// Captcha Errors
ERROR_ID[21] = messages.errCaptchaMustSolve;
ERROR_ID[22] = messages.errCaptchaNoRejoin;
ERROR_ID[23] = messages.errCaptchaBadCaptcha;

// Join Errors
ERROR_ID[31] = messages.errJoinInvalidNick;
ERROR_ID[32] = messages.errJoinAlreadyJoined;
ERROR_ID[33] = messages.errJoinNameTaken;
ERROR_ID[34] = messages.errJoinChannelLocked;
ERROR_ID[35] = messages.errJoinLegacyRestrict;

// Channel Errors
ERROR_ID[41] = messages.errChannelInvalidName;
ERROR_ID[42] = messages.errChannelInvalidLength;
ERROR_ID[43] = messages.errChannelDeyBanned;

// Invite Errors
ERROR_ID[51] = messages.errInviteRatelimit;

// SaveConfig Errors
ERROR_ID[61] = messages.errSaveConfigGeneralFailure;

// ClaimChannel Errors
ERROR_ID[71] = messages.errClaimChannelModsCant;
ERROR_ID[72] = messages.errClaimChannelAlreadyOwned;

// MakePrivate Errors
ERROR_ID[81] = messages.errMakePrivateMissingPerms;
ERROR_ID[82] = messages.errMakePrivateAlreadyPrivate;

// MakePublic Errors
ERROR_ID[91] = messages.errMakePublicMissingPerms;
ERROR_ID[92] = messages.errMakePublicAlreadyPublic;

// RenewClaim Errors
ERROR_ID[101] = messages.errRenewClaimModsCant;
ERROR_ID[102] = messages.errRenewClaimNotOwner;
ERROR_ID[103] = messages.errRenewClaimTooSoon;

// SetLevel Errors
ERROR_ID[111] = messages.errSetLevelBadTrip;
ERROR_ID[112] = messages.errSetLevelBadLabel;
ERROR_ID[113] = messages.errSetLevelBadLevel;
ERROR_ID[114] = messages.errSetLevelApplyError;
ERROR_ID[115] = messages.errSetLevelLevelConflict;

// SetMOTD Errors
ERROR_ID[121] = messages.errSetMotdTooLong;

// UnclaimChannel Errors
ERROR_ID[131] = messages.errUnclaimChannelNotOwned;
ERROR_ID[132] = messages.errUnclaimChannelFakeOwner;

// ChangeColor Errors
ERROR_ID[141] = messages.errChangeColorInvalidColor;

// Emote Errors
ERROR_ID[151] = messages.errEmoteMissingText;

// Whisper Errors
ERROR_ID[161] = messages.errWhisperMissingNick;
ERROR_ID[162] = messages.errWhisperNoReply;

// ForceColor Errors
ERROR_ID[171] = messages.errForceColorMissingNick;

// ForceFlair Errors
ERROR_ID[181] = messages.errForceFlairInvalidFlair;
ERROR_ID[182] = messages.errForceFlairMissingNick;

// Users Errors
ERROR_ID[191] = messages.errUsersBadHashOrIp;

// HackRequest Errors
ERROR_ID[201] = messages.errHackRequestBadPerms;
ERROR_ID[202] = messages.errHackRequestRatelimit;
ERROR_ID[203] = messages.errHackRequestTooLong;
ERROR_ID[204] = messages.errHackRequestBadUrl;

// Kick Errors
ERROR_ID[211] = messages.errKickMissingNick;

// LockRoom Errors
ERROR_ID[221] = messages.errLockRoomLevelTooHigh;
ERROR_ID[222] = messages.errLockRoomLevelRequired;
ERROR_ID[223] = messages.errLockRoomAlreadyLocked;
ERROR_ID[224] = messages.errLockRoomNoRejoin;
ERROR_ID[225] = messages.errLockRoomInvalidPassword;
ERROR_ID[226] = messages.errLockRoomNotLocked;
ERROR_ID[227] = messages.errLockRoomUnlockReq;

// Wallet Errors
ERROR_ID[231] = messages.errWalletInvalidAmount;
ERROR_ID[232] = messages.errWalletUserNotReady;
ERROR_ID[233] = messages.errWalletRpcError;
ERROR_ID[234] = messages.errWalletCmdHelp;
ERROR_ID[235] = messages.errWalletNoSelf;
ERROR_ID[236] = messages.errWalletBadTx;
ERROR_ID[237] = messages.errWalletYourNotReady;

// Password Errors
ERROR_ID[241] = messages.errPasswordNoAutoJoin;

// Admin Info
INFO_ID[1101] = messages.infoAdminYouAreMod;
INFO_ID[1102] = messages.infoAdminModAdded;
// INFO_ID[1103] = messages.infoAdminUserList;
// INFO_ID[1104] = messages.infoAdminReloadStatus;
INFO_ID[1105] = messages.infoAdminYouAreUser;
INFO_ID[1106] = messages.infoAdminModRemoved;
INFO_ID[1107] = messages.infoAdminConfigSaved;

// Mod Info
INFO_ID[1201] = messages.infoModBanned;
INFO_ID[1202] = messages.infoModBannedDetailed;
INFO_ID[1203] = messages.infoModMuzzledDetailed;
INFO_ID[1204] = messages.infoModKickedDetailed;
INFO_ID[1205] = messages.infoModKicked;
INFO_ID[1206] = messages.infoModLockedDetailed;
INFO_ID[1207] = messages.infoModUnmuzzledAll;
INFO_ID[1208] = messages.infoModUnmuzzledDetailed;
INFO_ID[1209] = messages.infoModUnbannedDetailed;
INFO_ID[1210] = messages.infoModUnbannedAllDetailed;
INFO_ID[1211] = messages.infoModUnlockedDetailed;
INFO_ID[1212] = messages.infoModUwuifyEnabled;
INFO_ID[1213] = messages.infoModUwuifyDisabled;
INFO_ID[1214] = messages.infoModPassEnabled;
INFO_ID[1215] = messages.infoModPassDisabled;

// Core Info
INFO_ID[1301] = messages.infoCoreNickChanged;
// INFO_ID[1302] = messages.infoCoreMyHash;
// INFO_ID[1303] = messages.infoCoreHelpText;
// INFO_ID[1304] = messages.infoCoreMotd;
// INFO_ID[1305] = messages.infoCoreStatsFull;
INFO_ID[1306] = messages.infoCoreStatsBasic;
// INFO_ID[1307] = messages.infoCorePurgatoryQuote;
// INFO_ID[1308] = messages.infoCorePurgatoryNotify;
// INFO_ID[1309] = messages.infoCoreChannelList;
INFO_ID[1310] = messages.infoCoreNewPublic;

// Captcha Info
INFO_ID[1401] = messages.infoCaptchaNotEnabled;
INFO_ID[1402] = messages.infoCaptchaDisabled;
INFO_ID[1403] = messages.infoCaptchaAlreadyEnabled;
INFO_ID[1404] = messages.infoCaptchaEnabled;

// Wallet Info
INFO_ID[1501] = messages.infoWalletDisconnected;
INFO_ID[1502] = messages.infoWalletAddressRequested;
INFO_ID[1503] = messages.infoWalletTxRelayed;
INFO_ID[1504] = messages.infoWalletViewed;
INFO_ID[1505] = messages.infoWalletConnected;

// Channel Info
INFO_ID[1601] = messages.infoChannelInfoNowOwned;
INFO_ID[1602] = messages.infoChannelInfoPermsChanged;
INFO_ID[1603] = messages.infoChannelInfoMotdChanged;
INFO_ID[1604] = messages.infoChannelInfoOwnerReset;
INFO_ID[1605] = messages.infoChannelInfoNoPass;

export default defineMessages(messages);
