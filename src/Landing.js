import React from 'react';
import './App.css';
import { Button } from './Components/Button';
import './Landing.css';
import './Components/Button.css'



function LandingSection(){
  return (
    <div className='landing-container'>
      
      <h1>Find your next destination</h1>
      
      <div className='landing-btns'>

        <Button className='btns' buttonStyle='btn--medium:hover'
        buttonSize='btn--large'>Pin it!</Button>

      </div>
    </div>
  )
}
export default LandingSection;