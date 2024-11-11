import React, { useRef, useState, useEffect, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from '../utils/cropImage';
import './CardCustomizer.css';
import logo from '../assets/logo.png';
import template1JPEG from '../assets/template1.jpeg';
import template2JPEG from '../assets/template2.jpeg';
import template3JPEG from '../assets/template3.jpeg';
import template1PNG from '../assets/template1.png';
import template2PNG from '../assets/template2.png';
import template3PNG from '../assets/template3.png';

function CardCustomizer() {
  const [selectedTemplateJPEG, setSelectedTemplateJPEG] = useState(template1JPEG);
  const [selectedTemplatePNG, setSelectedTemplatePNG] = useState(template1PNG);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const canvasRef = useRef(null);

  // UseEffect to draw the template on canvas
  useEffect(() => {
    if (selectedTemplatePNG) {
      drawTemplate();
    }
  }, [selectedTemplatePNG, croppedImage]);

  // Draw template function to draw the PNG template and inlay cropped image
  const drawTemplate = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const cardImage = new Image();
    cardImage.src = selectedTemplatePNG;

    // Load PNG template and draw on canvas
    cardImage.onload = () => {
      const cardWidth = 300;  // Set small width
      const cardHeight = 180; // Set small height
      canvas.width = cardWidth;
      canvas.height = cardHeight;

      ctx.clearRect(0, 0, cardWidth, cardHeight);
      ctx.drawImage(cardImage, 0, 0, cardWidth, cardHeight);

      // Inlay cropped image if available
      if (croppedImage) {
        drawInlay(cardWidth, cardHeight);
      }
    };
  };

  // Function to draw cropped image inlay
  const drawInlay = (width, height) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const overlayImage = new Image();
    overlayImage.src = croppedImage;
    overlayImage.onload = () => {
      ctx.globalCompositeOperation = 'destination-over';
      ctx.drawImage(overlayImage, 0, 0, width, height);
      ctx.globalCompositeOperation = 'source-over';
    };
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
    }
  };

  // Handle crop complete action
  const handleCropComplete = useCallback(async () => {
    try {
      const croppedImg = await getCroppedImg(uploadedImage, croppedAreaPixels);
      setCroppedImage(croppedImg);
    } catch (error) {
      console.error('Failed to crop the image:', error);
    }
  }, [uploadedImage, croppedAreaPixels]);

  // Handle template selection
  const handleTemplateSelect = (templateJPEG, templatePNG) => {
    setSelectedTemplateJPEG(templateJPEG);
    setSelectedTemplatePNG(templatePNG);
    setCroppedImage(null);
  };

  return (
    <div className="card-customizer-container">
      <header className="header">
        <img src={logo} alt="Logo" className="logo" />
        <h1>Customize Your Card</h1>
      </header>
      <div className="card-customizer-content">
        <aside className="sidebar">
          <h3>Choose Card Template</h3>
          <div className="templates">
            <button
              className={`template-button ${selectedTemplateJPEG === template1JPEG ? 'selected' : ''}`}
              onClick={() => handleTemplateSelect(template1JPEG, template1PNG)}
            >
              Option 1
            </button>
            <button
              className={`template-button ${selectedTemplateJPEG === template2JPEG ? 'selected' : ''}`}
              onClick={() => handleTemplateSelect(template2JPEG, template2PNG)}
            >
              Option 2
            </button>
            <button
              className={`template-button ${selectedTemplateJPEG === template3JPEG ? 'selected' : ''}`}
              onClick={() => handleTemplateSelect(template3JPEG, template3PNG)}
            >
              Option 3
            </button>
          </div>
          <h3>Upload Image</h3>
          <label className="upload-button">
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            Choose Image
          </label>
          {uploadedImage && (
            <button className="save-crop-button" onClick={handleCropComplete} style={{ marginTop: '10px' }}>
              Save Crop
            </button>
          )}
        </aside>
        <main className="output">
          <img src={selectedTemplateJPEG} alt="Card Template Preview" className="template-preview" style={{ width: '300px', height: '180px' }} />
          {uploadedImage && (
            <div className="cropper-container">
              <Cropper
                image={uploadedImage}
                crop={crop}
                zoom={zoom}
                aspect={300 / 180}  // Smaller card aspect ratio
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={(croppedArea, pixels) => setCroppedAreaPixels(pixels)}
              />
            </div>
          )}
          <canvas ref={canvasRef} className="customized-card-canvas" style={{ width: '300px', height: '180px' }}></canvas>
        </main>
      </div>
    </div>
  );
}

export default CardCustomizer;
