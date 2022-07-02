const validationAttributes = ({
  formSelector: '.edit-form',
  inputSelector: '.edit-form__item',
  submitButtonSelector: '.edit-form__submit-button',
  inactiveButtonClass: 'edit-form__submit-button_disabled',
  inputErrorClass: 'edit-form__item_state_error',
  errorClass: 'edit-form__input-error_visible'
});

const showInputError = (formElement, inputElement, errorMessage, validationAttributes) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationAttributes.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationAttributes.errorClass);
};

const hideInputError = (formElement, inputElement, validationAttributes) => {
 const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
 inputElement.classList.remove(validationAttributes.inputErrorClass);
 errorElement.classList.remove(validationAttributes.errorClass);
 errorElement.textContent = "";
};

const resetInputErrors = (formElement, validationAttributes) => {
  const inputElements = formElement.querySelectorAll(validationAttributes.inputSelector);
  inputElements.forEach((element) => {
   hideInputError(formElement, element, validationAttributes );
  });
};

const checkInputValidity = (formElement, inputElement, validationAttributes) => {
  if (!inputElement.validity.valid) {
     showInputError(formElement, inputElement, inputElement.validationMessage, validationAttributes );
}   else {
     hideInputError(formElement, inputElement, validationAttributes);
 } ;
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, validationAttributes) => {
  if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(validationAttributes.inactiveButtonClass);
      buttonElement.disabled = true;
  } else {
      buttonElement.classList.remove(validationAttributes.inactiveButtonClass);
      buttonElement.disabled = false;
  };
};

const disableButton = (buttonElement, validationAttributes ) => {
  buttonElement.classList.add(validationAttributes.inactiveButtonClass);
  buttonElement.disabled = true;
}

const setEventListeners = (formElement, validationAttributes) => {
 const inputList = Array.from(formElement.querySelectorAll(validationAttributes.inputSelector));
 const buttonElement = formElement.querySelector(validationAttributes.submitButtonSelector);

 toggleButtonState(inputList, buttonElement, validationAttributes);

  inputList.forEach((inputElement) => {
   inputElement.addEventListener('input', () => {
     checkInputValidity(formElement, inputElement, validationAttributes);
     toggleButtonState(inputList, buttonElement, validationAttributes);
     });
  });
};

const enableValidation = (validationAttributes) => {
  const formList = Array.from(document.querySelectorAll(validationAttributes.formSelector));
  formList.forEach((formElement) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    });
    setEventListeners(formElement, validationAttributes);
  });
};

enableValidation(validationAttributes);



