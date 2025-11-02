import { Mountable } from "../types/Mountable";
import { DelayableAnimatableElement } from "../types/DelayableAnimatableElement";
import { BaseElement } from "../types/BaseElement";

export function styleElement(
  el: HTMLElement,
  style: Partial<CSSStyleDeclaration>
) {
  Object.assign(el.style, style);
}

export function createContainer(): Mountable {
  const container = document.createElement("div");
  container.id = "cozyhome-container";
  styleElement(container, {
    position: "fixed",
    inset: "0",
    zIndex: "2147483647",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  });
  return new BaseElement({ element: container });
}

export function createBackdrop(): Mountable {
  const backdrop = document.createElement("div");
  backdrop.id = "cozyhome-backdrop";
  styleElement(backdrop, {
    position: "absolute",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.5)",
    backdropFilter: "blur(3px)",
    zIndex: "0",
  });
  return new BaseElement({ element: backdrop });
}

export function createFrame(): Mountable {
  const mockIframe = document.createElement("div");
  mockIframe.id = "cozyhome-frame";
  styleElement(mockIframe, {
    width: "800px",
    height: "0px",
    background: "black",
    zIndex: "1",
    borderRadius: "12px",
    borderTop: "3px solid black",
    borderBottom: "3px solid black",
  });
  return new DelayableAnimatableElement({
    element: mockIframe,
    animationDefinition: {
      keyFrames: [
        { width: "0px", height: "0px" },
        { width: "800px", height: "0px", offset: 0.5 },
        {
          width: "800px",
          height: "600px",
          offset: 1,
          borderTop: "0px",
          borderBottom: "0px",
        },
      ],
      options: {
        fill: "forwards",
        easing: "ease-in-out",
      },
    },
  });
}
