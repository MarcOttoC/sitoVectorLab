import React from 'react';
import AnimationRenderer from '../rendererComponents/AnimationRenderer';



class AnimationRendering extends React.Component{


  render(){

    return (
      
      <div className='carouselElement' id='animationRendering'>
        Rendering and Animation
        <AnimationRenderer/>
      </div>
    );
  }
}
export default AnimationRendering;