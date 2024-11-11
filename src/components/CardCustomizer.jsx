import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from '../utils/cropImage';
import './CardCustomizer.css';

function CardCustomizer() {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(1); // Default to template 1

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

  const handleTemplateSelect = (templateNumber) => {
    setSelectedTemplate(templateNumber);
    setCroppedImage(null); // Clear any previous cropped image
  };

  return (
    <div className="card-customizer-container">
      <header className="header">
        <h1>Customize Your Card</h1>
      </header>
      <div className="card-customizer-content">
        <aside className="sidebar">
          <h3>Choose Card Template</h3>
          <div className="templates">
            <button
              className="template-button"
              onClick={() => handleTemplateSelect(1)}
            >
              Template 1
            </button>
            <button
              className="template-button"
              onClick={() => handleTemplateSelect(2)}
            >
              Template 2
            </button>
            <button
              className="template-button"
              onClick={() => handleTemplateSelect(3)}
            >
              Template 3
            </button>
          </div>
          <h3>Upload Image</h3>
          <label className="upload-button">
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            Choose Image
          </label>
          {imageSrc && (
            <button className="crop-button" onClick={handleCrop}>Crop & Save</button>
          )}
        </aside>
        <main className="output">
          {imageSrc && (
            <div className="crop-container">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1.585} // Adjust aspect ratio as per card size
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
          )}
          <div
            className="card-preview"
            style={{
              backgroundColor: "rgba(69, 254, 0, 1)", // Apply background color
            }}
          >
            {croppedImage && (
              <img src={croppedImage} alt="Cropped" className="cropped-image" />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default CardCustomizer;
