import { useState, useEffect } from 'react';
import aircraftData from './data/aircraft.json'
import './AircraftSelect.css';

function AircraftSelect({ label, onSelectAircraft, initialSelectedAircraft, disabledAircraftIds = [] }) {
  const [selectedAircraftId, setSelectedAircraftId] = useState(initialSelectedAircraft?.id || '');
  const [groupedAircraft, setGroupedAircraft] = useState([]);

  useEffect(() => {
    const sortedFlatList = [...aircraftData].sort((a, b) => a.name.localeCompare(b.name));
    
    const aircraftByManufacturer = sortedFlatList.reduce((acc, aircraft) => {
      const manufacturer = aircraft.manufacturer || 'Other';
      if (!acc[manufacturer]) {
        acc[manufacturer] = [];
      }
      acc[manufacturer].push(aircraft);
      return acc;
    }, {});

  const finalGroupedList = Object.keys(aircraftByManufacturer)
    .sort()
    .map(manufacturerName => ({
      name: manufacturerName,
      aircraft: aircraftByManufacturer[manufacturerName]
    }));

    setGroupedAircraft(finalGroupedList);
  }, []);

  useEffect(() => {
    setSelectedAircraftId(initialSelectedAircraft?.id || '');
  }, [initialSelectedAircraft]);

  const handleSelectChange = (event) => {
    const selectedId = event.target.value;
    const aircraft = aircraftData.find(a => a.id === selectedId);
    setSelectedAircraftId(selectedId);

    if (onSelectAircraft) {
      onSelectAircraft(aircraft);
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
        {groupedAircraft.map(group => (
          <optgroup key = {group.name} label = {group.name}>
            {group.aircraft.map(aircraft => (
              <option 
                key = {aircraft.id}
                value = {aircraft.id}
                disabled = {disabledAircraftIds.includes(aircraft.id)}
              >
                {aircraft.name}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </div>
  );
}

export default AircraftSelect;