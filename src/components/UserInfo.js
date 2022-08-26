export default class UserInfo {
  constructor({ userProfileName, userProfileDescription, userProfileAvatar }) {
    this._profileName = userProfileName;
    this._profileDescription = userProfileDescription;
    this._profileAvatar = userProfileAvatar;
  }

// возврат данных пользователя в виде объекта
  getUserInfo() {
    return {
      name: this._profileName.textContent,
      about: this._profileDescription.textContent,
      avatar: this._profileAvatar.src,
    };
  }

  //добавление данных пользователя на страницу
  setUserInfo(data) {
    this._profileName.textContent = data.name;
    this._profileDescription.textContent = data.about;
  }
//добавление аватара на страницу
  setUserAvatar(data) {
    this._profileAvatar.src = data.avatar;
    this._profileAvatar.alt = data.name;
  }
}
