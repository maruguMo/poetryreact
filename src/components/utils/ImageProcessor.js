import { ColorCache } from "./colorCache";
import { ImageLoader } from "./imageLoader";
import { DefaultColorProcessor } from "./colorProcessor";
import { ColorExtractor } from "./Extractor"; // Assuming this is the class

// Declarations
const colorCache = new ColorCache();
const imageLoader = new ImageLoader();
const colorProcessor = new DefaultColorProcessor();
const colorExtractor = new ColorExtractor(imageLoader, colorProcessor, colorCache);

export { colorExtractor };