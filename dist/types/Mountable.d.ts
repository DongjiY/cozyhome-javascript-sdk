export declare abstract class Mountable {
    protected readonly element: HTMLElement;
    private readonly listeners;
    constructor(element: HTMLElement);
    protected abstract onAttached(): void;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    /**
     * Attaches the element to a parent element
     * @param parent The parent element
     */
    attachTo(parent: Mountable | HTMLElement): void;
    /**
     * Detaches the current element from the tree
     */
    detach(): void;
}
