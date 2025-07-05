import './ComparisonView.css';
import { useState } from 'react'
import { motion } from "motion/react"


const imageModules = import.meta.glob('./assets/aircraft-pngs/*.png', { eager: true, query: '?url', import: 'default' });

/* Get the filename (ex: erj175.png) */
const getFilenameFromPath = (path) => {
  const parts = path.split('/');
  return parts[parts.length - 1];
}


const imageMap = Object.keys(imageModules).reduce((acc, path) => {
  const filename = getFilenameFromPath(path);
  acc[filename] = imageModules[path];
  return acc;
}, {});

function ComparisonView({ airplane1, airplane2 }) {

  const airplane1ImageUrl = getImageUrl(airplane1?.pngFileName);
  const airplane2ImageUrl = getImageUrl(airplane2?.pngFileName);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showStats, setShowStats] = useState(false);

  const handleOverlayClick = () => {
    setShowStats(false);
    if (!showOverlay) {
      setShowOverlay(true);
    } else {
      setShowOverlay(false);
    }
  };

  const handleStatsClick = () => {
    if (!showStats) {
      setShowStats(true);
    } else {
      setShowStats(false);
    }
  }

  function getImageUrl(filename) {
    return imageMap[filename] || null;
  }

  const maxLength = Math.max(airplane1.length, airplane2.length);
  const containerWidth = 1000;
  const scaledWidth1 = (airplane1.length / maxLength) * containerWidth;
  const scaledWidth2 = (airplane2.length / maxLength) * containerWidth;

  return (
    <>

    <motion.div
      initial={{opacity: 0 }}
      animate={{opacity: 1 }}
      transition = {{ duration:1.0}}
    >
      <div className="title-container"> {/* Title Text */}
        <h3>{airplane1.name} </h3> <h5>&nbsp;compared to&nbsp;</h5>  <h4> {airplane2.name} </h4>
      </div>

      <div className="button-row-container">
        {showOverlay ? (
          <>
            <button onClick={handleOverlayClick}>Toggle Overlay View</button>
          </>
        ) : (
          <>
            <button onClick={handleStatsClick}>Show Stats</button>
            <button onClick={handleOverlayClick}>Toggle Overlay View</button>
          </>
        )}
      </div>
    </motion.div>
      
      <motion.div
      variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                duration:2.0
              }
            }
          }}
          initial="hidden"
          animate="show"
      className="comparison-container"> {/* Comparison Background Container */}
        
        {showOverlay ? (
          <> {/*--- Overlay View of Aircrafts --- */}

            {/* Aircraft Image 1 */}
            <div className="overlay-aircraft-wrapper">
              {airplane1ImageUrl && (
                <img
                  className='overlay-airplane-one'
                  src={airplane1ImageUrl}
                  alt={airplane1.name}
                  align="left"
                  style={{ width: `${scaledWidth1}px`, height: 'auto' }}
                />
              )}
            </div>

            {/* Aircraft Image 2 */}

            <div className="overlay-aircraft-wrapper">
              {airplane2ImageUrl && (
                <img
                  className='overlay-airplane-two'
                  src={airplane2ImageUrl}
                  alt={airplane2.name}
                  align="left"
                  style={{ width: `${scaledWidth2}px`, height: 'auto' }}
                />
              )}
            </div>
          </>
        ) : (
          <> {/* Side-by-Side View of Aircrafts */}
            <div className="aircraft-wrapper">
              <div className="aircraft-title">
                <h3>{airplane1.name}</h3>
              </div>

              <div className="stats-container">
                {showStats ? (
                  <>
                    <p1>Length: {airplane1.length} meters</p1>
                    <br />
                    <p1>Wingspan: {airplane1.wingspan} meters</p1>
                    <br />
                    <p1>Height: {airplane1.height} meters</p1>
                  </>
                ) : (<></>)}
              </div>

              {airplane1ImageUrl && (
                <img
                  className='airplane-one'
                  src={airplane1ImageUrl}
                  alt={airplane1.name}
                  align="left"
                  style={{ width: `${scaledWidth1}px`, height: 'auto' }}
                />
              )}
            </div>

            <div className="aircraft-wrapper">
              <div className="aircraft-title">
                <h4>{airplane2.name}</h4>
              </div>

              <div className="stats-container">
                {showStats ? (
                  <>
                    <p1>Length: {airplane2.length} meters</p1>
                    <br />
                    <p1>Wingspan: {airplane2.wingspan} meters</p1>
                    <br />
                    <p1>Height: {airplane2.height} meters</p1>
                  </>
                ) : (<></>)}
              </div>

              {airplane2ImageUrl && (
                <img
                  className='airplane-two'
                  src={airplane2ImageUrl}
                  alt={airplane2.name}
                  align="left"
                  style={{ width: `${scaledWidth2}px`, height: 'auto' }}
                />
              )}
            </div>
          </>
        )}
      </motion.div>
      );
    </>
  )
}
      export default ComparisonView;