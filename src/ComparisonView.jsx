import './ComparisonView.css';
import { useState } from 'react'

const imageModules = import.meta.glob('./assets/aircraft-pngs/*.png', { eager: true, query: '?url', import: 'default' });

const getFilenameFromPath = (path) => {
  const parts = path.split('/');
  return parts[parts.length - 1];
}

const imageMap = Object.keys(imageModules).reduce((acc, path) => {
  const filename = getFilenameFromPath(path);
  acc[filename] = imageModules[path];
  return acc;
}, {});

function ComparisonView({ airplanes }) {
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

  return (
    <div className="comparison-container">
      <div className='button-row-container'>
        <button onClick={handleOverlayClick}>Show Overlay</button>
        <button>Toggle Stats</button>
      </div>


      <>
        <div className='aircraft-wrapper'>

          {showOverlay ?
            (
              <>
                <div className='overlay-aircraft-text'>

                  {airplanes.map((aircraft) => (
                    <h5 style={{
                      color: `${aircraft.assignedTextFilter}`
                    }}
                    >&nbsp;{aircraft.name} </h5>
                  ))}

                </div>

                {airplanes.map((aircraft, index) => (
                  <>
                    <img
                      className="overlay-aircraft-image"
                      src={getImageUrl(aircraft.pngFileName)}
                      alt={aircraft.name}
                      style={{
                        height: 'auto',
                        width: `${(aircraft.length / Math.max(...airplanes.map(p => p.length))) * 90}%`,
                        maxWidth: '100%',
                        filter: index === 0
                          ? (aircraft.assignedOverlayFilter || 'none')
                          : `${aircraft.assignedOverlayFilter || 'none'} opacity(80%)`,
                        position: index === 0 ? 'relative' : 'absolute',
                        left: 0,
                        bottom: 0
                      }} />

                  </>
                )
                )}
              </>
            ) : (
              <>
                {airplanes.map(aircraft =>
                  <>
                    <h3 style={{ color: aircraft.assignedTextFilter }}>{aircraft.name}</h3>
                    <img
                      className="aircraft-image"
                      src={getImageUrl(aircraft.pngFileName)}
                      alt={aircraft.name}
                      style={{
                        height: 'auto',
                        width: `${(aircraft.length / Math.max(...airplanes.map(p => p.length))) * 90}%`,
                        maxWidth: '100%',
                        filter: aircraft.assignedFilter || 'none'
                      }} />
                  </>
                )}
              </>

            )}
        </div>
      </>
    </div>
  )
}
export default ComparisonView;