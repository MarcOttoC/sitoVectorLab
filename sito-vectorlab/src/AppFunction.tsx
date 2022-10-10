import React, {cloneElement, useEffect, useState} from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './App.css';
import VrApplication from "./components/VrApplication";
import ArApplication from './components/ArApplication';
import GameDev from './components/GameDev';
import Gamification from './components/Gamification';
import Academy from './components/Academy';
import AnimationRendering from './components/AnimationRendering';
import ProceduralAI from './components/ProceduralAI';
import RealTime3D from './components/RealTime3D';
import NavbarSite from './components/Navbar';
import Button from 'react-bootstrap/Button';

function AppFunction() {
  let [index, setIndex] = useState(0);
  let [isNext, setIsNext] = useState(true);
  const [dimensions, setDimensions] = useState({

    height: window.innerHeight,
    width: window.innerWidth
  })

  const carousel: React.ReactNode[] = [

    <VrApplication/>,   //vr
    <ArApplication/>, //ar
    <GameDev/>, //gamedev
    <Gamification/>, //gamification
    <RealTime3D/>,  //3d
    <ProceduralAI/>,//
    <AnimationRendering/>,// animation
    <Academy/>//
    
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

  const onChangeNav = (cardNumber:number):void => {

    if (cardNumber === index)

      return;
    if (cardNumber > index){

      setIsNext(isNext = true);
    } else {

      setIsNext(isNext = false);
    }

    setIndex(index = cardNumber);
  }

  useEffect(() => {
    function handleResize() {
      setDimensions({

        height: window.innerHeight,
        width: window.innerWidth
      });
      console.log(dimensions.height, dimensions.width);
    }

    window.addEventListener('resize', handleResize);
    return () => {

      window.removeEventListener('resize', handleResize);  
    }

  })

  return(
      
    <div className='containercarousel'>
      <NavbarSite fastNav={onChangeNav}/>
      <Button className='buttonLeft' variant="outline-light" onClick={() => onChange(0)}></Button>
      <TransitionGroup childFactory={child => cloneElement(child, { classNames: isNext ? "right-to-left" : "left-to-right", timeout: 1000 })}>
        <CSSTransition key={index} classNames="right-to-left" timeout={1000}>
          {carousel[index]}
        </CSSTransition>
      </TransitionGroup>
      <Button className='buttonRight' variant="outline-light" onClick={() => onChange(1)}></Button>
    </div>
  );
}

export default AppFunction;

