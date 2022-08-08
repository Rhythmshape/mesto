import './../../styles/index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';

import {
  initialCards,
  cardsToPut,
  validationAttributes,
  profileName,
  profileDescription,
  cardsContainer,
  formProfile,
  formPlace,
  popupProfileOpenButton,
  popupPlaceOpenButton
} from '../utils/constants.js';

//Информация о пользователе
const profileInfo = new UserInfo({
  profileNameSelector: profileName,
  profileDescriptionSelector: profileDescription
 }
);

//Попап редактирования профиля
const popupEditProfile = new PopupWithForm({
  popupSelector: '.popup_type_profile-editing',
  handleFormSubmit: (data) => {
    profileInfo.setUserInfo(data);
    popupEditProfile.close();
  }
});

popupEditProfile.setEventListeners();

//Попап просмотра изображения карточки
const popupImageOpen = new PopupWithImage(
  '.popup_type_image-opening'
);
popupImageOpen.setEventListeners();

//Функция создания карточки
const createCard = (item) => {
  const card = new Card({
    data: item,
    template: '#template-for-element',
    handleCardElementClick: (title,image) => {
      popupImageOpen.open(title,image);
    }
  });
  const cardElement = card.generateCard();
  return cardElement;
};

//создание секции, отвечающей за добавление исходных карточек в контейнер
const cardsSection = new Section({
  items: initialCards,
  renderer: (item) => {
    cardsSection.addItem(createCard(item));
  },
},
  cardsContainer
);

//попап добавления карточки места
const popupElementAdd = new PopupWithForm({
  popupSelector: '.popup_type_element-add',
  handleFormSubmit: (item) => {
    cardsSection.addItem(createCard(item));
    popupElementAdd.close();
  }
}
);
popupElementAdd.setEventListeners();

// Валидация форм
// создать валидатор форм места и профиля
const profileFormValidator = new FormValidator(validationAttributes, formProfile);
const placeFormValidator = new FormValidator(validationAttributes, formPlace);

//вызвать метод enableValidation для валидатора каждой формы
placeFormValidator.enableValidation();
profileFormValidator.enableValidation();

//Добавить слушатели на нажатие кнопок открытия попапов профиля и места
popupProfileOpenButton.addEventListener('click', function () {
  const initialProfileInfo = profileInfo.getUserInfo();
  profileFormValidator.resetFormValidation();// сбросить валидацию формы
  popupEditProfile.setInputValues(initialProfileInfo);
  popupEditProfile.open();
});

popupPlaceOpenButton.addEventListener("click", function () {
  placeFormValidator.resetFormValidation();// сбросить валидацию формы
  popupElementAdd.open();
});

//Отрисовка исходных карточек на странице
cardsSection.render();




