import { error, success, defaultModules } from '../../node_modules/@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '../../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import * as PNotifyCountdown from '@pnotify/countdown';

defaultModules.set(PNotifyMobile, { swipeDismiss: false });

export default class Message {
  static error = text => {
    error({ title: text });
  };

  static success = text => {
    success({ text });
  };
}
