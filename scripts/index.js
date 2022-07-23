import { Card } from './Card.js';  //импорт классов Card и FormValidator
import { FormValidator } from './FormValidator.js';
import { initialCards } from './initial-cards.js';//импорт cущностей initial-cards и validationAttributes
import { validationAttributes } from './validationAttributes.js';

// Получить доступ к DOM-элементам profile, popup
const popupEditProfile = document.querySelector('.popup_type_profile-editing');
const popupElementAdd = document.querySelector('.popup_type_element-add');
const popupImageOpen = document.querySelector('.popup_type_image-opening');
const profile = document.querySelector('.profile');
// Доступ к шаблону карточки
const element = document.querySelector('.element');
// Доступ к оверлею
const overlays = document.querySelectorAll('.popup');
// Доступ к кнопкам закрытия поп-апов
const popupCloseButtons = document.querySelectorAll('.popup__close-button');
// Получить доступ к кнопкe edit для открытия поп-апа редактирования профиля
const popupProfileOpenButton = profile.querySelector('.profile__edit-button');
// Получить доступ к кнопкe add для открытия поп-апа добавления новой карточки с местом
const popupPlaceOpenButton = profile.querySelector('.profile__add-button');

// Получить доступ к элементам profile для заполнения формы popupEditProfil
const profileName = profile.querySelector('.profile__name');
const profileDescription = profile.querySelector('.profile__description');

// Получить доступ к форме profile-edit-form для popupEditProfile и ее элементам
const formProfile = document.querySelector('#profile-edit-form');
const formProfileName = document.querySelector('#author-name');
const formProfileDescription = document.querySelector('#author-description');
const formProfileSubmitButton = document.querySelector('#profile-submit');

// Получить доступ к форме place-form  для popupElementAdd и ее элементам
const formPlace = document.querySelector('#place-form');
const formPlaceTitle = document.querySelector('#place-title');
const formPlaceLink = document.querySelector('#place-link');
const formPlaceSubmitButton = document.querySelector('#place-submit');

// Получить доступ к списку карточек
const cardsContainer = document.querySelector('.elements__list'); //<ul>

// Получить доступ к элементам popupImageOpen
const popupImage = popupImageOpen.querySelector('.popup__image');
const popupImageCaption = popupImageOpen.querySelector('.popup__image-caption');

// Функция открытия popup стандартная
const openPopup = function (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', keyDownHahndler);
};

// Функция закрытия popup стандартная
const closePopup = function (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', keyDownHahndler);
};

// Функция закрытия любого текущего открытого попапа
const closeCurrentOpenedPopup = () => {
  const currentOpenedPopup = document.querySelector('.popup_opened');
  if (currentOpenedPopup) {
    closePopup(currentOpenedPopup);
  };
};

// Функция закрытия popup по клавише Escape
const keyDownHahndler = (evt) => {
  if (evt.key === 'Escape') {
    closeCurrentOpenedPopup();
  }
};

// Функция заполнения инпутов формы профиля при открытии
const fillFormEditProfile = (item) => {
  formProfileName.value = profileName.textContent;
  formProfileDescription.value = profileDescription.textContent;
};
// Функция заполнения инпутов формы места при открытии
const fillFormPlace = (item) => {
  formPlaceLink.value = '';
  formPlaceTitle.value = '';
};

//Функция создания карточки
const createCard = (item) => {
  const card = new Card(item, '#template-for-element', handleCardElementClick);
  const cardElement = card.generateCard();
  return cardElement;
};

//Пройти по массиву исходных карточек и добавить каждую карточку в конец списка карточек
initialCards.forEach((item) => {
  const viewInitialCard = createCard(item);
  cardsContainer.append(viewInitialCard);
});

//Функция присвоения значений изображению и подписи попапа картинки и его открытие
function handleCardElementClick(title, image) {
  popupImage.src = image;
  popupImage.alt = title;
  popupImageCaption.textContent = title;
  openPopup(popupImageOpen);
};

// Функция  отправки формы редактирования профиля и замена текста элементов профиля на вновь введенное содержимое формы
function editProfileSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = formProfileName.value;
  profileDescription.textContent = formProfileDescription.value;
  closePopup(popupEditProfile);
};

// Функция  отправки формы добавления карточки и присвоение значений атрибутам карточек из заполненной формы
function addCardSubmitHandler(evt) {
  evt.preventDefault();
  const addedCards = {
    link: formPlaceLink.value,
    name: formPlaceTitle.value
  };
  const addedCard = createCard(addedCards);
  cardsContainer.prepend(addedCard);// Добавить карточку в начало списка карточек
  closePopup(popupElementAdd);
};

// Функция  закрытия всех поп-апов при клике на крестик
popupCloseButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});


// Функция  закрытия всех поп-апов при клике на оверлей
overlays.forEach((overlay) => {
  overlay.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(overlay);
    }
  });
});

// создать валидатор форм места и профиля
const profileFormValidator = new FormValidator(validationAttributes, formProfile);
const placeFormValidator = new FormValidator(validationAttributes, formPlace);

//вызвать метод enableValidation для валидатора каждой формы
placeFormValidator.enableValidation();
profileFormValidator.enableValidation();

//Добавить слушатели на нажатие кнопок открытия попапов профиля и места и сабмита форм
popupProfileOpenButton.addEventListener('click', function () {
  profileFormValidator.resetFormValidation();// сбросить валидацию формы
  fillFormEditProfile();
  openPopup(popupEditProfile);
});

formProfile.addEventListener('submit', editProfileSubmitHandler);

popupPlaceOpenButton.addEventListener("click", function () {
  placeFormValidator.resetFormValidation();// сбросить валидацию формы
  fillFormPlace();
  openPopup(popupElementAdd);
});

formPlace.addEventListener('submit', addCardSubmitHandler);




