import Tilt from 'react-parallax-tilt';
import './logo.styles.css';
import brain from './brain.png';

const Logo = () => {
    return(
        <div className='ml4 mt0'>
            <Tilt className="Tilt br2 shadow-2" style={{height: '100px', width: '100px'}}>
                <div className='Tilt-inner pa3' >
                <img  src={brain} alt='logo'/>
                </div>
            </Tilt>

        </div>

    );
}


export default Logo;