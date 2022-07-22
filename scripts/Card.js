class Card {
  constructor(data, template, handleCardElementClick) {
    this._title = data.name;
    this._image = data.link;
    this._template = template;
    this._handleCardElementClick = handleCardElementClick;
  }
  //набор условно приватных методов класса Card

  //метод получения шаблона карточки путем клонирования
  _getTemplate() {
    const cardTemplate = document.querySelector(this._template);
    const cardElement = cardTemplate
      .content
      .querySelector('.elements__list-item')
      .cloneNode(true);
    return cardElement;
  }

//метод постановки лайка
  _handleLikeButton() {
    this._cardLikeButton.classList.toggle('element__like-button_active');
  }

//метод удаления карточки
  _handleDeleteButton() {
    this._element.remove();
  }

//метод установки слушателей
  _setEventListeners() {
    this._newElementListItemImage = this._element.querySelector('.element__image');
    this._cardLikeButton = this._element.querySelector('.element__like-button');
    this._cardDeleteButton = this._element.querySelector('.element__delete-button');


    this._newElementListItemImage.addEventListener('click', () => {
      this._handleCardElementClick(this._title, this._image);
    });

    this._cardLikeButton.addEventListener('click', () => {
      this._handleLikeButton();
    });

    this._cardDeleteButton.addEventListener('click', () => {
      this._handleDeleteButton();
    });
  }

  //публичный метод создания карточки
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.element__image').src = this._image;
    this._element.querySelector('.element__title').textContent = this._title;
    this._element.querySelector('.element__image').alt = this._title;
    // Вернём элемент наружу
    return this._element;
  }
}

//экспорт класса Card
export { Card }
