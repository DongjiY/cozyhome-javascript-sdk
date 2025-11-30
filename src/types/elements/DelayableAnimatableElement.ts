import { AnimationDefintion } from "./AnimationDefinition";
import { Mountable } from "./Mountable";

export class DelayableAnimatableElement extends Mountable {
  private animation: Animation;

  constructor({
    animationDefinition,
    element,
  }: {
    animationDefinition: AnimationDefintion;
    element: HTMLElement;
  }) {
    super(element);
    this.animation = DelayableAnimatableElement.createAnimation(
      this.element,
      animationDefinition
    );
  }

  private static createAnimation(
    element: HTMLElement,
    animationDefinition: AnimationDefintion
  ): Animation {
    const resolvedOptions: KeyframeEffectOptions = {
      ...animationDefinition.options,
      duration: animationDefinition.options?.duration ?? 1000,
    };
    const keyFrameEffect = new KeyframeEffect(
      element,
      animationDefinition.keyFrames,
      resolvedOptions
    );
    return new Animation(keyFrameEffect);
  }

  public updateAnimation(animationDefinition: AnimationDefintion): void {
    this.animation = DelayableAnimatableElement.createAnimation(
      this.element,
      animationDefinition
    );
  }

  protected onAttached(): void {
    this.animate();
  }

  public animate(): void {
    this.animation.play();
  }

  public finish(): void {
    this.animation.cancel();
  }
}
