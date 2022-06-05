const popup = document.querySelector('.popup');
const profile = document.querySelector('.profile');
const editForm = document.querySelector('.edit-form');

const editButton = profile.querySelector('.profile__edit-button');
const closeButton = popup.querySelector('.popup__close-button');

const profileName = profile.querySelector('.profile__name');
const profileDescription = profile.querySelector('.profile__description');

const editFormItemName = editForm.querySelector('.edit-form__item_type_name');
const editFormItemDescription = editForm.querySelector('.edit-form__item_type_description');

function openPopup() {
  popup.classList.add('popup_opened');
  editFormItemName.value = profileName.textContent;
  editFormItemDescription.value = profileDescription.textContent;
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = editFormItemName.value;
  profileDescription.textContent = editFormItemDescription.value;
  closePopup() ;
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
editForm.addEventListener('submit', formSubmitHandler);

