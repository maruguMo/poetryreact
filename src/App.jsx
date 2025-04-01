// import logo from './logo.svg';
import React, {useState, useEffect} from 'react';
import Calendar from './components/Calendar'
import PoetryAppBar from './components/PoetryAppBar';
import { colorExtractor } from './components/utils/ImageProcessor.js'; // Refactored 
import './App.css';
// import { Opacity } from '@mui/icons-material';
//#region images paths 
const images = [
  "/bgimages/bg1.png",
  "/bgimages/bg2.png",
  "/bgimages/bg3.png",
  "/bgimages/bg4.png",
  "/bgimages/bg5.png",
  "/bgimages/bg6.png",
  "/bgimages/bg7.png",
  "/bgimages/bg8.png",
  "/bgimages/bg9.png",
  "/bgimages/bg10.png",
  "/bgimages/bg11.png",
  "/bgimages/bg12.png",
  "/bgimages/bg13.png",
  "/bgimages/bg14.png",
  "/bgimages/bg15.png",
  "/bgimages/bg16.png",
  "/bgimages/bg17.png",
  "/bgimages/bg18.png",
  "/bgimages/bg19.png",
  "/bgimages/bg20.png",
  "/bgimages/bg21.png",
  "/bgimages/bg22.png",
  "/bgimages/bg24.png",
  "/bgimages/bg25.png",
  "/bgimages/bg27.png",
  "/bgimages/bg28.png",
  "/bgimages/bg29.png",
];
//#endregion
function getBgImage() {
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
}
function App() {
  const [bgImage, setBgImage] = useState(getBgImage());
  const [complementaryColor, setComplementaryColor] = useState('rgb(0,0,0)');
  const [majorColor, setMajorColor] = useState('bisque');
  const [hovered, setHovered] = useState(false);

  // Refactored image processing with graceful failure
  const processImageColors = async (image) => {
    try {
      const { majorColor, complementaryColor } =  await colorExtractor.extract(image)
        // console.log("Color extracted:", colorData);
        setMajorColor(majorColor);
        setComplementaryColor(complementaryColor);


    } catch (error) {
      console.error("Image processing failed:", error);
      setMajorColor("rgb(124, 124, 124)");
      setComplementaryColor("rgb(0,0,0)'");
    }
  };

  // Change background on load
  useEffect(() => {
    processImageColors(bgImage);
  }, [bgImage]);

  // Automatically change background every 30 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      setBgImage((prevBgImage) => {
        const newBgImage = getBgImage();
        if (newBgImage !== prevBgImage) {
          processImageColors(newBgImage);
          return newBgImage;
        }
        return prevBgImage;
      });
    }, 86400000);

    return () => clearInterval(interval);
  }, []);


  return (
      <div className="App" 
          style={{
                    backgroundImage:`url(${bgImage})`,
                    backgroundColor:`${majorColor}`,
                    backgroundRepeat:'no-repeat, no-repeat',
                    backgroundSize:'cover',
                    backgroundPosition:'center center',
                    backgroundBlendMode:hovered?'luminosity':'normal',
                    border:`1px solid ${complementaryColor}`,
                    borderRadius:'1%',
                    transition: 'background-blend-mode 0.5s ease-in-out', // Smooth transition
                    // opacity:'0.462',
                }}
                onMouseEnter={()=>setHovered(true)}
                onMouseLeave={()=>setHovered(false)}
      >
        <header className="App-header">
          <PoetryAppBar/>
        </header>
        <div className="app-parts">
          <Calendar 
              key={1}
              width={35}
              widthUnits={"dvw"}
              height={55}
              heightUnits={"dvh"}
              complementaryColor={complementaryColor}
              majorColor={majorColor}
          />
        </div>
      </div>
  );
}

export default React.memo(App);
