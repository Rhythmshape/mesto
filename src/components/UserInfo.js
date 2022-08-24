export default class UserInfo {
  constructor({ profileNameSelector, profileDescriptionSelector, avatarSelector }) {
    this._profileNameSelector = profileNameSelector;
    this._profileDescriptionSelector = profileDescriptionSelector;
    this._avatarSelector = avatarSelector;
  }

// возврат данных пользователя в виде объекта
  getUserInfo() {
    return {
      name: this._profileNameSelector.textContent,
      about: this._profileDescriptionSelector.textContent,
      avatar: this._avatarSelector.src,
    };
  }

  //добавление данных пользователя на страницу
  setUserInfo(data) {
    this._profileNameSelector.textContent = data.name;
    this._profileDescriptionSelector.textContent = data.about;
  }
//добавление аватара на страницу
  setUserAvatar(data) {
    this._avatarSelector.src = data.avatar;
    this._avatarSelector.alt = data.name;
  }
}
