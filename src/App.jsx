import { useState } from 'react'
import { motion } from "motion/react";
import AircraftSelect from './AircraftSelect.jsx';
import ComparisonView from './ComparisonView.jsx';
import './App.css'
import AppBar from './AppBar.jsx';

const PLANE_FILTERS = [
  'opacity(0.9) drop-shadow(0 0 0 red)',
  'opacity(0.9) drop-shadow(0 0 0 blue)',
  'opacity(0.9) drop-shadow(0 0 0 green)',
  'opacity(0.9) drop-shadow(0 0 0 purple)'
];

const OVERLAY_PLANE_FILTERS = [
  'contrast(0) sepia(1) hue-rotate(308deg) brightness(1) saturate(10)', // red
  'contrast(0) sepia(1) hue-rotate(190deg) brightness(1) saturate(10)', // blue
  'contrast(0) sepia(1) hue-rotate(61deg) brightness(0.7) saturate(10)', // green
  'contrast(0) sepia(1) hue-rotate(220deg) brightness(0.7) saturate(10)' // purple
]

const TEXT_FILTERS = [
  'rgb(102, 0, 0)',
  'rgb(0, 60, 109)',
  'rgb(0, 102, 31)',
  'rgba(78, 0, 102, 1)'
];

function App() {
  const [airplaneList, setAirplaneList] = useState([]);
  const [showComparison, setShowComparison] = useState(false);

  const handleCompareClick = () => {
    if (airplaneList < 2) {
      alert("Select at least two airplanes to continue.");
      return;
    }

    const distinctIds = new Set(airplaneList.map(a => a.id));
    if (distinctIds.size !== airplaneList.length) {
      alert("Please select distinct airplanes for comparison.");
      return;
    }

    const sortedForComparison = [...airplaneList].sort((a, b) => b.length - a.length);
    setAirplaneList(sortedForComparison);
    setShowComparison(true);
  };

  const handleReturnClick = () => {
    setShowComparison(false);
  };

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      key={`${showComparison}`}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.0 }}
      className="App">
      {showComparison ?
        (
          <>
            <ComparisonView airplanes={airplaneList} />
            <div className="return-button-container">
              <button className="return-button" onClick={handleReturnClick}>Compare other Aircraft</button>
            </div>
          </>
        ) : (
          <>
            <header className="App-header">
              <h1>✈️ Aircraft Comparator</h1>
              <h2>A neat way to visualize aircraft sizes</h2>
            </header>
            <div className="selection-container">
              {Array.from({ length: Math.max(2, airplaneList.length + 1) }).map((_, index) => (
                index < 4 && (
                  <AircraftSelect
                    key={index}
                    label={`Select Airplane ${index + 1}`}
                    initialSelectedAircraft={airplaneList[index]}
                    onSelectAircraft={(aircraftData) => {
                      const newSelectedAirplanes = [...airplaneList];
                      if (aircraftData) {
                        const assignedFilter = airplaneList[index]?.assignedFilter || PLANE_FILTERS[index % PLANE_FILTERS.length]
                        const assignedTextFilter = airplaneList[index]?.assignedTextFilter || TEXT_FILTERS[index % TEXT_FILTERS.length]
                        const assignedOverlayFilter = airplaneList[index]?.assignedOverlayFilter || OVERLAY_PLANE_FILTERS[index % OVERLAY_PLANE_FILTERS.length]
                        newSelectedAirplanes[index] = { ...aircraftData, assignedFilter: assignedFilter, assignedTextFilter: assignedTextFilter, assignedOverlayFilter: assignedOverlayFilter };
                      } else {
                        newSelectedAirplanes[index] = null;
                      }
                      setAirplaneList(newSelectedAirplanes.filter(Boolean))
                    }}
                    disabledAircraftIds={airplaneList.map(a => a?.id).filter(id => id && id !== airplaneList[index])}
                  />
                )
              ))}
            </div>

            {airplaneList.length >= 2 && (
              <div className="button-row">
                <button className="Compare" onClick={handleCompareClick}>
                  Compare Planes &#129034;
                </button>
              </div>
            )}
            <AppBar></AppBar>
          </>
        )
      }
    </motion.div>
  )
}

export default App