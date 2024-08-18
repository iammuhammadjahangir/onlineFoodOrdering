// Convert base64 photo to File object
export const stringToFileConverter = (file: string) => {
  const byteCharacters = atob(file.split(",")[1]);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], {
    type: file.split(",")[0].split(":")[1].split(";")[0],
  });
  console.log(file.split(",")[0].split(":")[1].split(";")[0]);
  const result = new File(
    [blob],
    `photo.${file.split(",")[0].split(":")[1].split(";")[0]}`
  );
  return result;
};

export const blobToFileConverter = (blob: Blob) => {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(blob);
    let img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.src = url;
  });
};
