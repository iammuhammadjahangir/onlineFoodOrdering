import React, { useRef, useState, useEffect } from "react";
import { server } from "../../redux/store";

export interface ImageType {
  name: string;
  url: string;
  type: string;
  file: File;
}

interface ImageComponentProps {
  name: string;
  maxHeight?: number;
  maxWidth?: number;
  maxSize?: number;
  initialImage?: ImageType;
  onImageChange?: (image: ImageType | null) => void;
  defaultImageUrl: string | null;
  touched: any;
  errors: any;
}

const ImageComponent: React.FC<ImageComponentProps> = ({
  name,
  maxHeight,
  maxWidth,
  maxSize,
  initialImage,
  onImageChange,
  defaultImageUrl = null,
  touched,
  errors,
}) => {
  const [isImageChanged, setIsImageChanged] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<ImageType | null>(initialImage || null);
  const [error, setError] = useState<string | null>(null);

  console.log(errors);
  useEffect(() => {
    if (initialImage) {
      setImages(initialImage);
    }
  }, [initialImage]);

  const validateImage = (file: File) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        console.log(img.height);
        console.log(maxHeight);
        console.log(img.width);
        console.log(maxWidth);
        console.log(file.size);
        console.log(maxSize);
        if (
          (maxHeight && img.height !== maxHeight) ||
          (maxWidth && img.width !== maxWidth)
        ) {
          onImageChange?.(null);
          setImages(null);
          reject("Image dimensions exceed the allowed limits.");
        } else if (maxSize && file.size > maxSize) {
          onImageChange?.(null);
          setImages(null);
          reject("File size exceeds the allowed limit.");
        } else {
          resolve(file);
        }
      };
      img.onerror = () => reject("Failed to load image.");
      img.src = URL.createObjectURL(file);
    });
  };

  const handleFileChange = async (file: File) => {
    try {
      await validateImage(file);
      setIsImageChanged(true);
      const newImage = {
        name: file.name,
        url: URL.createObjectURL(file),
        type: file.type,
        file: file,
      };
      setImages(newImage);
      onImageChange?.(newImage);
      setError(null);
    } catch (err) {
      setError(err as string);
    }
  };

  const handleSelectFile = () => {
    fileInputRef.current?.click();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileChange(files[0]);
    }
  };

  return (
    <section className="imageContainer">
      <p>{name}</p>
      <div className="imageContainer">
        {images && <img src={images.url} alt={images.name} />}
        {defaultImageUrl && !images && !isImageChanged && (
          <img src={`${server}/${defaultImageUrl}`} alt={""} />
        )}
        {error && <div className="error">{error}</div>}
      </div>
      <section className="imageSelectContainer">
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleInputChange}
          style={{ display: "none" }}
        />
        <div className="selction">
          <p>{images ? "Choose Other Image" : "Choose Image"}</p>
          <span
            className="select clickable"
            role="button"
            onClick={handleSelectFile}
          >
            Browse
          </span>
        </div>
      </section>
      <p className="error">{touched && errors ? errors : null}</p>
      <span className="errorImage">
        <b>Note:</b>Image Should be equal to {maxWidth}x{maxHeight} pixels and
        Size should be less then {Number(maxSize) / 1024} KB.
      </span>
    </section>
  );
};

export default ImageComponent;
