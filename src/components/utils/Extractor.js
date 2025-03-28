// Extractor.js - The main high-level function (OCP & DIP)
export class ColorExtractor {
    constructor(imageLoader, colorProcessor, cache) {
        this.imageLoader = imageLoader;
        this.colorProcessor = colorProcessor;
        this.cache = cache;
    }

    async extract(imageUrl, callback) {
        if (this.cache.has(imageUrl)) {
            callback(this.cache.get(imageUrl));
            return;
        }

        try {
            const img = await this.imageLoader.load(imageUrl);
            const colorData = this.colorProcessor.process(img);

            this.cache.set(imageUrl, colorData);
            callback(colorData);
        } catch (error) {
            console.error("Error extracting color:", error);
        }
    }
}