import * as React from "react";
import Svg, { Path } from "react-native-svg";

interface ArrowUpCircleProps {
  width?: number;
  height?: number;
  color?: string;
  opacity?: number;
}

export function ArrowUpCircle({ width = 160, height = 160, color = "#000", opacity = 0.12 }: ArrowUpCircleProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 160 160" fill="none">
      <Path
        d="M80.5 5.03125C38.8211 5.03125 5.03125 38.8211 5.03125 80.5C5.03125 122.179 38.8211 155.969 80.5 155.969C122.179 155.969 155.969 122.179 155.969 80.5C155.969 38.8211 122.179 5.03125 80.5 5.03125ZM93.4379 76.236V123.266H67.5621L67.5621 76.236L40.25 76.236L80.5 37.7344L120.75 76.236H93.4379Z"
        fill={color}
        fillOpacity={opacity}
      />
    </Svg>
  );
}
