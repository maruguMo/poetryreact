// ColorProcessor.js - Extracts colors
export class DefaultColorProcessor {
    process(img) {
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

        const majorColor = `rgb(${r}, ${g}, ${b}), 0.967`;
        const complementaryColor = `rgb(${255 - r}, ${255 - g}, ${255 - b})`;

        return { majorColor, complementaryColor };
    }
}
