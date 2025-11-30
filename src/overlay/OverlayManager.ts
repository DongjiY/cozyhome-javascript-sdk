import { Mountable } from "../types/elements/Mountable";
import { createBackdrop, createContainer, createFrame } from "../utils/dom";
import { FrameContainerElement } from "../types/elements/custom/FrameContainerElement";

export class OverlayManager {
  private readonly containerElement: Mountable;
  private readonly backdropElement: Mountable;
  private readonly frameContainerElement: FrameContainerElement;

  private previousBodyOverflow?: string;

  constructor() {
    this.containerElement = createContainer();
    this.backdropElement = createBackdrop(this.closePopup.bind(this));
    this.frameContainerElement = createFrame(this.closePopup.bind(this));
  }

  public openPopup(options: { shouldAnimate: boolean }): void {
    const { shouldAnimate } = options;

    this.containerElement.attachTo(document.body);
    this.backdropElement.attachTo(this.containerElement);

    this.frameContainerElement.setShouldAnimate(shouldAnimate);
    this.frameContainerElement.attachTo(this.containerElement);

    const body = document.body;
    this.previousBodyOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    this.frameContainerElement.setIsOpened(true);
  }

  public closePopup(): void {
    this.frameContainerElement.detach();
    this.backdropElement.detach();
    this.containerElement.detach();

    if (this.previousBodyOverflow !== undefined) {
      document.body.style.overflow = this.previousBodyOverflow;
      this.previousBodyOverflow = undefined;
    } else {
      document.body.style.overflow = "";
    }

    this.frameContainerElement.setIsOpened(false);
  }

  public destroy(): void {
    this.frameContainerElement.destroy();
    this.backdropElement.destroy();
    this.containerElement.destroy();
  }
}
