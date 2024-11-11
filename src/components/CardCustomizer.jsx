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
  const [selectedTemplateJPEG, setSelectedTemplateJPEG] = useState(null);
  const [selectedTemplatePNG, setSelectedTemplatePNG] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (countdown === 0 && selectedTemplatePNG && croppedImage) {
      drawTemplate();
    }
  }, [countdown, selectedTemplatePNG, croppedImage]);

  const drawTemplate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const cardImage = new Image();
    cardImage.src = selectedTemplatePNG;

    cardImage.onload = () => {
      const cardWidth = 400;
      const cardHeight = 250;
      canvas.width = cardWidth;
      canvas.height = cardHeight;

      ctx.clearRect(0, 0, cardWidth, cardHeight);
      ctx.drawImage(cardImage, 0, 0, cardWidth, cardHeight);

      if (croppedImage) {
        drawInlay(cardWidth, cardHeight);
      }
    };
  };

  const drawInlay = (width, height) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const overlayImage = new Image();
    overlayImage.src = croppedImage;
    overlayImage.onload = () => {
      ctx.globalCompositeOperation = 'destination-over';
      ctx.drawImage(overlayImage, 0, 0, width, height);
      ctx.globalCompositeOperation = 'source-over';
    };
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
    }
  };

  const handleCropComplete = useCallback(async () => {
    setLoading(true);
    setCountdown(3);

    try {
      const croppedImg = await getCroppedImg(uploadedImage, croppedAreaPixels);
      setCroppedImage(croppedImg);

      let countdownInterval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            setLoading(false);
            setCountdown(0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      console.error('Failed to crop the image:', error);
      setLoading(false);
    }
  }, [uploadedImage, croppedAreaPixels]);

  const handleTemplateSelect = (templateJPEG, templatePNG) => {
    setSelectedTemplateJPEG(templateJPEG);
    setSelectedTemplatePNG(templatePNG);
    setCroppedImage(null);
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'customized_card.png';
    link.click();
  };

  return (
    <div className="card-customizer-container">
      <header className="header">
        <img src={logo} alt="Logo" className="logo" />
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
            <button className="save-crop-button" onClick={handleCropComplete}>
              Crop and Save
            </button>
          )}
        </aside>
        <main className="output">
          {!loading && !croppedImage && selectedTemplateJPEG && (
            <img
              src={selectedTemplateJPEG}
              alt="Card Template Preview"
              className="template-preview"
              style={{ width: '350px', height: '210px', marginBottom: '20px' }}
            />
          )}
          {uploadedImage && !loading && !croppedImage && (
            <div className="cropper-container" style={{ marginBottom: '20px' }}>
              <Cropper
                image={uploadedImage}
                crop={crop}
                zoom={zoom}
                aspect={300 / 180}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={(croppedArea, pixels) => setCroppedAreaPixels(pixels)}
              />
            </div>
          )}
          {loading && countdown != null ? (
            <div className="countdown">
              <h2>Visualizing your dream card in {countdown}...</h2>
            </div>
          ) : (
            croppedImage && countdown === 0 && (
              <div className="final-output">
                <canvas
                  ref={canvasRef}
                  className="customized-card-canvas"
                  style={{ width: '400px', height: '250px' }}
                ></canvas>
                <div className="action-buttons">
                  <button onClick={downloadImage} className="download-button">Download</button>
                  <button className="submit-button">Submit</button>
                </div>
              </div>
            )
          )}
        </main>
      </div>
    </div>
  );
}

export default CardCustomizer;
