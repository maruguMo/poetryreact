// ImageLoader.js - Abstraction for loading images
export class ImageLoader {
    async load(imageUrl) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = "Anonymous";
            img.src = imageUrl;
            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error("Failed to load image"));
        });
    }
}
