import React from "react";
import {Stack} from 'react-bootstrap/';
import Login from "./Components/Earth/Login";
import Logout from "./Components/Earth/Logout.js";



class Landing extends React.Component {
  render() {
    return (
      <>



        <div className="container">
        <Stack direction="horizontal" gap={3}>
          <div className="circle"></div>
          <div className="content-left">

            <h2 className="landingpageH2">Left Content</h2>
          <Login />
            <p className="landingpagePtags">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut urna vel mi luctus imperdiet in eu ipsum. Aenean dictum, mauris vel interdum molestie, quam mauris commodo justo, sit amet tincidunt mauris nunc et velit.</p>
          </div>
          <div className="content-right">
            <h2 className="landingpageH2">Right Content</h2>
          <Logout />
            <p className="landingpagePtags">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut urna vel mi luctus imperdiet in eu ipsum. Aenean dictum, mauris vel interdum molestie, quam mauris commodo justo, sit amet tincidunt mauris nunc et velit.</p>
          </div>

        </Stack>
        </div>
      </>
    )
  }
};

export default Landing;