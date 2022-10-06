import React from 'react';
import ProceduralAIRenderer from '../rendererComponents/ProceduralAIRenderer';

class ProceduralAI extends React.Component{


  render(){

    return (
      
      <div className='carouselElement' id='proceduralAI'>
        Procedural Image Generation for Learning Model Training
        <ProceduralAIRenderer />
      </div>
    );
  }
}
export default ProceduralAI;