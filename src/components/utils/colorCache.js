// Ensure export is a class, not a function or object
export class ColorCache {
    constructor() {
      this.cache = new Map(); // O(1) access
    }
  
    get(imageSrc) {
      return this.cache.get(imageSrc);
    }
  
    set(imageSrc, colors) {
      this.cache.set(imageSrc, colors);
    }
    has(imageSrc){
        return this.cache.has(imageSrc);
    }
    clear() {
      this.cache.clear();
    }
  }
  