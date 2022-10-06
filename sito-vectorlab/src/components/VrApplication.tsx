import React from 'react';
import VrAppRenderer from '../rendererComponents/VrAppRenderer';

class VrApplication extends React.Component{


  render(){

    return (
      
      <div id='VR' className='carouselElement'>
        VR Application
        <VrAppRenderer/>
      </div>
    );
  }
}
export default VrApplication;