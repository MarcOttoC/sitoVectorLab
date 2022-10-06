import React from 'react';
import ArAppRenderer from '../rendererComponents/ArAppRenderer';


class ArApplication extends React.Component{

  

  render(){

    return (
      
      <div className='carouselElement' id='AR'>
        AR Application
        <ArAppRenderer/>
      </div>
    );
  }
}
export default ArApplication;