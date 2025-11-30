export declare class OverlayManager {
    private readonly containerElement;
    private readonly backdropElement;
    private readonly frameContainerElement;
    private previousBodyOverflow?;
    constructor();
    openPopup(options: {
        shouldAnimate: boolean;
    }): void;
    closePopup(): void;
    destroy(): void;
}
