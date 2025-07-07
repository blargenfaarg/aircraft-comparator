import './AppBar.css';

import githubIcon from './assets/site-logo/github-brands-solid.svg'; 
import linkedinIcon from './assets/site-logo/linkedin-brands.svg'; 

function AppBar() {

    return (
        <div className ="icon-bar">
            <a href = "https://github.com/blargenfaarg/aircraft-comparator" target="_blank" rel="noopener noreferrer">
                <img src={githubIcon} alt="GitHub" className="social-icon" />
            </a>

            <a href = "https://www.linkedin.com/in/gerardo-cano-5018231b8/" target="_blank" rel="noopener noreferrer">
                <img src={linkedinIcon} alt="LinkedIn" className="social-icon" />
            </a>
        </div>
    )
}

export default AppBar;