import { Mountable } from "../types/elements/Mountable";
import { BaseElement } from "../types/elements/BaseElement";
import { FrameContainerElement } from "../types/elements/custom/FrameContainerElement";
import { AnimateTvOpenIn } from "./animations";

export function createContainer(): Mountable {
  const container = document.createElement("div");
  container.id = "cozyhome-container";
  const containerEl = new BaseElement({ element: container });
  containerEl.style({
    position: "fixed",
    inset: "0",
    zIndex: "2147483647",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  });
  return containerEl;
}

export function createBackdrop(onClick: () => void): Mountable {
  const backdrop = document.createElement("div");
  backdrop.id = "cozyhome-backdrop";
  const element = new BaseElement({ element: backdrop });
  element.style({
    position: "absolute",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.5)",
    backdropFilter: "blur(2px)",
    zIndex: "0",
  });
  element.addEventListener("click", onClick);
  return element;
}

export function createFrame(onClose: VoidFunction): FrameContainerElement {
  const frame = document.createElement("div");
  frame.id = "cozyhome-frame";
  const frameEl = new FrameContainerElement({
    element: frame,
    onClose,
    animationDefinition: AnimateTvOpenIn(
      FrameContainerElement.width,
      FrameContainerElement.height
    ),
  });
  frameEl.style({
    width: `${FrameContainerElement.width}px`,
    height: `${FrameContainerElement.height}px`,
    background: "black",
    zIndex: "1",
    borderRadius: "12px",
    borderTop: "3px solid black",
    borderBottom: "3px solid black",
    overflow: "hidden",
    position: "relative",
    transition: "width 1s ease, height 1s ease, border-radius 0.5s ease",
  });
  return frameEl;
}
