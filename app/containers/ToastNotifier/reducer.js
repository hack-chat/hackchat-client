/**
 * ToastNotifier reducer exports
 */

import { produce } from 'immer';
import { SHOW_TOAST } from './constants';

export const initialState = {
  message: null,
  type: 'info',
  id: null,
  args: {},
  trigger: null,
};

const ToastNotifierReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SHOW_TOAST:
        draft.message = action.payload.message;
        draft.type = action.payload.type;
        draft.id = action.payload.id || null;
        draft.args = action.payload.args || {};
        draft.trigger = new Date().getTime();
        break;
    }
  });

export default ToastNotifierReducer;
