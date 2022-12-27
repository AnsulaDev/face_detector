import Navigation from './componets/navigation/navigation.component';
import Logo from './componets/logo/Logo.component';
import ImageLinkForm from './componets/imagelink/imageLink.component';
import Rank from './componets/rank/rank.component';
import ParticlesBg from 'particles-bg'
import './App.css';

function App() {
  return (
    <div className="App">
      <>
        
        <ParticlesBg type="lines" bg={true} />
      </>
      <Navigation/>
      <Logo/>
      <Rank/>
      <ImageLinkForm/>
      
      {/* <FaceTracker/> */}
  
    </div>
  );
}

export default App;
