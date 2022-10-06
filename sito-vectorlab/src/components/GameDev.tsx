import React from 'react';
import GameDevRenderer from '../rendererComponents/GameDevRenderer';

class GameDev extends React.Component{


  render(){

    return (
      
      <div className='carouselElement' id='gameDev'>
        Game Development
        <GameDevRenderer/>
      </div>
    );
  }
}
export default GameDev;