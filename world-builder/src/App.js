import "./App.css";
import styled from "styled-components";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Earth } from "./Components/Earth/index.js";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

const CanvasContainer = styled.div`
  // width: 100;
  height: 100svh;
`;

function App() {
  return (

    <Router>

      <Routes>
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
        <Route

        >

        </Route>
      </Routes>

    </Router>

  );
}

export default App;