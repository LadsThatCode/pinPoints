
import React, { useState, useRef, useEffect } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";


import EarthDayMap from "../../assets/textures/8k_earth_daymap.jpg";
import EarthNormalMap from "../../assets/textures/8k_earth_normal_map.jpg";
import EarthSpecularMap from "../../assets/textures/8k_earth_specular_map.jpg";
import EarthCloudsMap from "../../assets/textures/8k_earth_clouds.jpg";
import { TextureLoader } from "three";

//! image loading 
export function Earth(props) {
  const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(
    TextureLoader,
    [EarthDayMap, EarthNormalMap, EarthSpecularMap, EarthCloudsMap]
  );

  const meshRef = useRef();
  const earthRef = useRef();
  const cloudsRef = useRef();

  
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef(null);
  
  //!! ONCLICK FOR PINPOINTS/ToolTips (tool tips not functional)
  const handleClick = () => {
    setShowTooltip(!showTooltip);
    console.log('Sphere clicked!');
  };


  const handleOutsideClick = (event) => {
    if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
      setShowTooltip(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);


//! location list

  const locations = [
    { name: "tampa_Fl", latitude: 27.9506, longitude: -82.4572 },
    { name: "california_Us", latitude: 36.7783, longitude: -119.4179 },
    { name: "yuma_Az", latitude: 32.6927, longitude: -114.6277 },
    { name: "seattle_Wa", latitude: 47.6062, longitude: -122.3321 },
    { name: "denver_Co", latitude: 39.7392, longitude: -104.9903 },
    { name: "newYorkCity_Ny", latitude: 40.7128, longitude: -74.0060 },
    // Add more locations here
  ];

  //! dynamically aquires sphere cordinates based on lat and negitive lon

  function getCoordinates(latitude, longitude, radius) {
    const phi = (90 - latitude) * Math.PI / 180;
    const theta = (longitude + 180) * Math.PI / 180;
    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);
    return [x, y, z];
  }

  
  
  //! ROTATION FOR EARTH AND CLOUDS
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();

    earthRef.current.rotation.y = elapsedTime / 85.5;
    cloudsRef.current.rotation.y = elapsedTime / 57.5;
  });
  return (
    <>


      [//! Rotational AMBIET LIGHTING]
      <ambientLight intensity={.5} />
      <pointLight color="#f6f3ea" position={[10, 10, 0]} intensity={2.2} />
      <Stars
        radius={300}
        depth={60}
        count={20000}
        factor={7}
        saturation={0}
        fade={true}
      />

      [//! cloud mesh ]

      <mesh ref={cloudsRef} position={[0, 0, 0]}>
        <sphereGeometry args={[1.005, 1150, 1150]} />
        <meshPhongMaterial
          map={cloudsMap}
          opacity={0.4}
          depthWrite={true}
          transparent={true}
          side={THREE.DoubleSide}
        />
      </mesh>

      [//! Sphere mesh]

      <mesh ref={earthRef} position={[0, 0, 0]}>
        <sphereGeometry args={[1, 1150, 1150]} />
        <meshPhongMaterial specularMap={specularMap} />
        <meshStandardMaterial
          map={colorMap}
          normalMap={normalMap}
          metalness={0.4}
          roughness={0.7}
        />

        [//! allows for user movement of the sphere]
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          zoomSpeed={0.6}
          panSpeed={0.5}
          rotateSpeed={0.4}
        />


        [//! Pin Point Mesh]
        {locations.map(location => (
          <mesh
            key={location.name}
            position={getCoordinates(location.latitude, location.longitude, 1)}
            {...props}
            ref={meshRef}
            onClick={handleClick}
          >
            <sphereGeometry args={[0.009, 30, 30]} />
            <meshBasicMaterial
              attach="material"
              color="red"
              opacity={0.5}
              transparent
            />
          </mesh>
        ))}
      </mesh>
    </>
  );
}

