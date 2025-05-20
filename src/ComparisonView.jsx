import './ComparisonView.css';
import boeing737Png from './assets/aircraft-pngs/boeing737.png';
import boeing747Png from './assets/aircraft-pngs/boeing747.png';

function ComparisonView({ airplane1, airplane2 }) {
  
  const airplane1ImageUrl = getImageUrl(airplane1.pngFileName);
  const airplane2ImageUrl = getImageUrl(airplane2.pngFileName);
  
  function getImageUrl(filename) {
    switch (filename) {
      case 'boeing737.png':
        return boeing737Png;
      case 'boeing747.png':
        return boeing747Png;
      default:
        return null;  
    }
  }

  const maxLength = Math.max(airplane1.length, airplane2.length);
  const containerWidth = 1000;

  const scaledWidth1 = (airplane1.length / maxLength) * containerWidth;
  const scaledWidth2 = (airplane2.length / maxLength) * containerWidth;

  return (

    <>
    <div className ="title-container">
      <h3>{airplane1.name} </h3> <h5>&nbsp;compared to&nbsp;</h5>  <h4> {airplane2.name} </h4>
    </div>
    <div className="comparison-container">
      <div className="aircraft-wrapper">
        <h3>{airplane1.name}</h3>
        {airplane1ImageUrl && (
          <img
            className='airplane-one'
            src={airplane1ImageUrl}
            alt={airplane1.name}
            align = "left"
            style={{ width: `${scaledWidth1}px`, height: 'auto' }}
          />
        )}
      </div>
      <div className="aircraft-wrapper">
        <h4>{airplane2.name}</h4>
        {airplane2ImageUrl && (
          <img
          className = 'airplane-two'
            src={airplane2ImageUrl}
            alt={airplane2.name}
            align = "left"
            style={{ width: `${scaledWidth2}px`, height: 'auto' }}
          />
        )}
      </div>
    </div>
    </>
  );
}

export default ComparisonView;