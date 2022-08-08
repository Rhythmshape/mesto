export default class UserInfo {
  constructor({ profileNameSelector, profileDescriptionSelector }) {
    this._profileNameSelector = profileNameSelector;
    this._profileDescriptionSelector = profileDescriptionSelector;
  }

  getUserInfo() {
    const profileInfo = {
      name: this._profileNameSelector.textContent,
      description: this._profileDescriptionSelector.textContent
    };
    return profileInfo;
  }

  setUserInfo(data) {
    this._profileNameSelector.textContent = data.name;
    this._profileDescriptionSelector.textContent = data.description;
  }

}
