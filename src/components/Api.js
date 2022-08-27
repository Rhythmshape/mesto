export default class Api {
  constructor(options) {
    this._serverUrl = options.serverUrl;
    this._headers = options.headers;
  }
  //получить ответ с сервера
  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  //Загрузить информацию о пользователе с нужного сервера
  getUserInfoApi() {
    return fetch(`${this._serverUrl}/users/me`, {
      headers: this._headers
    })
      .then(this._getResponseData);
  }

  //Отредактировать профиль пользователя (имя/описание)
  editPageUserInfo(data) {
    return fetch(`${this._serverUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ ...data })
    })
      .then(this._getResponseData);
  }
  //Обновить аватар пользователя на странице
  editUserAvatar(data) {
    return fetch(`${this._serverUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ ...data })
    })
      .then(this._getResponseData);
  }

  //Загрузить исходные карточки с сервера
  getInitialCards() {
    return fetch(`${this._serverUrl}/cards`, {
      headers: this._headers,
    })
      .then(this._getResponseData);
  }

  //Добавить новую карточку
  addCard(data) {
    return fetch(`${this._serverUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ ...data })
    })
      .then(this._getResponseData);
  }

  //Удалить карточку
  deleteCard(cardId) {
    return fetch(`${this._serverUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this._getResponseData);
  }

  //Поставить лайк карточке
  addLike(cardId) {
    return fetch(`${this._serverUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
      .then(this._getResponseData);
  }

  //Убрать лайк
  removeLike(cardId) {
    return fetch(`${this._serverUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this._getResponseData);
  }
}


