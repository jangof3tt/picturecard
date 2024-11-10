// src/components/CardCustomizer.jsx
import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from '../utils/cropImage';
import VisaCardOverlay from '../assets/visa-overlay.png';
//import MasterCardOverlay from '../assets/mastercard-overlay.png';
import './CardCustomizer.css';

function CardCustomizer() {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [cardOverlay, setCardOverlay] = useState(VisaCardOverlay);

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleCrop = async () => {
    try {
      const croppedImg = await getCroppedImg(imageSrc, croppedAreaPixels);
      setCroppedImage(croppedImg);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="card-customizer">
      <h2 className="customizer-title">Card Customizer</h2>

      <div className="card-selector">
        <button className="card-selector-button" onClick={() => setCardOverlay(VisaCardOverlay)}>
          Visa
        </button>
      </div>

      <input type="file" accept="image/*" onChange={handleImageUpload} className="file-input" />

      {imageSrc && (
        <div className="crop-container">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={1}
            aspect={1.585}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
          />
        </div>
      )}

      <button className="crop-button" onClick={handleCrop}>Crop & Save</button>

      {croppedImage && (
        <div className="card-preview">
          <img src={croppedImage} alt="Cropped" className="cropped-image" />
          <img src={cardOverlay} alt="Card Overlay" className="card-overlay" />
        </div>
      )}
    </div>
  );
}

export default CardCustomizer;
