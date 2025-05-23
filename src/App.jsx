import { useState } from 'react'
import AircraftSelect from './AircraftSelect.jsx';
import ComparisonView from './ComparisonView.jsx';
import './App.css'

function App() {
  const [airplane1, setAirplane1] = useState(null);
  const [airplane2, setAirplane2] = useState(null);
  const [showComparison, setShowComparison] = useState(false);

  const handleSelectAirplane1 = (aircraftData) => {
    setAirplane1(aircraftData);
  };

  const handleSelectAirplane2 = (aircraftData) => {
    setAirplane2(aircraftData);
  };

  const handleCompareClick = () => {
    if ((airplane1 && airplane2) && (airplane1 != airplane2)) {
      let largerPlane = airplane1;
      let smallerPlane = airplane2;

      if (airplane1.length < airplane2.length) {
        largerPlane = airplane2;
        smallerPlane = airplane1;
      }
      setAirplane1(largerPlane);
      setAirplane2(smallerPlane);
      setShowComparison(true);
    }
    else if (airplane1 == airplane2) {
      alert("Airplanes must be different!")
    }
    else {
      alert("Select both airplanes to continue.");
    }
  };

  const handleReturnClick = () => {
    setShowComparison(false);
  };

  return (
    <div className="App">
      {showComparison ?
        (
          <>
            <ComparisonView airplane1={airplane1} airplane2={airplane2} />
            <div className="back-button">
              <button className="return-button" onClick={handleReturnClick}>Compare other Aircraft</button>
            </div>
          </>
        ) : (
          <>
            <header className="App-header">
              <h1>Aircraft Comparator</h1>
              <h2>A neat way to visualize aircraft sizes</h2>
            </header>

            <div className="selection-container">
              <AircraftSelect
                label="Select Airplane 1"
                onSelectAircraft={handleSelectAirplane1}/>
              <AircraftSelect
                label="Select Airplane 2"
                onSelectAircraft={handleSelectAirplane2}/>
              <button className="Compare" onClick={handleCompareClick}>
                Compare Planes &#129034;
              </button>
            </div>
          </>
        )
      }
    </div>
  )
}

export default App