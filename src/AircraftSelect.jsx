import { useState, useEffect } from 'react';
import aircraftData from './data/aircraft.json'
import './AircraftSelect.css';

function AircraftSelect({ label, onSelectAircraft }) {
  const [selectedAircraftId, setSelectedAircraftId] = useState('');
  const [aircraftList, setAircraftList] = useState([]);

  useEffect(() => {
    const sortedAircraftList = [...aircraftData].sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
    setAircraftList(sortedAircraftList);
  }, []);

  const handleSelectChange = (event) => {
    const selectedId = event.target.value;
    setSelectedAircraftId(selectedId);

    const selectedAircraft = aircraftList.find(aircraft => aircraft.id === selectedId);

    if (onSelectAircraft) {
      onSelectAircraft(selectedAircraft);
    }
  };

  return (
    <div className="aircraft-select-container">
      <label>{label}</label>
      <select
        value={selectedAircraftId}
        onChange={handleSelectChange}
        className="aircraft-dropdown"
      >
        <option>Select an Aircraft</option>
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