import React from 'react';
import AcademyRenderer from '../rendererComponents/AcademyRenderer';

class Academy extends React.Component{

  render(){

    return (
      
      <div className='carouselElement' id='academy'>
        Academy and Teaching Course
        <li>C++</li>
        <li>Phyton</li>
        <li>Cinema 4D</li>
        <li>3D general</li>
        <li>Unity</li>
        <li>Unreal Engine</li>
        <div className='canvas-container'>
          <AcademyRenderer />
        </div>
      </div>
    );
  }
}
export default Academy;