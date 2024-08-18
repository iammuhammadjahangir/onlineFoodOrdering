import React, { useRef, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { server } from "../../redux/store";

export interface ImageType {
  name: string;
  url: string;
  type: string;
  file: File;
}

interface MultiImageComponentProps {
  name: string;
  maxHeight?: number;
  maxWidth?: number;
  maxSize?: number;
  initialImages?: ImageType[];
  onImageChange?: (images: ImageType[]) => void;
  defaultImageUrl: string | null;
  touched: any;
  errors: any;
  maxImages: number;
  updateImagesFunctions?: (index: number) => void;
}

const MultiImageComponent: React.FC<MultiImageComponentProps> = ({
  name,
  maxHeight,
  maxWidth,
  maxSize,
  initialImages,
  onImageChange,
  defaultImageUrl = null,
  touched,
  errors,
  maxImages,
  updateImagesFunctions = () => {},
}) => {
  const [selectedImages, setSelectedImages] = useState<ImageType[]>(
    initialImages || []
  );
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialImages) {
      setSelectedImages(initialImages);
    }
  }, [initialImages]);

  const validateImage = (file: File) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        if (
          (maxHeight && img.height !== maxHeight) ||
          (maxWidth && img.width !== maxWidth)
        ) {
          reject("Image dimensions exceed the allowed limits.");
        } else if (maxSize && file.size > maxSize) {
          reject("File size exceeds the allowed limit.");
        } else {
          resolve(file);
        }
      };
      img.onerror = () => reject("Failed to load image.");
      img.src = URL.createObjectURL(file);
    });
  };

  const handleFileChange = async (files: FileList) => {
    try {
      if (files.length + selectedImages.length > maxImages) {
        toast.error(`You can only upload up to ${maxImages} images.`);
        return;
      }

      const newImages = Array.from(files);
      const validatedImages: ImageType[] = [];

      for (const file of newImages) {
        await validateImage(file);
        const image: ImageType = {
          name: file.name,
          url: URL.createObjectURL(file),
          type: file.type,
          file: file,
        };
        validatedImages.push(image);
      }

      const updatedImages = [...selectedImages, ...validatedImages];
      setSelectedImages(updatedImages);
      onImageChange?.(updatedImages);
      setError(null);
    } catch (err) {
      setError(typeof err === "string" ? err : "An error occurred");
    }
  };

  const handleDeleteImage = (index: number) => {
    const updatedImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(updatedImages);
    onImageChange?.(updatedImages);
  };

  const handleSelectFile = () => {
    fileInputRef.current?.click();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      handleFileChange(files);
    }
  };

  console.log(selectedImages);

  return (
    <section className="imageContainer imageContainerSection">
      <p>{name}</p>
      <div className="imageGrid">
        {selectedImages.length > 0
          ? selectedImages.map((image, index) => (
              <div className="imageWrapper" key={index}>
                {image.name ? (
                  <img src={image.url} alt={index.toString()} />
                ) : (
                  <img
                    src={
                      typeof image === "object"
                        ? `${server}/${image.url}`
                        : (image as any)
                    }
                    alt={image.name as any}
                  />
                )}
                <button
                  className="deleteButton"
                  onClick={() => {
                    console.log("clicked");
                    handleDeleteImage(index);
                    updateImagesFunctions(index);
                  }}
                >
                  X
                </button>
              </div>
            ))
          : defaultImageUrl && <img src={defaultImageUrl} alt="" />}
        {error && <div className="error">{error}</div>}
      </div>
      <section className="imageSelectContainer">
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleInputChange}
          style={{ display: "none" }}
          multiple
        />
        <div className="selction">
          <p>
            {selectedImages.length ? "Choose More Images" : "Choose Images"}
          </p>
          <span
            className="select clickable"
            role="button"
            onClick={handleSelectFile}
          >
            Browse
          </span>
        </div>
      </section>
      <p className="error">
        {touched && typeof errors === "string" ? errors : null}
      </p>
      <span className="errorImage">
        <b>Note:</b> Images should be {maxWidth}x{maxHeight} pixels and size
        should be less than {Number(maxSize) / 1024} KB.
      </span>
    </section>
  );
};

export default MultiImageComponent;
