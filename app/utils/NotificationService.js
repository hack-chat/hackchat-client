// utils/NotificationService.js
import notifyAudioFile from '../notify.mp3';
import appLogo from '../images/icon-512x512.png';
import badgeLogo from '../images/badge-monochrome.png';

const alertSound =
  typeof window !== 'undefined' ? new Audio(notifyAudioFile) : null;

export const requestNotificationPermission = async () => {
  if (!('Notification' in window)) return false;
  if (Notification.permission === 'granted') return true;

  const permission = await Notification.requestPermission();
  return permission === 'granted';
};

export const pushNotification = async (
  title,
  body,
  playSound = true,
  channelName = null,
) => {
  if (!('Notification' in window)) return;

  if (Notification.permission === 'default') {
    await requestNotificationPermission();
  }

  if (Notification.permission === 'granted') {
    const notification = new Notification(title, {
      body,
      icon: appLogo,
      silent: true,
      tag: channelName ? `channel-${channelName}` : 'default-tag',
      badge: badgeLogo,
    });

    notification.onclick = () => {
      window.focus();
      if (channelName) {
        window.dispatchEvent(
          new CustomEvent('app:switch-channel', {
            detail: { channel: channelName },
          }),
        );
      }
      notification.close();
    };

    if (playSound && alertSound) {
      alertSound.currentTime = 0;
      alertSound.play().catch((e) => {
        // eslint-disable-next-line no-console
        console.warn('Audio autoplay blocked by browser:', e);
      });
    }
  }
};
