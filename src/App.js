import React, { Component } from 'react';
import './App.css';
import {Header, Icon, Transition} from 'semantic-ui-react';

class App extends Component {

  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }
  
  state = {
    active: true,
    time: 0
  }

  pauseTimes = [6.8, 14.3, 20.9]

  componentDidMount() {
    const video = this.videoRef.current;

    //To avoid interruption error on refresh you need catch.
    video.play().catch(() => {
      this.setState({active:false})}
    );

    setInterval(() => {
      const current = video.currentTime;
      this.setState({time: Math.round(current * 100) / 100}, () => {
        if(current>=this.pauseTimes[0])
          {
            this.pauseTimes.shift()
            video.pause();
            this.setState({
              active: false
            })
          }
      })}, 20);
  }

  play = () => {
    const video = this.videoRef.current;
    video.play();
    this.setState({ active: true })
  }

  pause = (video) => {
    video.pause();
  }

  render() {
    const {active, time} = this.state;

    return (
      <div className="App">
        <div style={{marginTop: '5em'}}>
          <Header as='h1' content='Test Version of the reading application'/>
          <div className="container">
              <Transition visible={!active} animation='fade left' duration={500}>    
                  <div className="right-container" onClick={this.play}> 
                    <div className='right-button'>
                      <Icon name='chevron right' size='big' inverted/>
                    </div>  
                  </div>         
              </Transition>    
              <video className="video" id="player" src="/videos/test.mp4" ref={this.videoRef} type="video/mp4">Your browser does not support this streaming content.</video>
          </div>
        </div>
        <Header as='h2' content={'Current Time: ' + time}/>
        <Header as='h2' content={'Times to stop: ' + this.pauseTimes}/>
        <Header as='h2' content={'Video playing: ' + active}/>
      </div>
    );
  }
}

export default App;
