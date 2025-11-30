import { DelayableAnimatableElement } from "../DelayableAnimatableElement";
import { AnimationDefintion } from "../AnimationDefinition";
export declare class FrameContainerElement extends DelayableAnimatableElement {
    static width: number;
    static height: number;
    private isOpened;
    private readonly frameContent;
    constructor({ element, animationDefinition, onClose, }: {
        element: HTMLDivElement;
        animationDefinition: AnimationDefintion;
        onClose: VoidFunction;
    });
    setIsOpened(isOpened: boolean): void;
    setShouldAnimate(shouldAnimate: boolean): void;
    expand(): void;
    contract(): void;
    detach(): void;
    protected onAttached(): void;
}
