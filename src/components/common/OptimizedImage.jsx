import { useState } from 'react';

/**
 * Imagen local con fallback JPG si el WebP no está disponible.
 */
function OptimizedImage({ imageKey, images, className, loading, ...rest }) {
  const item = images[imageKey];
  const [src, setSrc] = useState(item?.src ?? '');

  if (!item) return null;

  const handleError = () => {
    if (src !== item.fallback) setSrc(item.fallback);
  };

  return (
    <img
      src={src || item.fallback}
      alt={item.alt}
      className={className}
      loading={loading}
      onError={handleError}
      {...rest}
    />
  );
}

export default OptimizedImage;
