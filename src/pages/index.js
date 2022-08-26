import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

import {
  validationAttributes,
  profileName,
  profileDescription,
  profileAvatar,
  formProfile,
  formPlace,
  formAvatar,
  popupProfileOpenButton,
  popupPlaceOpenButton,
  popupAvatarOpenButton,

} from '../utils/constants.js';

const api = new Api({
  serverUrl: 'https://mesto.nomoreparties.co/v1/cohort-48',
  headers: {
    authorization: '5d2947c9-bb9f-4c7f-aef0-c89bfe848fc0',
    'Content-Type': 'application/json'
  }
});

let user;

// загрузка с сервера информации о пользователе и начальных карточек
Promise.all([api.getUserInfoApi(), api.getInitialCards()])
  .then(([userInfo, initialCards]) => {
    user = userInfo;
    profileInfo.setUserInfo(userInfo);
    profileInfo.setUserAvatar(userInfo);
    cardsSection.render(initialCards);
  })
  .catch((err) => {
    console.log(err);
  });

//создание экземпляра класса с информацией о пользователе (имя, описание, аватар)
const profileInfo = new UserInfo({
  userProfileName: profileName,
  userProfileDescription: profileDescription,
  userProfileAvatar: profileAvatar,
}
);

//Попап редактирования профиля
const popupEditProfile = new PopupWithForm({
  popupSelector: '.popup_type_profile-editing',
  handleFormSubmit: (data) => {
    popupEditProfile.showLoading(true);
    api.editPageUserInfo(data)
      .then((userData) => {
        profileInfo.setUserInfo(userData);
        popupEditProfile.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupEditProfile.showLoading(false);
      });
  }
}
);

popupEditProfile.setEventListeners();

//Попап редактирования ававтара
const popupEditAvatar = new PopupWithForm({
  popupSelector: '.popup_type_avatar-editing',
  handleFormSubmit: (data) => {
    popupEditAvatar.showLoading(true);
    api.editUserAvatar(data)
      .then((userData) => {
        profileInfo.setUserAvatar(userData);
        popupEditAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupEditAvatar.showLoading(false);
      });
  }
}
);

popupEditAvatar.setEventListeners();

//Попап просмотра изображения карточки
const popupImageOpen = new PopupWithImage(
  '.popup_type_image-opening'
);
popupImageOpen.setEventListeners();

//Попап подтверждения удаления карточки
const popupDeleteCard = new PopupWithConfirmation('.popup_type_element-delete');
  popupDeleteCard.handleConfirmationSubmit(
     card => {
    api.deleteCard(card.cardId)
      .then(() => {
        card.deleteCard();
        popupDeleteCard.close();
      })
      .catch((err) => {
        console.log(err);
      })
  }
)

popupDeleteCard.setEventListeners();

//Создание карточки
const createCard = (item) => {
  const card = new Card({
    data: item,
    template: '#template-for-element',
    handleCardClick: (title, image) => {
      popupImageOpen.open(title, image);
    },
    handleAddLike: (card) => {
      api.addLike(card.cardId)
        .then((data) => {
          card.loadCard(data);
        })
        .catch((err) => {
          console.log(err);
        })
    },
    handleRemoveLike: (card) => {
      api.removeLike(card.cardId)
        .then((data) => {
          card.loadCard(data);
        })
        .catch((err) => {
          console.log(err);
        })
    },
    handleDeleteButtonClick: (card) => {
      popupDeleteCard.open(card)
    },
  }, user._id);

  const newCard = card.generateCard();
  return newCard;
};

//создание экземпляра секции, отвечающей за добавление исходных карточек в контейнер
const cardsSection = new Section({
  renderer: (item) => {
    cardsSection.addItem(createCard(item));
  },
},
  '.elements__list'
);

//попап добавления карточки места
const popupAddCard = new PopupWithForm({
  popupSelector: '.popup_type_element-add',
  handleFormSubmit: (item) => {
    popupAddCard.showLoading(true);
    api.addCard(item)
      .then((data) => {
        cardsSection.addItem(createCard(data));
        popupAddCard.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupAddCard.showLoading(false);
      });
  }
}
);
popupAddCard.setEventListeners();

// Валидация форм
// создать валидатор форм места, профиля и аватара
const profileFormValidator = new FormValidator(validationAttributes, formProfile);
const placeFormValidator = new FormValidator(validationAttributes, formPlace);
const avatarFormValidator = new FormValidator(validationAttributes, formAvatar);

//вызвать метод enableValidation для валидатора каждой формы
placeFormValidator.enableValidation();
profileFormValidator.enableValidation();
avatarFormValidator.enableValidation();

//Добавить слушатели на нажатие кнопок открытия попапов профиля, места, аватара
popupProfileOpenButton.addEventListener('click', function () {
  const initialProfileInfo = profileInfo.getUserInfo();
  profileFormValidator.resetFormValidation();// сбросить валидацию формы
  popupEditProfile.setInputValues(initialProfileInfo);
  popupEditProfile.open();
});

popupAvatarOpenButton.addEventListener('click', function () {
  const initialProfileAvatar = profileInfo.getUserInfo();
  avatarFormValidator.resetFormValidation();// сбросить валидацию формы
  popupEditAvatar.setInputValues(initialProfileAvatar);
  popupEditAvatar.open();
});

popupPlaceOpenButton.addEventListener("click", function () {
  placeFormValidator.resetFormValidation();// сбросить валидацию формы
  popupAddCard.open();
});





