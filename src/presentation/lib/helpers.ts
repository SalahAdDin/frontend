export const getBlurUrlFromCloudinary = (url: string): string => {
  const urlParts = url.split("upload/");
  const blurIntensity = 300;
  return `${urlParts[0]}upload/e_blur:${blurIntensity.toString()}/${
    urlParts[1]
  }`;
};
