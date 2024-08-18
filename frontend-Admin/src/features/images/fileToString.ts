export const FileToString = async (url: string) => {
  try {
    // Fetch the image data
    const response = await fetch(url);
    const blob = await response.blob();

    // Convert the image data to Base64
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise((resolve, reject) => {
      reader.onloadend = () => {
        const base64data = reader.result;
        resolve(base64data);
      };
      reader.onerror = reject;
    });
  } catch (error) {
    console.error("Error converting image URL to Base64:", error);
    return null;
  }
};
