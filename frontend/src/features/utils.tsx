export function generateRandomId(size: number): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters.charAt(randomIndex);
  }
  return id;
}

export const extractFirstTag = (html: string) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const firstElement = doc.body.firstElementChild;
  // console.log("First Element:", firstElement); // Debugging line
  return firstElement ? firstElement.outerHTML : "";
};

// Function to filter items by name and remove duplicates
// export const filterAndRemoveDuplicates = (items: any[], name: string) => {
//   const filtered = [...new Set(items.map((item) => item[name].toLowerCase()))];
//   if (items.length > 1) {
//     return filtered.filter((value) => value !== "none");
//   }
//   return filtered;
// };

export const removeDuplicates = (items: any[], name: string) => {
  return [
    ...new Map(items.map((item) => [item[name].toLowerCase(), item])).values(),
  ];
};

// Reusable function to filter and remove duplicates
export const filterAndRemoveDuplicates = (items: any[], prop: string) => {
  const filteredItems = items.filter(
    (item, index, self) =>
      index === self.findIndex((t) => t[prop] === item[prop])
  );
  return filteredItems.filter((item) => item.name.toLowerCase() !== "none");
};

export const detectDeviceType = () =>
  /Mobile|Android|iPhone|iPad/i.test(navigator.userAgent)
    ? "Mobile"
    : "Desktop";
