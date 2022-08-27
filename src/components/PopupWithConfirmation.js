import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
  //публичный метод установки сабмита
  setSubmitHandler(callbackSubmit) {
    this._callbackSubmit = callbackSubmit;
  };
  //публичный метод класса PopupWithConfirmation для открытия попапа
  // и определения аргумента колбэка (карточки), на которой будут совершать действие сабмита
  open(arg) {
    super.open();
    this._callbackArg = arg;
  };

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._callbackSubmit(this._callbackArg);
    })
  }

}
