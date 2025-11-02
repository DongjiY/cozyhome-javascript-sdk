import { Mountable } from "./types/Mountable";
import { createBackdrop, createContainer, createFrame } from "./utils/dom";

export class OverlayManager {
  private readonly containerElement: Mountable;
  private readonly backdropElement: Mountable;
  private readonly frameElement: Mountable;

  constructor() {
    this.containerElement = createContainer();
    this.backdropElement = createBackdrop();
    this.backdropElement.addEventListener("click", () => this.closePopup());
    this.frameElement = createFrame();
    this.containerElement.attachTo(document.body);
  }

  public destroy(): void {
    this.containerElement.detach();
  }

  public openPopup(): void {
    this.backdropElement.attachTo(this.containerElement);
    this.frameElement.attachTo(this.containerElement);
  }

  public closePopup(): void {
    this.backdropElement.detach();
    this.frameElement.detach();
  }
}
