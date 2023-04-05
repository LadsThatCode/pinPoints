import "./App.css";
import styled from "styled-components";
import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import { Earth } from "./Components/Earth/Earth.js";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Landing from "./Landing.js";
import Header from "./Components/Earth/Header";

import Profile from "./Components/Earth/Profile";



const CanvasContainer = styled.div`
  // 
  position: absolute;
  top: 0;
  left:0;
  width: 206vh;
  height: 100svh;
`;

class App extends React.Component {
  render() {
    return (
      <Router>
        <Header />
 
        <Profile />
        <Routes>
          <Route
            exact path="/"
            element={<Landing />}>
          </Route>
          <Route
            exact path="/planet"
            element={<CanvasContainer>
              <Canvas>
                <Suspense fallback={null}>
                  <Earth />
                </Suspense>
              </Canvas>
            </CanvasContainer>}
          >
          </Route>
        </Routes>
      </Router>
    )
  }
}

export default App;