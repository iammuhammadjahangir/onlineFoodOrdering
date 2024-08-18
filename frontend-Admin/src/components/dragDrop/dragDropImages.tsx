import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../button/button";

export interface ImageType {
  name: string;
  url: string;
  type: string;
  file: File;
}

interface DragDropProps {
  handleClick: (images: ImageType[]) => void;
}
const DragDropImages = ({ handleClick }: DragDropProps) => {
  const { t } = useTranslation();
  const [images, setImages] = useState<ImageType[]>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectFiles = () => {
    fileInputRef.current!.click();
  };

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files === null || files.length === 0) return;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split("/")[0] !== "image") continue;
      if (!images.some((e: ImageType) => e.name === files[i].name)) {
        setImages((prevImages: ImageType[]) => [
          ...prevImages,
          {
            name: files[i].name,
            url: URL.createObjectURL(files[i]),
            type: files[i].type,
            file: files[i],
          },
        ]);
      }
    }
  };

  const deleteImage = (index: number) => {
    setImages((prevImages: ImageType[]) =>
      prevImages.filter((_, i) => i !== index)
    );
  };

  // For Adding Drag and drop Functionality
  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
    e.dataTransfer.dropEffect = "copy";
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split("/")[0] !== "image") continue;
      if (!images.some((e: ImageType) => e.name === files[i].name)) {
        setImages((prevImages: ImageType[]) => [
          ...prevImages,
          {
            name: files[i].name,
            url: URL.createObjectURL(files[i]),
            type: files[i].type,
            file: files[i],
          },
        ]);
      }
    }
  };
  return (
    <div className="dragDropImages">
      <div
        className="dragArea"
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        {isDragging ? (
          <span className="select">{t("dropImagesHere")}</span>
        ) : (
          <>
            {t("dragandDopImagesHereOr")}
            {"  "} &nbsp;
            <span
              className="select clickable"
              role="button"
              onClick={selectFiles}
            >
              {t("browse")}
            </span>
          </>
        )}
        <input
          name="file"
          type="file"
          className="file"
          multiple
          ref={fileInputRef}
          onChange={onFileSelect}
        />
      </div>
      <div className="container">
        {images.map((image, index) => (
          <div key={index} className="image">
            <span className="dragDropDelete" onClick={() => deleteImage(index)}>
              &times;
            </span>
            <img src={image.url} alt={image.name} />
          </div>
        ))}
      </div>
      <Button
        type="button"
        className="filled"
        text={t("uploadImages")}
        handleClick={() => {
          handleClick(images);
        }}
      />
    </div>
  );
};

export default DragDropImages;
