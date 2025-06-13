'use client';

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad' | 'onError'> {
  fallbackSrc?: string;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'landscape';
  lazy?: boolean;
  showLoader?: boolean;
  className?: string;
}

/**
 * パフォーマンス最適化されたImageコンポーネント
 * - プログレッシブローディング
 * - フォールバック画像対応
 * - アスペクト比維持
 * - レスポンシブサイズ
 * - ローディングアニメーション
 */
export default function OptimizedImage({
  src,
  alt,
  fallbackSrc = '/images/placeholder.svg',
  aspectRatio = 'landscape',
  lazy = true,
  showLoader = true,
  className = '',
  priority = false,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  // アスペクト比のスタイル
  const aspectRatioClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[4/3]',
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    }
  };

  return (
    <div 
      className={`relative overflow-hidden ${aspectRatioClasses[aspectRatio]} ${className}`}
    >
      {/* ローディングプレースホルダー */}
      {isLoading && showLoader && (
        <motion.div
          className="absolute inset-0 bg-[#1A1A1A] flex items-center justify-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col items-center space-y-3">
            {/* ローディングスピナー */}
            <div className="w-8 h-8 border-2 border-[#2A2A2A] border-t-[#1479FF] rounded-full animate-spin" />
            <p className="text-[#7A7A7A] text-xs">Loading...</p>
          </div>
        </motion.div>
      )}

      {/* メイン画像 */}
      <Image
        src={currentSrc}
        alt={alt}
        fill
        className={`object-cover transition-opacity duration-500 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={handleLoad}
        onError={handleError}
        priority={priority}
        loading={lazy ? 'lazy' : 'eager'}
        sizes={generateSizes()}
        quality={85}
        {...props}
      />

      {/* エラー表示 */}
      {hasError && !isLoading && (
        <div className="absolute inset-0 bg-[#1A1A1A] flex items-center justify-center">
          <div className="text-center text-[#7A7A7A]">
            <svg className="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm">画像を読み込めませんでした</p>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * レスポンシブサイズ設定生成
 */
function generateSizes(): string {
  return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
}

/**
 * ギャラリー用最適化Imageコンポーネント
 */
interface GalleryImageProps extends OptimizedImageProps {
  onClick?: () => void;
  index?: number;
}

export function GalleryImage({ 
  onClick, 
  index = 0, 
  className = '',
  ...props 
}: GalleryImageProps) {
  return (
    <motion.div
      className={`cursor-pointer group ${className}`}
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94] 
      }}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative overflow-hidden rounded-lg">
        <OptimizedImage {...props} />
        
        {/* ホバーオーバーレイ */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
          <motion.div
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={false}
          >
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * アバター用最適化Imageコンポーネント
 */
interface AvatarImageProps extends OptimizedImageProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  rounded?: boolean;
}

export function AvatarImage({
  size = 'md',
  rounded = true,
  className = '',
  ...props
}: AvatarImageProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  return (
    <div 
      className={`
        ${sizeClasses[size]} 
        ${rounded ? 'rounded-full' : 'rounded-lg'} 
        overflow-hidden relative
        ${className}
      `}
    >
      <OptimizedImage
        {...props}
        aspectRatio="square"
        className="object-cover"
      />
    </div>
  );
}

/**
 * Hero背景用最適化Imageコンポーネント
 */
interface HeroImageProps extends OptimizedImageProps {
  overlay?: boolean;
  overlayOpacity?: number;
}

export function HeroImage({
  overlay = true,
  overlayOpacity = 0.6,
  className = '',
  ...props
}: HeroImageProps) {
  return (
    <div className={`relative w-full h-full ${className}`}>
      <OptimizedImage
        {...props}
        priority={true}
        className="object-cover"
      />
      
      {overlay && (
        <div 
          className="absolute inset-0 bg-[#0F0F0F]"
          style={{ opacity: overlayOpacity }}
        />
      )}
    </div>
  );
}

/**
 * 遅延読み込み用フック
 */
export function useLazyImage(src: string, threshold = 0.1) {
  const [isVisible, setIsVisible] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  // Intersection Observer でビューポート内判定
  const observerRef = (node: HTMLElement | null) => {
    if (node) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            setImageSrc(src);
            observer.disconnect();
          }
        },
        { threshold }
      );
      observer.observe(node);
    }
  };

  return { observerRef, imageSrc, isVisible };
} 