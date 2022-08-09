export default class Popup {
  constructor (popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this); // для конкретного попапа
  }
  //условно приватный метод закрытия класса Popup по клавише Esc
  _handleEscClose(evt) {
  if (evt.key === 'Escape') {
    this.close();
    }
  }
//публичный метод открытия popup
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  };

//публичный метод открытия popup
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  };

//публичный метод установки слушателей на закрытие по крестику и оверлею для popup
  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened') ||
      evt.target.classList.contains('popup__close-button')) {
        this.close();
      }
  });
 }
}
