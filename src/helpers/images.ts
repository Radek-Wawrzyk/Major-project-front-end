import config from 'config';

const getImagePath = (relativeImageSrc: string): string => {
  return `${config.api.baseUrl}/${relativeImageSrc}`;
};

const createImagesGallery = (photos) => {
  
}

export {
  getImagePath,
};
