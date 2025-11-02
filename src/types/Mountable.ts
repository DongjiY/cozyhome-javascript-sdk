type Listener = {
  type: string;
  listener: EventListenerOrEventListenerObject;
  options?: boolean | AddEventListenerOptions;
};

export abstract class Mountable {
  private readonly listeners: Array<Listener> = [];

  constructor(protected readonly element: HTMLElement) {}

  protected abstract onAttached(): void;

  public addEventListener<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ) {
    this.element.addEventListener(type, listener, options);
    this.listeners.push({
      type,
      listener,
      options,
    });
  }

  /**
   * Attaches the element to a parent element
   * @param parent The parent element
   */
  public attachTo(parent: Mountable | HTMLElement): void {
    if (parent instanceof Mountable) {
      parent.element.appendChild(this.element);
    } else {
      parent.appendChild(this.element);
    }
    this.onAttached();
  }

  /**
   * Detaches the current element from the tree
   */
  public detach(): void {
    this.element.remove();
    while (this.listeners.length > 0) {
      const { type, listener, options } = this.listeners.pop()!;
      this.element.removeEventListener(type, listener, options);
    }
  }
}
