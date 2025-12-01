export type MessageType = "SETUP" | "CLOSE" | "EXPAND" | "CONTRACT" | "STYLED";
export type Message = {
    type: MessageType;
    status?: "SUCCESS" | "ERROR";
    data?: Record<string, any>;
};
export declare class MessageManager {
    private static _instance;
    private readonly handleMessage;
    private listeners;
    private outboundWindow;
    private resolveOutboundWindow;
    private sessionId;
    private resolveSessionId;
    private constructor();
    close(): void;
    destroy(): void;
    static getInstance(): MessageManager;
    setSessionId(sessionId: string): void;
    resolveWindow(window: Window): void;
    sendMessage(message: Message): void;
    addListener(type: MessageType, callback: (msg: MessageEvent<Message>) => void): void;
    private sendSetupMessage;
    private onMessage;
    private static buildListeners;
}
export declare const getMessageManagerInstance: () => MessageManager;
