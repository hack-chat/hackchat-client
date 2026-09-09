/**
 * ToastNotifier action exports
 */

import { SHOW_TOAST } from './constants';

/**
 * Trigger a toast to pop
 * @return {object} An action object with a type of SHOW_TOAST
 */
export function showToast(message, type = 'info', id = null, args = {}) {
  return {
    type: SHOW_TOAST,
    payload: { message, type, id, args },
  };
}
