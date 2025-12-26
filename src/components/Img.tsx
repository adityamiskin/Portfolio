import Image from "next/image";

interface ImgProps {
  src: string;
  width: number;
  height: number;
  alt: string;
  className?: string;
  caption?: string;
}

export default function Img({
  src,
  width,
  height,
  alt,
  className,
  caption,
}: ImgProps) {
  return (
    <figure className="my-6">
      <Image
        src={src}
        width={width}
        height={height}
        alt={alt}
        className={className}
      />
      {caption && (
        <figcaption className="text-sm text-muted-foreground mt-2 text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
