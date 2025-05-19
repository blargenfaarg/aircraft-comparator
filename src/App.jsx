import { useState } from 'react'
import AircraftSelect from './AircraftSelect.jsx';
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [airplane1, setAirplane1] = useState(null);
  const [airplane2, setAirplane2] = useState(null);

  const handleSelectAirplane1 = (aircraftData) => {
    setAirplane1(aircraftData);
  };

  const handleSelectAirplane2 = (aircraftData) => {
    setAirplane2(aircraftData);
  };

  const handleCompareClick = () => {
    if ((airplane1 && airplane2) && (airplane1 != airplane2))
    {
      console.log("Comparing: ", airplane1.name, "and", airplane2.name);
    }
    else if (airplane1 == airplane2) 
    {
      alert("Airplanes must be different!")
    }
    else {
      alert("Select both airplanes to continue.");
    }
  };

  return (
    <div className = "App">
      
      <header className = "App-header">
        <h1>Aircraft Comparator</h1>
        <h2>A neat way to visualize aircraft sizes</h2>
      </header>
      
      <div className="selection-container">
        <AircraftSelect 
        label = "Select Airplane 1"
        onSelectAircraft={handleSelectAirplane1} 
          />

        <AircraftSelect 
        label = "Select Airplane 2"
        onSelectAircraft={handleSelectAirplane2} 
          />
          
        <button className = "Compare" onClick={handleCompareClick}>
          Compare Planes &#129034;
          </button>
      </div>

      {/* Conditionally render the ComparisonView here based on whether
          both airplanes have been selected and potentially a "showComparison" state */}
      {/* {airplane1 && airplane2 && <ComparisonView airplane1={airplane1} airplane2={airplane2} />} */}

      
    </div>
  )
}

export default App
