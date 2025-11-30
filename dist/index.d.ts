export declare class CozyHome {
    private initialized;
    private clientToken;
    private sessionId;
    private readonly overlayManager;
    private readonly storageManager;
    private readonly messageManager;
    constructor();
    init: (options: {
        clientToken: string;
    }) => void;
    open: () => void;
    close: () => void;
}
