export function extractMajorColor(imageUrl, callback) {
    const img = new Image();
    img.crossOrigin = "Anonymous"; // Prevent CORS issues (useful if loading from an external source)
    img.src = imageUrl;

    img.onload = function () {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

        let r = 0, g = 0, b = 0, count = 0;
        for (let i = 0; i < imageData.length; i += 4) {
            r += imageData[i];     // Red
            g += imageData[i + 1]; // Green
            b += imageData[i + 2]; // Blue
            count++;
        }

        r = Math.round(r / count);
        g = Math.round(g / count);
        b = Math.round(b / count);

        const majorColor = `rgb(${r}, ${g}, ${b})`;
        const complementaryColor = `rgb(${255 - r}, ${255 - g}, ${255 - b}, ${1})`;

        callback({ majorColor, complementaryColor });
    };

    img.onerror = function () {
        console.error("Error loading image:", imageUrl);
    };
}

export function isCloseToWhite(colorString) {
    const [r, g, b] = colorString.split(",").map(Number);

    // Normalize RGB values (0-1 range)
    const normR = r / 255;
    const normG = g / 255;
    const normB = b / 255;

    // Compute luminance
    const luminance = 0.2126 * normR + 0.7152 * normG + 0.0722 * normB;

    // If luminance is high (>0.8), return true (too close to white)
    return luminance > 0.8;
}

