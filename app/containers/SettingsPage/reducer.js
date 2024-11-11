/**
 * SettingsPage reducer exports
 */

import { produce } from 'immer';
import { DEFAULT_ACTION } from './constants';

export const initialState = {};

const settingsPageReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
    }
  });

export default settingsPageReducer;
