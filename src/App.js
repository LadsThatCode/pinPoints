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
import Header from "./Components/Header";
import About from "./About.js";
import Home from './Components/Home';





const CanvasContainer = styled.div`
  width: 100;
  height: 93svh;
`;

class App extends React.Component {
  render() {
    return (
      <Router>
        <Header />


        <Routes>
          <Route exact path="/about" element={<About />} />
          <Route
            exact path="/"
            element={<Home />}>
          </Route>
          <Route
            exact path="/search"
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