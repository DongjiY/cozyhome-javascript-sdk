import { AnimationDefintion } from "../types/elements/index";

export function AnimateTvOpenIn(w: number, h: number): AnimationDefintion {
  return {
    keyFrames: [
      {
        width: "0px",
        height: "0px",
        borderTop: "3px solid black",
        borderBottom: "3px solid black",
      },
      {
        width: `${w}px`,
        height: "0px",
        offset: 0.5,
        borderTop: "3px solid black",
        borderBottom: "3px solid black",
      },
      {
        width: `${w}px`,
        height: `${h}px`,
        offset: 1,
        borderTop: "0px",
        borderBottom: "0px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
      },
    ],
    options: {
      fill: "forwards",
      easing: "ease-in-out",
    },
  };
}

export function AnimateFadeIn(): AnimationDefintion {
  return {
    keyFrames: [
      {
        offset: 0,
        opacity: 0,
      },
      {
        offset: 0.5,
        opacity: 0.5,
      },
      {
        offset: 1,
        opacity: 1,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
      },
    ],
    options: {
      fill: "forwards",
      easing: "ease-in",
      duration: 300,
    },
  };
}
