import React from "react";

type ImageProps = {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  fill?: boolean; // NEW
  className?: string;
  style?: React.CSSProperties;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  loading?: "lazy" | "eager";
  placeholder?: boolean; // for blur effect
};

const Image: React.FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  fill = false,
  className,
  style = {},
  objectFit = "cover",
  loading = "lazy",
  placeholder = false,
}) => {
  const finalStyle: React.CSSProperties = {
    ...(fill
      ? {
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }
      : {
          width,
          height,
        }),
    objectFit,
    filter: placeholder ? "blur(8px)" : undefined,
    ...style, // allow custom overrides
  };

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      className={className}
      style={finalStyle}
    />
  );
};

export default Image;
