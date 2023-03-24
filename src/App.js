import { Component } from 'react';
import ParticlesBg from 'particles-bg';

import Sigin from './componets/sigin/signin.component';
import Register from './componets/register/register.component';
import Navigation from './componets/navigation/navigation.component';
import Logo from './componets/logo/Logo.component';
import ImageLinkForm from './componets/imagelink/imageLink.component';
import Rank from './componets/rank/rank.component';
import FaceTracker from './componets/faceTracker/faceTacker.component';

import './App.css';



const initialState ={
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}


class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
      this.setState({imageUrl: this.state.input});
      fetch('https://sore-cyan-penguin-robe.cyclic.app/imageurl', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('https://sore-cyan-penguin-robe.cyclic.app/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })
            .catch(console.log)

        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
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
                  <div>
                    <Rank 
                        name={this.state.user.name}
                        entries={this.state.user.entries}/>
                    <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/> 
                    <FaceTracker box={box} imageUrl= {imageUrl}/>
                  </div> 
                :
                (
                  this.state.route==='signin'
                  ? <Sigin onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
                  :<Register  onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
                )
            }

      
        
          
        </div>
      );
  }
  }
  





export default App;
