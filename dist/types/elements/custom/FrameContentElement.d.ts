import { Mountable } from "../Mountable";
export declare class FrameContentElement extends Mountable<HTMLIFrameElement> {
    private readonly handleMessage;
    private readonly handleExpandPopup;
    private readonly handleClosePopup;
    private readonly handleContractPopup;
    constructor({ element, methods, }: {
        element: HTMLIFrameElement;
        methods: {
            onClose: VoidFunction;
            expandPopup: VoidFunction;
            contractPopup: VoidFunction;
        };
    });
    private onMessage;
    private handleFramePageStyled;
    private onLoaded;
    protected onAttached(): void;
    detach(): void;
    destroy(): void;
}
