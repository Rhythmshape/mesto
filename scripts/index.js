// Получить доступ к DOM-элементам profile, popup, edit-form
const popupEditProfile = document.querySelector('.popup_type_profile-editing');
const popupElementAdd = document.querySelector('.popup_type_element-add');
const popupImageOpen = document.querySelector('.popup_type_image-opening');
const profile = document.querySelector('.profile');
const editForm = document.querySelector('.edit-form');
const element = document.querySelector('.element');
// Доступ к оверлею
const overlays = document.querySelectorAll('.popup');
// Доступ к кнопкам закрытия
const closeButtons = document.querySelectorAll('.popup__close-button');
// Получить доступ к кнопкe edit
const editButton = profile.querySelector('.profile__edit-button');
// Получить доступ к кнопкe add
const addButton = profile.querySelector('.profile__add-button');

// Получить доступ к элементам profile для заполнения формы popupEditProfil
const profileName = profile.querySelector('.profile__name');
const profileDescription = profile.querySelector('.profile__description');
const profileSubmitButton = document.querySelector('#profile-submit');

// Получить доступ к элементам profile-edit-form для заполнения формы popupEditProfile
const editFormProfile = document.querySelector('#profile-edit-form');
const editFormItemName = editForm.querySelector('.edit-form__item_type_name');
const editFormItemDescription = editForm.querySelector('.edit-form__item_type_description');

// Получить доступ к элементам place-form для popupElementAdd
const editFormPlace = document.querySelector('#place-form');
const editFormPlaceTitle = document.querySelector('#place-title');
const editFormPlaceLink = document.querySelector('#place-link');
const placeSubmitButton = document.querySelector('#place-submit');

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
  evt.target.reset(); //Сбросить значения последней отправленной формы через поп-ап
  disableButton(profileSubmitButton, validationAttributes);
  closePopup(popupEditProfile) ;
};

//Функция создания карточки
function createCard (card) {
  const newCard = newElementListItem.cloneNode(true); //скопировать элемент списка со всем содержимым  в newCard
  //Получить доступ к элементам названия и ссылки на картинку для карточки
  const newElementListItemImage = newCard.querySelector('.element__image');
  const newElementListItemTitle = newCard.querySelector('.element__title');
  const likeButton = newCard.querySelector('.element__like-button');
  const deleteButton = newCard.querySelector('.element__delete-button');
  //Присвоить значения атрибутам карточки
  newElementListItemTitle.textContent = card.name;
  newElementListItemImage.src = card.link;
  newElementListItemImage.alt = card.name;
  //Добавить слушатель на кнопку лайк и реализовать toggle при нажатии
    likeButton.addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__like-button_active');
  });
  //Добавить слушатель на кнопку удаления карточки и реализовать ее удаление
    deleteButton.addEventListener('click', function(evt) {
    newCard.remove();
  });
  //Добавить слушатель на нажатие на карточку и открытие  popupImageOpen, а также присовить значение ссылки и названия атрибутам поп-апа
    newElementListItemImage.addEventListener('click', () => {
    popupImage.src = card.link;
    popupImageCaption.alt = card.name;
    popupImageCaption.textContent = card.name;
    openPopup(popupImageOpen);
    });
  // вернуть созданную карточку
  return newCard;
};

//Пройтись по всем переменным исходного массива и создать карточки
initialCards.forEach(function(item) {
  const appearCard = createCard (item);
  elementsList.append(appearCard);// Добавить карточку в конец списка карточек
});

// Функция  отправки формы добавления карточки и присвоение значений атрибутам картинок из формы поп-ап
function addCardSubmitHandler (evt) {
    evt.preventDefault();
     const addedCards = {
    link :editFormPlaceLink.value,
    name : editFormPlaceTitle.value
    };
    const addedCard = createCard(addedCards);
    elementsList.prepend(addedCard);// Добавить карточку в начало списка карточек
    evt.target.reset(); //Сбросить значения последней отправленной формы через поп-ап
    disableButton(placeSubmitButton, validationAttributes);
    closePopup(popupElementAdd);
  };

// Функция  закрытия всех поп-апов при клике на крестик
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

// Функция  закрытия всех поп-апов при клике на оверлей
overlays.forEach((overlay) => {
  overlay.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(overlay);
    }
  });
});

//Добавить слушатели на нажатие кнопок открытия и сабмита
editButton.addEventListener('click', openEditProfile);
editFormProfile.addEventListener('submit', editProfileSubmitHandler);
addButton.addEventListener("click", () => openPopup(popupElementAdd));
editFormPlace.addEventListener('submit', addCardSubmitHandler );




