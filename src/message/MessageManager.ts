const EXTERNAL_URL = "http://localhost:3000";

export type MessageType = "SETUP" | "CLOSE" | "EXPAND" | "CONTRACT" | "STYLED";

export type Message = {
  type: MessageType;
  status?: "SUCCESS" | "ERROR";
  data?: Record<string, any>;
};

type ListenersMap = Record<
  MessageType,
  Array<(m: MessageEvent<Message>) => void>
>;

export class MessageManager {
  private static _instance: MessageManager | undefined;
  private readonly handleMessage: (event: MessageEvent<Message>) => void;
  private listeners: ListenersMap;
  private outboundWindow: Promise<Window>;
  private resolveOutboundWindow: ((w: Window) => void) | null = null;

  private sessionId: Promise<string>;
  private resolveSessionId: ((s: string) => void) | null = null;

  constructor() {
    this.listeners = MessageManager.buildListeners();
    this.outboundWindow = new Promise((resolve) => {
      this.resolveOutboundWindow = resolve;
    });
    this.sessionId = new Promise((resolve) => {
      this.resolveSessionId = resolve;
    });
    this.handleMessage = this.onMessage.bind(this);
    window.addEventListener("message", this.handleMessage);
  }

  public close(): void {
    this.outboundWindow = new Promise((resolve) => {
      this.resolveOutboundWindow = resolve;
    });
  }

  public destroy(): void {
    window.removeEventListener("message", this.handleMessage);
  }

  public static getInstance(): MessageManager {
    if (!this._instance) {
      this._instance = new MessageManager();
    }
    return this._instance;
  }

  public setSessionId(sessionId: string) {
    this.resolveSessionId?.(sessionId);
  }

  public resolveWindow(window: Window): void {
    this.resolveOutboundWindow?.(window);
    this.sendSetupMessage();
  }

  public sendMessage(message: Message): void {
    Promise.all([this.outboundWindow, this.sessionId]).then(([window]) => {
      window.postMessage(message, EXTERNAL_URL);
    });
  }

  public addListener(
    type: MessageType,
    callback: (msg: MessageEvent<Message>) => void
  ): void {
    this.listeners[type].push(callback);
  }

  private sendSetupMessage(): void {
    this.sessionId.then((sessionId) => {
      this.sendMessage({
        type: "SETUP",
        data: {
          sessionId,
        },
      });
    });
  }

  private onMessage(event: MessageEvent<Message>): void {
    if (event.origin !== EXTERNAL_URL) return;

    switch (event.data.type) {
      case "CLOSE":
        this.listeners.CLOSE.forEach((listener) => {
          listener(event);
        });
        break;
      case "EXPAND":
        this.listeners.EXPAND.forEach((listener) => {
          listener(event);
        });
        break;
      case "CONTRACT":
        this.listeners.CONTRACT.forEach((listener) => {
          listener(event);
        });
        break;
      case "SETUP":
        this.listeners.SETUP.forEach((listener) => {
          listener(event);
        });
        break;
      case "STYLED":
        this.listeners.STYLED.forEach((listener) => {
          listener(event);
        });
        break;
      default:
        // Exhaustiveness check
        const _exhaustive: never = event.data.type;
        console.warn("Unexpected message type:", _exhaustive);
    }
  }

  private static buildListeners(): ListenersMap {
    return {
      CLOSE: [],
      CONTRACT: [],
      EXPAND: [],
      SETUP: [],
      STYLED: [],
    };
  }
}

export const getMessageManagerInstance: () => MessageManager =
  MessageManager.getInstance.bind(MessageManager);
