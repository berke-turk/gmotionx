import React from "react";

export interface MaskingTapeProps {
  width?: number | string;
  height?: number;
  rotate?: number;
  top?: number | string;
  left?: number | string;
  right?: number | string;
  bottom?: number | string;
  color?: string;
}

export const MaskingTape: React.FC<MaskingTapeProps> = ({
  width = 160,
  height = 36,
  rotate = -2,
  top = -18,
  left,
  right,
  bottom,
  color = "rgba(235, 222, 195, 0.88)",
}) => {
  return (
    <div
      style={{
        position: "absolute",
        top,
        left,
        right,
        bottom,
        width,
        height,
        transform: `rotate(${rotate}deg)`,
        backgroundColor: color,
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.12)",
        zIndex: 50,
        pointerEvents: "none",
        clipPath:
          "polygon(0% 10%, 3% 0%, 97% 0%, 100% 12%, 98% 88%, 95% 100%, 4% 100%, 0% 88%)",
        borderLeft: "1px dashed rgba(0, 0, 0, 0.15)",
        borderRight: "1px dashed rgba(0, 0, 0, 0.15)",
      }}
    />
  );
};
