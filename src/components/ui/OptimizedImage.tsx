'use client';

import Image from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  sizes?: string;
  quality?: number;
  unoptimized?: boolean;
  onError?: () => void;
  fallbackSrc?: string;
}

// プレースホルダー画像データURL（1x1透明PNG）
const PLACEHOLDER_DATA_URL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

// ブラー用プレースホルダー（グレーグラデーション）
const BLUR_DATA_URL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyatNavdRVPM8pD3nT;>';

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  className = '',
  priority = false,
  placeholder = 'blur',
  blurDataURL,
  sizes,
  quality = 85,
  unoptimized = false,
  onError,
  fallbackSrc = '/images/placeholder.png',
}: OptimizedImageProps) {
  const [imageSrc, setImageSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // エラーハンドリング
  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    if (imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
    }
    onError?.();
  };

  // ロード完了
  const handleLoad = () => {
    setIsLoading(false);
  };

  // レスポンシブサイズ設定（デフォルト）
  const defaultSizes = sizes || `
    (max-width: 768px) 100vw,
    (max-width: 1024px) 50vw,
    33vw
  `;

  // プレースホルダー設定
  const placeholderProps = placeholder === 'blur' ? {
    placeholder: 'blur' as const,
    blurDataURL: blurDataURL || BLUR_DATA_URL,
  } : {};

  return (
    <div className={`relative ${className}`}>
      <Image
        src={imageSrc}
        alt={alt}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        fill={fill}
        priority={priority}
        quality={quality}
        unoptimized={unoptimized}
        sizes={defaultSizes}
        className={`
          transition-opacity duration-300
          ${isLoading ? 'opacity-0' : 'opacity-100'}
          ${hasError ? 'opacity-50' : ''}
        `}
        onLoad={handleLoad}
        onError={handleError}
        {...placeholderProps}
      />
      
      {/* ローディングスケルトン */}
      {isLoading && (
        <div 
          className={`
            absolute inset-0 bg-dark animate-pulse
            ${!fill ? '' : 'w-full h-full'}
          `}
          style={!fill ? { width, height } : undefined}
        />
      )}
      
      {/* エラー表示 */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-dark/50 text-muted text-sm">
          画像読み込みエラー
        </div>
      )}
    </div>
  );
}

// プリセットコンポーネント
export function HeroImage({ src, alt, className = '' }: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      fill
      priority
      quality={90}
      sizes="100vw"
      className={className}
    />
  );
}

export function CardImage({ src, alt, className = '' }: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={320}
      height={180}
      quality={80}
      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 320px"
      className={className}
    />
  );
}

export function AvatarImage({ src, alt, size = 48, className = '' }: {
  src: string;
  alt: string;
  size?: number;
  className?: string;
}) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={size}
      height={size}
      quality={85}
      className={`rounded-full ${className}`}
    />
  );
} 