import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor({popupSelector, handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formSelector = this._popup.querySelector('.edit-form');
  }

  //публичный метод класса PopupWithConfirmation для открытия попапа
  // и определения объекта карточки, на которой будут соверщать действие

  open(card) {
    super.open();
    this._card = card;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._card);
    })
  }

}
