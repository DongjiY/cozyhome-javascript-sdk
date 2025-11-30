import {
  getMessageManagerInstance,
  MessageManager,
} from "../../../message/MessageManager";
import { Mountable } from "../Mountable";

export class FrameContentElement extends Mountable<HTMLIFrameElement> {
  private readonly messageManager: MessageManager;

  constructor({
    element,
    methods,
  }: {
    element: HTMLIFrameElement;
    methods: {
      onClose: VoidFunction;
      expandPopup: VoidFunction;
      contractPopup: VoidFunction;
    };
  }) {
    super(element);
    this.messageManager = getMessageManagerInstance();
    this.messageManager.addListener("CLOSE", methods.onClose);
    this.messageManager.addListener("CONTRACT", methods.contractPopup);
    this.messageManager.addListener("EXPAND", methods.expandPopup);
    this.messageManager.addListener(
      "SETUP",
      this.handleFramePageStyled.bind(this)
    );
  }

  private handleFramePageStyled(): void {
    this.element.style.opacity = "1";
    this.element.style.visibility = "visible";
  }

  private onLoaded(): void {
    if (this.element.contentWindow)
      this.messageManager.resolveWindow(this.element.contentWindow);
  }

  protected onAttached(): void {
    this.element.onload = this.onLoaded.bind(this);
  }

  public detach(): void {
    this.messageManager.close();

    this.element.style.opacity = "0";
    this.element.style.visibility = "hidden";
  }
}
