import * as React from "react";
import Svg, { Path } from "react-native-svg";

interface ArrowDownCircleProps {
  width?: number;
  height?: number;
  color?: string;
  opacity?: number;
}

export function ArrowDownCircle({ width = 160, height = 160, color = "#000", opacity = 0.12 }: ArrowDownCircleProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 161 161" fill="none">
      <Path
        d="M80.5 155.969C122.179 155.969 155.969 122.179 155.969 80.5C155.969 38.8211 122.179 5.03125 80.5 5.03125C38.8211 5.03125 5.03125 38.8211 5.03125 80.5C5.03125 122.179 38.8211 155.969 80.5 155.969ZM67.5621 84.764L67.5621 37.7344L93.4379 37.7344L93.4379 84.764L120.75 84.764L80.5 123.266L40.25 84.764L67.5621 84.764Z"
        fill={color}
        fillOpacity={opacity}
      />
    </Svg>
  );
}
