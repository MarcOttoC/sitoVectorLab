import React from 'react';
import RealTimeRenderer from '../rendererComponents/RealTimeRenderer';



class RealTime3D extends React.Component{


  render(){

    return (
      
      <div className='carouselElement' id='realTime3D'>
        Real Time 3D Application
        <RealTimeRenderer />
      </div>
    );
  }
}
export default RealTime3D;