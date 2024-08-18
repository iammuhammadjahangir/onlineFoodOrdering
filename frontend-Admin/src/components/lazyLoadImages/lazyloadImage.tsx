import { useState } from "react";
import { Blurhash } from "react-blurhash";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface LazyLoadImageProps {
  blurhash: string;
  url: string;
  alt?: string;
  className?: string;
}

const LazyloadImage = ({ blurhash, alt, url }: LazyLoadImageProps) => {
  const [isLoaded, setLoaded] = useState(false);
  const [isLoadStarted, setLoadStarted] = useState(false);

  const handleLoad = () => {
    setLoaded(true);
  };

  const handleLoadStarted = () => {
    console.log("Started: ");
    setLoadStarted(true);
  };
  // const [imageDataUrl, setImageDataUrl] = useState<string>("");

  // useEffect(() => {
  //   // Decode the blurhash
  //   const pixelsArray = decode(blurhash, width, height);

  //   // Create a canvas element to draw the image
  //   const canvas = document.createElement("canvas");
  //   canvas.width = width;
  //   canvas.height = height;
  //   const ctx = canvas.getContext("2d");
  //   if (ctx && pixelsArray) {
  //     const imageData = ctx.createImageData(width, height);
  //     imageData.data.set(pixelsArray);
  //     ctx.putImageData(imageData, 0, 0);

  //     // Convert canvas to data URL
  //     const dataUrl = canvas.toDataURL("image/jpeg");
  //     setImageDataUrl(dataUrl);
  //   }
  // }, [blurhash, width, height]);

  // console.log(url);

  // return (
  //   <div
  //     className="blurLoad"
  //     style={{ backgroundImage: `url(${imageDataUrl})` }}
  //   >
  //     <img src={`${server}/${url}34`} loading="lazy" />
  //   </div>
  //   // <img
  //   //   src={imageDataUrl}
  //   //   alt={alt}
  //   //   className={className}
  //   //   loading="lazy"
  //   //   width={width}
  //   //   height={height}
  //   // />
  // );
  console.log(blurhash);
  return (
    <div className="imageWrapper">
      <LazyLoadImage
        key={url}
        // src={`${server}/${url}`}
        src={url}
        alt={alt}
        // className={className}
        loading="lazy"
        onLoad={handleLoad}
        beforeLoad={handleLoadStarted}
      />
      {isLoadStarted && !isLoaded && (
        <Blurhash className="blurLoad" hash={blurhash} punch={1} />
      )}
    </div>
  );
};

export default LazyloadImage;
