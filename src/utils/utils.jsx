export const createImage = (url) =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', (error) => reject(error));
      image.src = url;
    });
  
  export function getRadianAngle(degreeValue) {
    return (degreeValue * Math.PI) / 180;
  }
  