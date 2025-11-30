import {
  getMessageManagerInstance,
  MessageManager,
} from "./message/MessageManager";
import { OverlayManager } from "./overlay/OverlayManager";
import { SessionStorageManager } from "./storage/SessionStorageManager";
import { uuidv4 } from "./utils/uuid";

// src/index.ts

const HAS_OPENED = "HAS_OPENED";

export class CozyHome {
  private initialized: boolean = false;
  private clientToken: string | null = null;
  private sessionId: string = uuidv4();
  private readonly overlayManager: OverlayManager;
  private readonly storageManager: SessionStorageManager;
  private readonly messageManager: MessageManager;

  constructor() {
    this.overlayManager = new OverlayManager();
    this.storageManager = new SessionStorageManager();
    this.messageManager = getMessageManagerInstance();
  }

  public init = (options: { clientToken: string }): void => {
    this.clientToken = options.clientToken;
    this.messageManager.setSessionId(this.sessionId);
    this.initialized = true;
  };

  public open = (): void => {
    if (this.initialized) {
      const hasOpened = this.storageManager.retrieve(HAS_OPENED) ?? false;
      this.overlayManager.openPopup({
        shouldAnimate: !hasOpened,
      });
      this.storageManager.save(HAS_OPENED, true);
    } else {
      console.error("init must be called before open");
    }
  };

  public close = (): void => {
    if (this.initialized) {
      this.overlayManager.closePopup();
    } else {
      console.error("init must be called before close");
    }
  };
}

(window as any).CozyHome = new CozyHome();
