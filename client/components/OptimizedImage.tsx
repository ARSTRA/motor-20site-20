import { useState, useEffect, useRef } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  quality?: number;
  loading?: "lazy" | "eager";
  priority?: boolean;
  fallback?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export default function OptimizedImage({
  src,
  alt,
  className = "",
  width,
  height,
  quality = 95,
  loading = "lazy",
  priority = false,
  fallback = "https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg",
  onLoad,
  onError,
}: OptimizedImageProps) {
  const [imageSrc, setImageSrc] = useState<string>("");
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Generate optimized Pexels URL
  const generateOptimizedUrl = (originalSrc: string) => {
    if (!originalSrc.includes("pexels.com")) {
      return originalSrc;
    }

    try {
      const url = new URL(originalSrc);
      const photoId = url.pathname.split('/').find(segment => 
        segment.includes('pexels-photo-') && segment.includes('.jpeg')
      )?.replace('pexels-photo-', '').replace('.jpeg', '');

      if (photoId) {
        // Use Pexels API format for better quality
        const params = new URLSearchParams();
        if (width) params.append('w', width.toString());
        if (height) params.append('h', height.toString());
        params.append('auto', 'compress');
        params.append('cs', 'tinysrgb');
        params.append('dpr', '2'); // Retina display support
        params.append('fit', 'crop');
        
        return `https://images.pexels.com/photos/${photoId}/pexels-photo-${photoId}.jpeg?${params.toString()}`;
      }
    } catch (error) {
      console.warn("Failed to optimize Pexels URL:", error);
    }

    return originalSrc;
  };

  useEffect(() => {
    const optimizedSrc = generateOptimizedUrl(src);
    setImageSrc(optimizedSrc);
  }, [src, width, height, quality]);

  const handleLoad = () => {
    setImageLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setImageError(true);
    setImageSrc(fallback);
    onError?.();
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Loading placeholder */}
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse flex items-center justify-center">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-r from-ocean-400 to-forest-400 rounded-full animate-spin opacity-30"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-4xl opacity-40">📸</div>
            </div>
          </div>
        </div>
      )}

      {/* Optimized image */}
      <img
        ref={imgRef}
        src={imageSrc}
        alt={alt}
        className={`w-full h-full object-cover transition-all duration-500 ${
          imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
        }`}
        loading={priority ? "eager" : loading}
        width={width}
        height={height}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          imageRendering: 'high-quality',
          WebkitBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden',
          transform: 'translate3d(0, 0, 0)', // Force hardware acceleration
        }}
      />

      {/* Image overlay for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
    </div>
  );
}

// High-quality image URLs for automotive content
export const HIGH_QUALITY_AUTOMOTIVE_IMAGES = {
  // Luxury showroom images
  showroom: {
    main: "https://images.pexels.com/photos/11054324/pexels-photo-11054324.jpeg",
    consultation: "https://images.pexels.com/photos/7144185/pexels-photo-7144185.jpeg",
    teamConsult: "https://images.pexels.com/photos/7144177/pexels-photo-7144177.jpeg",
  },
  
  // Luxury vehicles
  vehicles: {
    bmwX5: "https://images.pexels.com/photos/2127039/pexels-photo-2127039.jpeg",
    mercedesS: "https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg",
    porsche911: "https://images.pexels.com/photos/29831802/pexels-photo-29831802.jpeg",
    tesla: "https://images.pexels.com/photos/258083/pexels-photo-258083.jpeg",
    rangeRover: "https://images.pexels.com/photos/1005617/pexels-photo-1005617.jpeg",
  },
  
  // Professional services
  services: {
    mechanics: "https://images.pexels.com/photos/8985613/pexels-photo-8985613.jpeg",
    carInspection: "https://images.pexels.com/photos/6169027/pexels-photo-6169027.jpeg",
    customerService: "https://images.pexels.com/photos/4173201/pexels-photo-4173201.jpeg",
    expertTeam: "https://images.pexels.com/photos/6817005/pexels-photo-6817005.jpeg",
  },
  
  // Backgrounds
  backgrounds: {
    heroLuxury: "https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg",
    inventoryHero: "https://images.pexels.com/photos/2127039/pexels-photo-2127039.jpeg",
    fallback: "https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg",
  }
};
