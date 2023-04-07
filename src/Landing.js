import React from 'react';
import './App.css';
import { Button } from './Components/Button';
import './Landing.css';
import './Components/Button.css'



function LandingSection(){
  return (
    <div className='landing-container'>
      
      <h1>Find your next destination</h1>
      <p>Try Pinpoints NOW</p>
      <div className='landing-btns'>
        <Button className='btns' buttonStyle='btn--outline'
        buttonSize='btn--large'></Button>
      </div>
    </div>
  )
}

export default LandingSection;


// import React from "react";
// import {Stack} from 'react-bootstrap/';
// // import Container from 'react-bootstrap/Container';


// class Landing extends React.Component {
//   render() {
//     return (
//       <>


//           <div className="circle"/>/
//         <div className="container">/
//         <Stack direction="horizontal" gap={3}>
//         {/* <Container> */}
//           <div className="content-left">

//             <h2 className="landingpageH2">Logging in..</h2>
//           <Login id="login"/>
//             <p className="landingpagePtags">You may choose to login or continue without logging in, the choice is yours. At Pinpoint, we understand that your privacy and security are of utmost importance, which is why we use Auth0 for user authentication. Your information is always safe with us. Are you ready to start your journey? Sign up now and start exploring cities with Pinpoint.</p>
//           <Logout id="logout" />
//           </div>
//           <div className="content-right">

//             <h2 className="landingpageH2">Welcome to Pinpoint</h2>
//             <p className="landingpagePtags">Pinpoint is a 3D globe app that provides users with an immersive and interactive experience to discover interesting information about various cities across the globe. With our easy-to-use platform, you can explore and learn about cities, their culture, history, and events from the comfort of your own home.Our platform offers a user-friendly interface that provides access to a plethora of information about each city. Each city has its own pin on the globe, and when you click on it, you can explore interesting facts, images, and other noteworthy information about that city. Whether you are planning a trip to a new city or just want to expand your knowledge, Pinpoint is the perfect platform for you.</p>
//           </div>

//       {/* <div className="containerpinpoint"/> */}
//         {/* </Container> */}
//         </Stack>
//         </div>
//           {/* </div> */}
//           {/* </div> */}
        
//       </>
//     )
//   }
// };

// export default Landing;