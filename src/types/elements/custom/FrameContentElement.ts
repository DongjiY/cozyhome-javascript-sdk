import { Mountable } from "../Mountable";

const EXTERNAL_URL = "http://localhost:3000";

export class FrameContentElement extends Mountable<HTMLIFrameElement> {
  private readonly handleMessage: (event: MessageEvent) => void;
  private readonly handleExpandPopup: VoidFunction;
  private readonly handleClosePopup: VoidFunction;
  private readonly handleContractPopup: VoidFunction;

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
    this.handleClosePopup = methods.onClose;
    this.handleContractPopup = methods.contractPopup;
    this.handleExpandPopup = methods.expandPopup;
    this.handleMessage = this.onMessage.bind(this);
    window.addEventListener("message", this.handleMessage);
  }

  private onMessage(event: MessageEvent): void {
    if (event.origin !== EXTERNAL_URL) return;

    if (event.data.type === "CLOSE") {
      this.handleClosePopup();
    } else if (event.data.type === "EXPAND") {
      this.handleExpandPopup();
    } else if (event.data.type === "CONTRACT") {
      this.handleContractPopup();
    } else if (event.data.type === "SETUP") {
      this.handleFramePageStyled();
    } else {
      console.warn("Recv an unexpected message type:", event.data.type);
    }
  }

  private handleFramePageStyled(): void {
    this.element.style.opacity = "1";
    this.element.style.visibility = "visible";
  }

  private onLoaded(): void {
    this.element.contentWindow?.postMessage(
      {
        type: "SETUP",
      },
      EXTERNAL_URL
    );
  }

  protected onAttached(): void {
    this.element.onload = this.onLoaded.bind(this);
  }

  public detach(): void {
    this.element.style.opacity = "0";
    this.element.style.visibility = "hidden";
  }

  public destroy(): void {
    window.removeEventListener("message", this.handleMessage);
  }
}
