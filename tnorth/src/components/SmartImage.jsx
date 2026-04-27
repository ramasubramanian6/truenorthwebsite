import React, { useState } from 'react';

/**
 * SmartImage — Resilient image component.
 *
 * Load priority:
 *  1. `src`          — CDN URL (Cloudinary) or primary source
 *  2. `fallbackSrc`  — Local asset bundled with the site
 *  3. Placeholder    — Shown if both fail
 *
 * The site continues to look correct even when the CDN is offline.
 */
const SmartImage = ({
  src,
  fallbackSrc,
  alt = '',
  className = '',
  placeholderClassName = '',
  showSkeleton = true,
  ...props
}) => {
  const [currentSrc, setCurrentSrc] = useState(src || fallbackSrc);
  const [triedFallback, setTriedFallback] = useState(!src); // if no src, already on fallback
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  const handleError = () => {
    if (!triedFallback && fallbackSrc && currentSrc !== fallbackSrc) {
      // Step 1: CDN failed → swap to local asset
      setTriedFallback(true);
      setCurrentSrc(fallbackSrc);
    } else {
      // Step 2: both failed → show placeholder
      setFailed(true);
    }
  };

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex items-center justify-center bg-bg-secondary text-text-secondary ${placeholderClassName || className}`}
      >
        <span className="text-xs opacity-40 select-none">Image unavailable</span>
      </div>
    );
  }

  return (
    <div className={`relative ${showSkeleton ? 'overflow-hidden' : ''} ${className}`}
      style={{ display: 'contents' }}>
      {showSkeleton && !loaded && (
        <div className={`absolute inset-0 bg-bg-secondary animate-pulse ${className}`} />
      )}
      <img
        src={currentSrc}
        alt={alt}
        className={`${className} transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setLoaded(true)}
        onError={handleError}
        {...props}
      />
    </div>
  );
};

export default SmartImage;
