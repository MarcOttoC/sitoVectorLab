import React from 'react';
import './App.css';
import VrApplication from "./components/VrApplication";
import ArApplication from './components/ArApplication';
import GameDev from './components/GameDev';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Gamification from './components/Gamification';
import Academy from './components/Academy';
import AnimationRendering from './components/AnimationRendering';
import ProceduralAI from './components/ProceduralAI';
import RealTime3D from './components/RealTime3D';

interface State {
  
  index: number,
  isNext: boolean,
  dimension: {}
}

class App extends React.Component<{},State> {

  state = {
    index: 0,
    isNext: true,
    dimension: {

      width: window.innerWidth,
      height: window.innerHeight
    }
  }

  private carousel: React.ReactNode[] = [

    <VrApplication/>,
    <ArApplication/>,
    <GameDev/>,
    <Gamification/>,
    <RealTime3D/>,
    <ProceduralAI/>,
    <AnimationRendering/>,
    //<Academy/>
   
  ];

  handleResize = ():void => {

    this.setState({

      dimension: {

        width: window.innerWidth,
        height: window.innerHeight
      }
    })
  }

  nextPage = ():void => {

    if (this.state.index === (this.carousel.length - 1)) {
      
      this.setState({

        index: 0,
        isNext: true
      })
    } else {

      this.setState({

        index: this.state.index + 1,
        isNext: true
      })
      console.log(this.state.dimension)
    }

  }

  previousPage = ():void => {

    if (this.state.index === 0) {
      
      this.setState({

        index: (this.carousel.length - 1),
        isNext: false
      })
    } else {

      this.setState({

        index: this.state.index - 1,
        isNext: false
      })
    }
  }


  componentDidUpdate(prevState: Readonly<State>): void {
    
    if (JSON.stringify(prevState.dimension) === JSON.stringify(this.state.dimension)) 

      return
    
    this.handleResize();
    console.log("funziona=")   
  }

  render(){


    return (

      <div className='container'>
        <button className='buttonLeft' onClick={this.previousPage}>&#10094;</button>
        <TransitionGroup childFactory={child => React.cloneElement(child, { classNames: this.state.isNext ? "right-to-left" : "left-to-right", timeout: 1000 })}>
          <CSSTransition key={this.state.index} classNames="right-to-left" timeout={1000}>
            {this.carousel[this.state.index]}
          </CSSTransition>
        </TransitionGroup>
        <button className='buttonRight' onClick={this.nextPage}>&#10095;</button>
      </div>
    );
  }
}
export default App;