const editform = document.querySelector('.edit-form');
const profile = document.querySelector('.profile');

const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.edit-form__close-button');
const submitButton = document.querySelector('.edit-form__submit-button');

const profileName = profile.querySelector('.profile__name');
const profileDescription = profile.querySelector('.profile__description');

const editformItemName = editform.querySelector('.edit-form__item_name');
const editformItemDescription = editform.querySelector('.edit-form__item_description');

function openEditform() {
  editform.classList.add('edit-form_opened');
  editformItemName.value = profileName.textContent;
  editformItemDescription.value = profileDescription.textContent;
}

function closeEditform() {
  editform.classList.remove('edit-form_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = editformItemName.value;
  profileDescription.textContent = editformItemDescription.value;
  closeEditform() ;
}

editButton.addEventListener('click', openEditform);
closeButton.addEventListener('click', closeEditform);
editform.addEventListener('submit', formSubmitHandler);

