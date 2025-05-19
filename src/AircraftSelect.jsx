import React, {useState, useEffect} from 'react';
import aircraftData from './data/aircraft.json'
import './AircraftSelect.css';

function AircraftSelect({ label, onSelectAircraft }) {
    const [selectedAircraftId, setSelectedAircraftId] = useState('');
    const [aircraftList, setAircraftList] = useState([]);
  
    useEffect(() => {
      // Load data when the component mounts
      setAircraftList(aircraftData);
    }, []); 
  
    const handleSelectChange = (event) => {
      const selectedId = event.target.value;
      setSelectedAircraftId(selectedId);
  
      // Find the selected aircraft object from the list
      const selectedAircraft = aircraftList.find(aircraft => aircraft.id === selectedId);
  
      // Call the prop function to pass the selected aircraft data up to the parent component
      if (onSelectAircraft) {
        onSelectAircraft(selectedAircraft);
      }
    };
  
    return (
      <div className="aircraft-select-container">
        <label htmlFor={label.replace(/\s+/g, '-')}>{label}</label>
        <select
          id={label.replace(/\s+/g, '-')} // Use a simple ID based on the label
          value={selectedAircraftId}
          onChange={handleSelectChange}
          className="aircraft-dropdown"
        >
          <option value="">Select an Aircraft</option>
          {aircraftList.map((aircraft) => (
            <option key={aircraft.id} value={aircraft.id}>
              {aircraft.name}
            </option>
          ))}
        </select>
      </div>
    );
  }
  
  export default AircraftSelect;