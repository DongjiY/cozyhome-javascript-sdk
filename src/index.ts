import { OverlayManager } from "./overlay/OverlayManager";
import { SessionStorageManager } from "./storage/SessionStorageManager";

// src/index.ts

const HAS_OPENED = "HAS_OPENED";

export class CozyHome {
  private clientToken: string | null = null;
  private readonly overlayManager: OverlayManager;
  private readonly storageManager: SessionStorageManager;

  constructor() {
    this.overlayManager = new OverlayManager();
    this.storageManager = new SessionStorageManager();
  }

  public init = (options: { clientToken: string }): void => {
    this.clientToken = options.clientToken;
  };

  public open = (): void => {
    const hasOpened = this.storageManager.retrieve(HAS_OPENED) ?? false;
    this.overlayManager.openPopup({
      shouldAnimate: !hasOpened,
    });
    this.storageManager.save(HAS_OPENED, true);
  };

  public close = (): void => {
    this.overlayManager.closePopup();
  };
}

(window as any).CozyHome = new CozyHome();
