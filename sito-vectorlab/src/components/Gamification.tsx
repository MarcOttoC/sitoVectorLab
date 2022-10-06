import React from 'react';
import GamificationRenderer from '../rendererComponents/GamificationRenderer';

class Gamification extends React.Component{


  render(){

    return (
      
      <div className='carouselElement' id='gamification'>
        Gamification
        <GamificationRenderer />
      </div>
    );
  }
}
export default Gamification;