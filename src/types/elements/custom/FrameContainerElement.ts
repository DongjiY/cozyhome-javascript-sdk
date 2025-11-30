import { AnimateFadeIn } from "../../../utils/animations";
import { DelayableAnimatableElement } from "../DelayableAnimatableElement";
import { AnimationDefintion } from "../index";
import { FrameContentElement } from "./FrameContentElement";

export class FrameContainerElement extends DelayableAnimatableElement {
  public static width: number = 800;
  public static height: number = 600;
  private isOpened: boolean = false;
  private readonly frameContent: FrameContentElement;

  constructor({
    element,
    animationDefinition,
    onClose,
  }: {
    element: HTMLDivElement;
    animationDefinition: AnimationDefintion;
    onClose: VoidFunction;
  }) {
    super({
      element,
      animationDefinition,
    });
    this.frameContent = createFrameContent({
      onClose,
      expandPopup: this.expand.bind(this),
      contractPopup: this.contract.bind(this),
    });
  }

  public setIsOpened(isOpened: boolean): void {
    this.isOpened = isOpened;
  }

  public setShouldAnimate(shouldAnimate: boolean): void {
    if (!shouldAnimate) {
      super.updateAnimation(AnimateFadeIn());
    }
  }

  public expand(): void {
    if (this.isOpened) {
      this.finish();
      this.element.style.setProperty("width", "100%", "important");
      this.element.style.setProperty("height", "100%", "important");
      this.element.style.setProperty("border-radius", "0px", "important");
    }
  }

  public contract(): void {
    if (this.isOpened) {
      this.finish();
      this.element.style.setProperty(
        "width",
        `${FrameContainerElement.width}px`,
        "important"
      );
      this.element.style.setProperty(
        "height",
        `${FrameContainerElement.height}px`,
        "important"
      );
      this.element.style.setProperty("border-radius", "12px", "important");
    }
  }

  public detach(): void {
    this.element.style.setProperty("width", `${FrameContainerElement.width}px`);
    this.element.style.setProperty(
      "height",
      `${FrameContainerElement.height}px`
    );
    this.element.style.setProperty("border-radius", "12px", "important");

    this.frameContent.detach();
    super.detach();
  }

  protected onAttached(): void {
    this.frameContent.attachTo(this);
    super.onAttached();
  }
}

function createFrameContent(methods: {
  onClose: VoidFunction;
  expandPopup: VoidFunction;
  contractPopup: VoidFunction;
}): FrameContentElement {
  const content = document.createElement("iframe");
  content.id = "cozyhome-content";
  content.src = "http://localhost:3000/embed";
  const frameContentEl = new FrameContentElement({
    element: content,
    methods,
  });
  frameContentEl.style({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
    color: "white",
    border: "none",
    opacity: "0",
    visibility: "hidden",
    backgroundColor: "black",
  });
  return frameContentEl;
}
