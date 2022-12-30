import { Component } from 'react';
import ParticlesBg from 'particles-bg';
import Clarifai from  'clarifai';
import Sigin from './componets/sigin/signin.component';
import Register from './componets/register/register.component';
import Navigation from './componets/navigation/navigation.component';
import Logo from './componets/logo/Logo.component';
import ImageLinkForm from './componets/imagelink/imageLink.component';
import Rank from './componets/rank/rank.component';
import FaceTracker from './componets/faceTracker/faceTacker.component';

import './App.css';

const app = new Clarifai.App({
  apiKey: 'your api keys'
});

class App extends Component {
  constructor(){
    super();
    this.state={
      input:'',
      imageUrl: '',
      box:{},
      route:'signin',
      isSignedIn:false
    }
  }

  calculateFaceLocation= (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);

    return{
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)

    } 
  }

  displayBoundigBox = (box)=> {
    
    this.setState({box:box});
  }
  onInputChange=(event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});

    app.models
      .predict( Clarifai.FACE_DETECT_MODEL,
        this.state.input)
      .then(res => (this.displayBoundigBox(this.calculateFaceLocation(res))))    
      .catch(err => console.log(err));
    }
    onRouteChange =(route) =>{
      if(route ==='signout'){
        this.setState({isSignedIn: false})
      }else if(route === 'home'){
        this.setState({isSignedIn: true})
      }
      this.setState({route: route});
    }
    render(){ 
      const {isSignedIn, imageUrl, route,box } = this.state;
      return (
        <div className="App">
            
          <ParticlesBg type="lines" bg={true} />
          
          <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
          <Logo/>
        
        
          { 
              route ==='home'
                ?
                  <diV>
                    <Rank/>
                    <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/> 
                    <FaceTracker box={box} imageUrl= {imageUrl}/>
                  </diV> 
                :
                (
                  this.state.route==='signin'
                  ? <Sigin onRouteChange={this.onRouteChange}/>
                  :<Register onRouteChange={this.onInputChange}/>
                )
            }

      
        
          
        </div>
      );
  }
  }
  





export default App;
