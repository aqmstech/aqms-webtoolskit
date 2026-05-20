import jsQR from 'jsqr';

/**
 * Detects and decodes all QR codes in an image.
 * Uses a canvas masking approach to scan multiple QR codes iteratively.
 * 
 * @param {HTMLImageElement} imageElement
 * @returns {Promise<Array<{data: string, type: string, location: object}>>}
 */
export function detectAndDecodeQrs(imageElement) {
  return new Promise((resolve) => {
    // Create a processing canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    const width = imageElement.naturalWidth || imageElement.width;
    const height = imageElement.naturalHeight || imageElement.height;
    
    // Set canvas dimensions
    canvas.width = width;
    canvas.height = height;
    
    // Draw the source image
    ctx.drawImage(imageElement, 0, 0, width, height);
    
    const results = [];
    let scanning = true;
    let iterations = 0;
    const maxIterations = 10; // Prevent infinite loops
    
    while (scanning && iterations < maxIterations) {
      iterations++;
      const imageData = ctx.getImageData(0, 0, width, height);
      
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'attemptBoth',
      });
      
      if (code) {
        const type = classifyQrContent(code.data);
        
        // Prevent duplicate results at the exact same location
        const isDuplicate = results.some(r => 
          Math.abs(r.location.topLeftCorner.x - code.location.topLeftCorner.x) < 5 &&
          Math.abs(r.location.topLeftCorner.y - code.location.topLeftCorner.y) < 5
        );
        
        if (!isDuplicate) {
          results.push({
            data: code.data,
            type,
            location: code.location, // corners: { topLeftCorner, topRightCorner, bottomLeftCorner, bottomRightCorner }
          });
        }
        
        // Mask out the detected QR code by drawing a solid white polygon over its bounding area
        ctx.fillStyle = '#FFFFFF';
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(code.location.topLeftCorner.x, code.location.topLeftCorner.y);
        ctx.lineTo(code.location.topRightCorner.x, code.location.topRightCorner.y);
        ctx.lineTo(code.location.bottomRightCorner.x, code.location.bottomRightCorner.y);
        ctx.lineTo(code.location.bottomLeftCorner.x, code.location.bottomLeftCorner.y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      } else {
        scanning = false;
      }
    }
    
    resolve(results);
  });
}

/**
 * Classifies the decoded QR code content into a type (URL, Email, Phone, WiFi, Text, etc.)
 * 
 * @param {string} text
 * @returns {string}
 */
export function classifyQrContent(text) {
  const trimmed = text.trim();
  
  // URL check
  try {
    if (/^https?:\/\//i.test(trimmed)) {
      new URL(trimmed);
      return 'URL';
    }
  } catch {
    // Ignore invalid URL parsing
  }
  
  if (/^(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}(\/\S*)?$/i.test(trimmed)) {
    return 'URL';
  }
  
  // Email check
  if (/^mailto:/i.test(trimmed)) {
    return 'Email';
  }
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(trimmed)) {
    return 'Email';
  }
  
  // Phone check
  if (/^tel:/i.test(trimmed)) {
    return 'Phone';
  }
  if (/^\+?[0-9\s\-()]{7,20}$/.test(trimmed)) {
    return 'Phone';
  }
  
  // WiFi check
  if (/^WIFI:/i.test(trimmed)) {
    return 'WiFi';
  }
  
  return 'Text';
}
