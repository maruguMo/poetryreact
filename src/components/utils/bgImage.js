// bgImages.js

// Array of background images
const images = [
  { bgImage: "/bgimages/bg2.png", quote: "The soul is dyed the color of its thoughts. — Marcus Aurelius" },
  { bgImage: "/bgimages/bg6.png", quote: "In three words I can sum up everything I've learned about life: it goes on. — Robert Frost" },
  { bgImage: "/bgimages/bg11.png", quote: "The wound is the place where the light enters you. — Rumi" },
  { bgImage: "/bgimages/bg12.png", quote: "The only way to do great work is to love what you do. — Steve Jobs" },
  { bgImage: "/bgimages/bg13.png", quote: "The best way out is always through. — Robert Frost" },
  { bgImage: "/bgimages/bg24.png", quote: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment. — Ralph Waldo Emerson" },
  { bgImage: "/bgimages/bg25.png", quote: "There is no greater agony than bearing an untold story inside you. — Maya Angelou" },
  { bgImage: "/bgimages/bg26.png", quote: "The purpose of our lives is to be happy. — Dalai Lama" },
  { bgImage: "/bgimages/bg28.png", quote: "The mind is everything. What you think, you become. — Buddha" },
  { bgImage: "/bgimages/bg30.png", quote: "The future belongs to those who believe in the beauty of their dreams. — Eleanor Roosevelt" },
  { bgImage: "/bgimages/bg31.png", quote: "Do not go where the path may lead, go instead where there is no path and leave a trail. — Ralph Waldo Emerson" },
  { bgImage: "/bgimages/bg32.png", quote: "The road of life twists and turns, but every curve has its surprise. — Louisa May Alcott" },
  { bgImage: "/bgimages/bg33.png", quote: "The best revenge is massive success. — Frank Sinatra" },
  { bgImage: "/bgimages/bg34.png", quote: "The only limit to our realization of tomorrow is our doubts of today. — Franklin D. Roosevelt" },
  { bgImage: "/bgimages/bg35.png", quote: "The greatest glory in living lies not in never falling, but in rising every time we fall. — Nelson Mandela" },
  { bgImage: "/bgimages/bg36.png", quote: "The best time to plant a tree was 20 years ago. The second best time is now. — Chinese Proverb" },
  { bgImage: "/bgimages/bg37.png", quote: "The only thing necessary for the triumph of evil is for good men to do nothing. — Edmund Burke" },
  { bgImage: "/bgimages/bg38.png", quote: "The measure of who we are is what we do with what we have. — Vince Lombardi" },
  { bgImage: "/bgimages/bg39.png", quote: "The universe is change; our life is what our thoughts make it. — Marcus Aurelius" },
  { bgImage: "/bgimages/bg40.png", quote: "The oak fought the wind and was broken, the willow bent when it must and survived. — Robert Jordan" },
  { bgImage: "/bgimages/bg41.png", quote: "The journey of a thousand miles begins with one step. — Lao Tzu" },
  { bgImage: "/bgimages/bg42.png", quote: "The only true wisdom is in knowing you know nothing. — Socrates" },
  { bgImage: "/bgimages/bg43.png", quote: "The only way to deal with fear is to face it head-on. — Unknown" },
  { bgImage: "/bgimages/bg44.png", quote: "The best thing about the future is that it comes one day at a time. — Norman Vincent Peale" },
  { bgImage: "/bgimages/bg45.png", quote: "The highest form of ignorance is when you reject something you don't know anything about. — Wayne Dyer" }
];

// const images = [
//   "/bgimages/bg2.png",
//   "/bgimages/bg6.png",
//   "/bgimages/bg11.png",
//   "/bgimages/bg12.png",
//   "/bgimages/bg13.png",
//   "/bgimages/bg24.png",
//   "/bgimages/bg25.png",
//   "/bgimages/bg26.png",
//   "/bgimages/bg28.png",
//   "/bgimages/bg30.png",
//   "/bgimages/bg31.png",
//   "/bgimages/bg32.png",
//   "/bgimages/bg33.png",
//   "/bgimages/bg34.png",
//   "/bgimages/bg35.png",
//   "/bgimages/bg36.png",
//   "/bgimages/bg37.png",
//   "/bgimages/bg38.png",
//   "/bgimages/bg39.png",
//   "/bgimages/bg40.png",
//   "/bgimages/bg41.png",
//   "/bgimages/bg42.png",
//   "/bgimages/bg43.png",
//   "/bgimages/bg44.png",
//   "/bgimages/bg45.png",
// ];

// Function to get a random background image
function getBgImage() {
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
}

// Export both the array and the function
export { images, getBgImage };