export default class Card {
  constructor({ data, template, handleCardClick, handleAddLike, handleRemoveLike, handleDeleteButtonClick }, userId) {
    this._template = template;
    this._card = this._getTemplate();
    this._handleCardClick = handleCardClick;
    this._handleAddLike = handleAddLike;
    this._handleRemoveLike = handleRemoveLike;
    this._handleDeleteButtonClick = handleDeleteButtonClick;
    this._userId = userId;
    this._newCardImage = this._card.querySelector('.element__image');
    this._cardLikeButton = this._card.querySelector('.element__like-button');
    this._cardDeleteButton = this._card.querySelector('.element__delete-button');
    this._likeCounter = this._card.querySelector('.element__like-label');

    this.loadCard(data);
  }
  //набор условно приватных методов класса Card

  //метод получения шаблона карточки путем клонирования
  _getTemplate() {
    return document
      .querySelector(this._template)
      .content
      .querySelector('.elements__list-item')
      .cloneNode(true);
  }

  //Настройка отображения элементов корзины и лайка на карточке пользователя и сторонних пользователей
  _setButtonsState() {
    this._setDeleteButtonState();
    this._setLikeButtonState();
  }

  //Настройка отображения лайка (активный/неактивное состояние, счетчик лайков)
  _setLikeButtonState() {
    if (this._isLikedByUser) {
      this._cardLikeButton.classList.add('element__like-button_active');
    } else {
      this._cardLikeButton.classList.remove('element__like-button_active');
    }
    this._likeCounter.textContent = this._likes.length;
  }
 //Настройка отображения корзины удаления карточки (для других пользователей)
  _setDeleteButtonState() {
    if (this._userId !== this._ownerId) {
      this._cardDeleteButton.remove();

    }
  }

  //загрузка данных карточки (свойств)
  loadCard(data) {
    this._title = data.name;
    this._image = data.link;
    this.cardId = data._id;
    this._ownerId = data.owner._id;
    this._likes = data.likes;

    //Условие при котором устанавливается активный значок лайка
    //(при наличии текущего пользователя в массиве пользователей лайкнувших карточку в свойстве карточки _likes)
    this._isLikedByUser = this._likes.some(anyUser => {
      return anyUser._id === this._userId;
    })
    this._setButtonsState();
  }

// метод удаления карточки
  deleteCard() {
    this._card.remove();
    this._card = null;
  }

  //метод установки слушателей (клик по картинке, лайку, кнопке удаления)
  _setEventListeners() {
    this._newCardImage.addEventListener('click', () => {
      this._handleCardClick(this._title, this._image);
    });
    this._cardLikeButton.addEventListener('click', () => {
      if (this._isLikedByUser) {
        this._handleRemoveLike(this)
      } else {
        this._handleAddLike(this)
      }
    });
    this._cardDeleteButton.addEventListener('click', () => {
      this._handleDeleteButtonClick(this);
    });
  }

  //публичный метод создания карточки
  generateCard() {
    this._setEventListeners();
    this._newCardImage.src = this._image;
    this._card.querySelector('.element__title').textContent = this._title;
    this._newCardImage.alt = this._title;
    // Вернём элемент наружу
    return this._card;
  }
}

