class FormValidator {
  constructor(attributes, formElement) {
    this._attributes = { ...attributes };
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._attributes.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._attributes.submitButtonSelector);
  }

  //набор условно приватных методов класса FormValidator
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._attributes.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._attributes.errorClass);
  };

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._attributes.inputErrorClass);
    errorElement.classList.remove(this._attributes.errorClass);
    errorElement.textContent = '';
  };

  _resetInputErrors() {
    const inputElements = this._formElement.querySelectorAll(this._attributes.inputSelector);
    inputElements.forEach((element) => {
      this._hideInputError(element);
    });
  };

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    };
  };

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _toggleButtonState(buttonElement) {
    if (this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._buttonElement.classList.remove(this._attributes.inactiveButtonClass);
      this._buttonElement.disabled = false;
    };
  };

  _disableButton() {
    this._buttonElement.classList.add(this._attributes.inactiveButtonClass);
    this._buttonElement.disabled = true;
  };

  resetFormValidation() {  //публичный метод сброса ошибок форм и сброса активного состояния кнопки
    this._resetInputErrors();
    this._disableButton();
  };

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };

  enableValidation() {  //публичный метод валидации форм
    this._setEventListeners();
  };

};

export { FormValidator };
