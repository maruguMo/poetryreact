// Extractor.js - The main high-level function (OCP & DIP)
export class ColorExtractor {
    constructor(imageLoader, colorProcessor, cache) {
        this.imageLoader = imageLoader;
        this.colorProcessor = colorProcessor;
        this.cache = cache;
    }

    async extract(imageUrl) {
        if (this.cache.has(imageUrl)) {
            return this.cache.get(imageUrl);
        }
    
        try {
            const img = await this.imageLoader.load(imageUrl);
            const colorData = this.colorProcessor.process(img);
    
            this.cache.set(imageUrl, colorData);
            return colorData; // Return the color data
        } catch (error) {
            console.error("Error extracting color:", error);
            throw error;
        }
    }
    
}