import { AnimationDefintion } from "./AnimationDefinition";
import { Mountable } from "./Mountable";
export declare class DelayableAnimatableElement extends Mountable {
    private animation;
    constructor({ animationDefinition, element, }: {
        animationDefinition: AnimationDefintion;
        element: HTMLElement;
    });
    private static createAnimation;
    updateAnimation(animationDefinition: AnimationDefintion): void;
    protected onAttached(): void;
    animate(): void;
    finish(): void;
}
