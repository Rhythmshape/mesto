// массив карточек для добавления на страницу
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const cardsToPut = { ...initialCards };

const validationAttributes = {
  formSelector: '.edit-form',
  inputSelector: '.edit-form__item',
  submitButtonSelector: '.edit-form__submit-button',
  inactiveButtonClass: 'edit-form__submit-button_disabled',
  inputErrorClass: 'edit-form__item_state_error',
  errorClass: 'edit-form__input-error_visible'
};

// Получить доступ к DOM-элементам
// Получить доступ к кнопкe edit для открытия поп-апа редактирования профиля
const popupProfileOpenButton = document.querySelector('.profile__edit-button');
// Получить доступ к кнопкe add для открытия поп-апа добавления новой карточки с местом
const popupPlaceOpenButton = document.querySelector('.profile__add-button');

// Получить доступ к элементам profile для заполнения формы popupEditProfil
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

// Получить доступ к форме profile-edit-form для popupEditProfile и ее элементам
const formProfile = document.querySelector('#profile-edit-form');
const formProfileName = document.querySelector('#author-name');
const formProfileDescription = document.querySelector('#author-description');

// Получить доступ к форме place-form  для popupElementAdd и ее элементам
const formPlace = document.querySelector('#place-form');

export {
  initialCards,
  cardsToPut,
  validationAttributes,
  profileName,
  profileDescription,
  formProfileName,
  formProfileDescription,
  formProfile,
  formPlace,
  popupProfileOpenButton,
  popupPlaceOpenButton,
}
