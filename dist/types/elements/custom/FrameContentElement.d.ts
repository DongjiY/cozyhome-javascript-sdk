import { Mountable } from "../Mountable";
export declare class FrameContentElement extends Mountable<HTMLIFrameElement> {
    private readonly messageManager;
    constructor({ element, methods, }: {
        element: HTMLIFrameElement;
        methods: {
            onClose: VoidFunction;
            expandPopup: VoidFunction;
            contractPopup: VoidFunction;
        };
    });
    private handleFramePageStyled;
    private onLoaded;
    protected onAttached(): void;
    detach(): void;
}
