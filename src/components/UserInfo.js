export default class UserInfo {
  constructor({ profileNameSelector, profileDescriptionSelector }) {
    this._profileNameSelector = profileNameSelector;
    this._profileDescriptionSelector = profileDescriptionSelector;
  }

  getUserInfo() {
    return {
      name: this._profileNameSelector.textContent,
      description: this._profileDescriptionSelector.textContent
    };
  }

  setUserInfo(data) {
    this._profileNameSelector.textContent = data.name;
    this._profileDescriptionSelector.textContent = data.description;
  }

}
