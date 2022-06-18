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

// Получить доступ к DOM-элементам profile, popup, edit-form
const popupEditProfile = document.querySelector('.popup_type_profile-editing');
const popupElementAdd = document.querySelector('.popup_type_element-add');
const popupImageOpen = document.querySelector('.popup_type_image-opening');
const profile = document.querySelector('.profile');
const editForm = document.querySelector('.edit-form');
const popup = document.querySelector('.popup');
const element = document.querySelector('.element');

// Доступ к кнопкам
// Получить доступ к кнопкe close
const closeButton = popup.querySelector('.popup__close-button');
const closeButtonProfile = popupEditProfile.querySelector("#profile-close");
const closeButtonElement = popupElementAdd.querySelector("#element-close");
const closeButtonImage = popupImageOpen.querySelector("#image-close");
// Получить доступ к кнопкe edit
const editButton = profile.querySelector('.profile__edit-button');
// Получить доступ к кнопкe add
const addButton = profile.querySelector('.profile__add-button');

// Получить доступ к элементам profile для заполнения формы popupEditProfil
const profileName = profile.querySelector('.profile__name');
const profileDescription = profile.querySelector('.profile__description');

// Получить доступ к элементам profile-edit-form для заполнения формы popupEditProfile
const editFormProfile = document.querySelector('#profile-edit-form');
const editFormItemName = editForm.querySelector('.edit-form__item_type_name');
const editFormItemDescription = editForm.querySelector('.edit-form__item_type_description');

// Получить доступ к элементам place-form для popupElementAdd
const editFormPlace = document.querySelector('#place-form');
const editFormPlaceTitle = document.querySelector('#place-title');
const editFormPlaceLink = document.querySelector('#place-link');

// Получить доступ к списку карточек
const elementsList = document.querySelector('.elements__list'); //<ul>
 //создание документ-фрагмента из шаблона
const elementTemplate = document.querySelector('.element-template').content;
// Получить доступ к элеенту списка карточек
const newElementListItem = elementTemplate.querySelector('.elements__list-item');

// Получить доступ к элементам popupImageOpen
const popupImage = popupImageOpen.querySelector('.popup__image');
const popupImageCaption = popupImageOpen.querySelector('.popup__image-caption');

// Функция открытия popup стандартная
function openPopup(popup) {
  popup.classList.add('popup_opened');
};

// Функция закрытия popup стандартная
function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

//Функция открытия popupEditProfile и заполнения значений формы из элементов profile
function openEditProfile() {
  openPopup(popupEditProfile);
  editFormItemName.value = profileName.textContent;
  editFormItemDescription.value = profileDescription.textContent;
};

// Функция  отправки формы редактирования профиля и замена текста элементов профиля на вновь введенное содержимое формы
function editProfileSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = editFormItemName.value;
  profileDescription.textContent = editFormItemDescription.value;
  closePopup(popupEditProfile) ;
};

//Функция создания карточки
function createCard (CARD) {
  const newCard = newElementListItem.cloneNode(true); //скопировать элемент списка со всем содержимым  в newCard
  //Получить доступ к элементам названия и ссылки на картинку для карточки
  const newElementListItemImage = newCard.querySelector('.element__image');
  const newElementListItemTitle = newCard.querySelector('.element__title');
  //Присвоить значения атрибутам карточки
  newElementListItemTitle.textContent = CARD.name;
  newElementListItemImage.src = CARD.link;
  newElementListItemImage.alt = CARD.name;
  //Добавить слушатель на кнопку лайк и реализовать toggle при нажатии
  newCard.querySelector('.element__like-button').addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__like-button_active');
  });
  //Добавить слушатель на кнопку удаления карточки и реализовать ее удаление
   newCard.querySelector('.element__delete-button').addEventListener('click', function(evt) {
    newCard.remove();
  });
  //Добавить слушатель на нажатие на карточку и открытие  popupImageOpen, а также присовить значение ссылки и названия атрибутам поп-апа
    newElementListItemImage.addEventListener('click', () => {
    popupImage.src = CARD.link;
    popupImageCaption.alt = CARD.name;
    popupImageCaption.textContent = CARD.name;
    openPopup(popupImageOpen);
    });
  // вернуть созданную карточку
  return newCard;
};

//Пройтись по всем переменным исходного массива и  создать карточки
initialCards.forEach(function(item) {
  const appearCard = createCard (item);
  elementsList.prepend(appearCard);// Добавить карточку в начало списка карточек
});

// Функция  отправки формы добавления карточки и присвоение значений атрибутам картинок из формы поп-ап
function addCardSubmitHandler (evt) {
    evt.preventDefault();
     const addedCards = {
    link :editFormPlaceLink.value,
    name : editFormPlaceTitle.value
    };
    const addedCard = createCard(addedCards);
    elementsList.prepend(addedCard);
    evt.target.reset(); //Сбросить значения последней отправленной формы через поп-ап
    closePopup(popupElementAdd);
  };

//Добавить слушатели н нажатие кнопок открытия, закрытия и сохранения изменений
editButton.addEventListener('click', openEditProfile);
editFormProfile.addEventListener('submit', editProfileSubmitHandler);
addButton.addEventListener("click", () => openPopup(popupElementAdd));
editFormPlace.addEventListener('submit', addCardSubmitHandler );
closeButtonProfile.addEventListener("click", () => closePopup(popupEditProfile));
closeButtonElement.addEventListener("click", () => closePopup(popupElementAdd));
closeButtonImage.addEventListener("click", () => closePopup(popupImageOpen));


