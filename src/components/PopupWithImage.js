import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupImageCaption = this._popup.querySelector('.popup__image-caption');
  }

  open(title, image) {
    this._popupImage.src = image;
     this._popupImage.alt = title;
     this._popupImageCaption.textContent= title;
    super.open();
  }
}

