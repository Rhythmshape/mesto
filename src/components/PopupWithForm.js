import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formSelector = this._popup.querySelector('.edit-form');
    this._inputList = this._formSelector.querySelectorAll('.edit-form__item');
  }

  //условно приватный метод получение значения инпутов в форму попапа класса PopupWithForm
  _getInputValues() {
    this._formInputValues = {};
    this._inputList.forEach(input => {
      this._formInputValues[input.name] = input.value;
    })

    return this._formInputValues;

  }

 //публичный метод установки инпутов из формы
  setInputValues(data) {
    this._inputList.forEach(input => {
      input.value = data[input.name];
    });
  }

  close() {
    super.close();
    this._formSelector.reset();
  }


  setEventListeners() {
    super.setEventListeners();
    this._formSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    })
  }
}
