import React from 'react';
import '../App.css';
import { Stack } from 'react-bootstrap/';
import './Home.css';




function Home() {
  return (
    <>
      <div className="video-container">
        <video src='/aboutimg/video-2.mp4' autoPlay loop muted/>
      </div>
      <div className="content-container">
        <Stack direction="horizontal" gap={3}>
          <div className="content-right">
            <h2 className="home-H2-2">Welcome to Pinpoint:</h2>
            <p className="home-p-tags-2">Pinpoint is a 3D globe app that provides users with an immersive and interactive experience to discover interesting information about various cities across the globe. With our easy-to-use platform, you can explore and learn about cities, their culture, history, and events from the comfort of your own home.Our platform offers a user-friendly interface that provides access to a plethora of information about each city. Each city has its own pin on the globe, and when you click on it, you can explore interesting facts, images, and other noteworthy information about that city. Whether you are planning a trip to a new city or just want to expand your knowledge, Pinpoint is the perfect platform for you.</p>
          </div>
        </Stack>
          <div className="content-left">
            <h2 className="home-H2">Logging in..</h2>
            <p className="home-p-tags">To use the site, you will need to log in as user authentication is required to access the features of the site. At Pinpoint, we prioritize the privacy and security of our users and use Auth0 for user authentication to ensure that your information remains safe with us. To start exploring cities with Pinpoint and access all of the site's features, please sign up and log in.</p>
          </div>
      </div>
    </>
  );
}

export default Home;
