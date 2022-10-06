import React, {cloneElement, useEffect, useState} from 'react';
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

function AppFunction() {
  let [index, setIndex] = useState(0);
  let [isNext, setIsNext] = useState(true);
  //const [touchStart, setTouchStart] = useState(0);
  //const [touchEnd, setTouchEnd] = useState(0);
  const [dimensions, setDimensions] = useState({

    height: window.innerHeight,
    width: window.innerWidth
  })

  const carousel: React.ReactNode[] = [

    <VrApplication />,
    <ArApplication/>,
    <GameDev/>,
    <Gamification/>,
    <RealTime3D/>,
    <ProceduralAI/>,
    <AnimationRendering/>,
    <Academy width={dimensions.width} height={dimensions.height}/>
    
  ];

  const onChange = (i:number):void => {
    if (i === 0) {

      index === 0 ? setIndex(index = (carousel.length - 1)) : setIndex(index - 1);
      setIsNext(isNext = false);
    } else {

      index === (carousel.length - 1) ? setIndex(index = 0) : setIndex(index + 1)
      setIsNext(isNext = true);
    }
  }

  useEffect(() => {
    function handleResize() {
      setDimensions({

        height: window.innerHeight,
        width: window.innerWidth
      });
      console.log(dimensions.height, dimensions.width);
    }

    /*function handleTouchStart(e:TouchEvent) {

      setTouchStart(e.targetTouches[0].clientX);
      console.log(e.targetTouches[0].clientX)
    }

    
    function handleTouchMove(e:TouchEvent) {

      setTouchEnd(e.targetTouches[0].clientX);
    }

    const handleTouchEnd = () => {

      if (touchStart < touchEnd && Math.abs(touchStart - touchEnd) > 40) {
        
        index === 0 ? setIndex(index = (carousel.length - 1)) : setIndex(index - 1);
        setIsNext(isNext = false);
        console.log(index)
      }

    }

    window.addEventListener('touchstart', handleTouchStart);
 
    window.addEventListener('touchmove', handleTouchMove);

    window.addEventListener('touchend', handleTouchEnd);*/

    window.addEventListener('resize', handleResize);
    return () => {

      window.removeEventListener('resize', handleResize);  
    }

  })

  return(
      
    <div className='container'>
      <button className='buttonLeft' onClick={() => onChange(0)}>&#10094;</button>
      <TransitionGroup childFactory={child => cloneElement(child, { classNames: isNext ? "right-to-left" : "left-to-right", timeout: 1000 })}>
        <CSSTransition key={index} classNames="right-to-left" timeout={1000}>
          {carousel[index]}
        </CSSTransition>
      </TransitionGroup>
      <button className='buttonRight' onClick={() => onChange(1)}>&#10095;</button>
    </div>
  );
}

export default AppFunction;

