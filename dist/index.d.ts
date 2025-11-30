export declare class CozyHome {
    private clientToken;
    private readonly overlayManager;
    private readonly storageManager;
    constructor();
    init: (options: {
        clientToken: string;
    }) => void;
    open: () => void;
    close: () => void;
}
