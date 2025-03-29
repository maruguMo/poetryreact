// isCloseToWhite.js - Utility function
export default function isCloseToWhite(colorString) {

    const [r, g, b] = colorString.replace(/[^\d,]/g, "").split(",").map(Number);

    // Normalize RGB values (0-1 range)
    const luminance = 0.2126 * (r / 255) + 0.7152 * (g / 255) + 0.0722 * (b / 255);

    return luminance > 0.8;
}