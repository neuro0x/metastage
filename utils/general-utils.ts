export const goToExternalUrl = (url?: string) => {
  if (url) {
    window.open(url, "_blank");
  }
};

export const shortenText = (text: string, length = 100) => {
  if (text.length < length) return text;
  return text.substring(0, length) + "...";
};

export const shortenAddress = (address: string): string => {
  if (!address) return "";

  const first3Characters = address.substring(0, 3);
  const last3Characters = address.substring(address.length - 3, address.length);

  return `${first3Characters}...${last3Characters}`;
};
