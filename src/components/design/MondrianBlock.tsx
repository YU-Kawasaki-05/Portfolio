'use client';

import { useMemo, CSSProperties } from 'react';

interface MondrianBlockProps {
  width?: number | string;
  height?: number | string;
  color?: 'red' | 'blue' | 'yellow' | 'white' | 'black';
  borderWidth?: number;
  position?: 'absolute' | 'relative' | 'fixed';
  top?: number | string;
  left?: number | string;
  right?: number | string;
  bottom?: number | string;
  zIndex?: number;
  opacity?: number;
  className?: string;
  onClick?: () => void;
  'data-testid'?: string;
}

export default function MondrianBlock({
  width = 100,
  height = 100,
  color = 'white',
  borderWidth = 2,
  position = 'relative',
  top,
  left,
  right,
  bottom,
  zIndex = 1,
  opacity = 1,
  className = '',
  onClick,
  'data-testid': testId,
}: MondrianBlockProps) {
  // スタイル計算
  const blockStyle = useMemo((): CSSProperties => {
    // カラーマッピング（デザインシステム準拠）
    const colorMap = {
      red: '#FF2D55',
      blue: '#1479FF', 
      yellow: '#F5C400',
      white: '#F9F9F9',
      black: '#0F0F0F',
    };
    const baseStyle: CSSProperties = {
      width: typeof width === 'number' ? `${width}px` : width,
      height: typeof height === 'number' ? `${height}px` : height,
      backgroundColor: colorMap[color],
      border: `${borderWidth}px solid #0F0F0F`,
      position,
      zIndex,
      opacity,
      transition: 'all 0.3s ease-in-out',
    };

    // 位置指定がある場合は追加
    if (top !== undefined) baseStyle.top = typeof top === 'number' ? `${top}px` : top;
    if (left !== undefined) baseStyle.left = typeof left === 'number' ? `${left}px` : left;
    if (right !== undefined) baseStyle.right = typeof right === 'number' ? `${right}px` : right;
    if (bottom !== undefined) baseStyle.bottom = typeof bottom === 'number' ? `${bottom}px` : bottom;

    return baseStyle;
  }, [width, height, color, borderWidth, position, top, left, right, bottom, zIndex, opacity]);

  // インタラクティブスタイル
  const interactiveClass = onClick 
    ? 'cursor-pointer hover:scale-105 hover:shadow-lg transform' 
    : '';

  return (
    <div
      style={blockStyle}
      className={`${interactiveClass} ${className}`}
      onClick={onClick}
      data-testid={testId}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      } : undefined}
      aria-label={onClick ? `${color} Mondrian block` : undefined}
    />
  );
}

// プリセットパターン
export function MondrianComposition({ 
  className = '',
  containerWidth = 400,
  containerHeight = 300 
}: {
  className?: string;
  containerWidth?: number;
  containerHeight?: number;
}) {
  return (
    <div 
      className={`relative ${className}`}
      style={{ 
        width: `${containerWidth}px`, 
        height: `${containerHeight}px`,
        backgroundColor: '#F9F9F9' 
      }}
    >
      {/* 大きな赤ブロック */}
      <MondrianBlock
        width={containerWidth * 0.6}
        height={containerHeight * 0.4}
        color="red"
        position="absolute"
        top={0}
        left={0}
        zIndex={2}
      />
      
      {/* 青い矩形 */}
      <MondrianBlock
        width={containerWidth * 0.35}
        height={containerHeight * 0.25}
        color="blue"
        position="absolute"
        top={containerHeight * 0.45}
        right={0}
        zIndex={2}
      />
      
      {/* 黄色の小さなブロック */}
      <MondrianBlock
        width={containerWidth * 0.25}
        height={containerHeight * 0.3}
        color="yellow"
        position="absolute"
        bottom={0}
        left={containerWidth * 0.65}
        zIndex={2}
      />
      
      {/* 白い背景ブロック群 */}
      <MondrianBlock
        width={containerWidth * 0.35}
        height={containerHeight * 0.55}
        color="white"
        position="absolute"
        top={0}
        right={0}
        zIndex={1}
      />
      
      <MondrianBlock
        width={containerWidth * 0.35}
        height={containerHeight * 0.25}
        color="white"
        position="absolute"
        top={containerHeight * 0.7}
        right={containerWidth * 0.35}
        zIndex={1}
      />
    </div>
  );
} 