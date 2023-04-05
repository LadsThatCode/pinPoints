
import React, { useState, useRef, } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Html } from "@react-three/drei";
import * as THREE from "three";
import './Earth.css'
import EarthDayMap from "../../assets/textures/8k_earth_daymap.jpg";
import EarthNormalMap from "../../assets/textures/8k_earth_normal_map.jpg";
import EarthSpecularMap from "../../assets/textures/8k_earth_specular_map.jpg";
import EarthCloudsMap from "../../assets/textures/8k_earth_clouds.jpg";
import { TextureLoader } from "three";
import axios from 'axios';
import SearchBar from './SearchBar';


export function Earth(props) {
  //! image loading 
  const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(
    TextureLoader,
    [EarthDayMap, EarthNormalMap, EarthSpecularMap, EarthCloudsMap]
  );

  const meshRef = useRef();
  const earthRef = useRef();
  const cloudsRef = useRef();
  const [locations, setLocations] = useState([

    { name: "Tampa Florida", latitude: 27.9506, longitude: -82.4572 },
    // { name: "California", latitude: 36.7783, longitude: -119.4179 },
    { name: "Yuma Arizona", latitude: 32.6927, longitude: -114.6277 },
    { name: "Seattle Washington", latitude: 47.6062, longitude: -122.3321 },
    { name: "Denver Colorado", latitude: 39.7392, longitude: -104.9903 },
    { name: "New York City", latitude: 40.7128, longitude: -74.0060 },
    { name: "San Diego", latitude: 32.7157, longitude: -117.1611 },
    { name: "LA", latitude: 34.0522, longitude: -118.2437 },
    // Add more locations here

  ])

  const postLocation = async (LocationObj) => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/search`

      let newLocation = await axios.post(url, LocationObj);

      setLocations([...locations, newLocation.data])

    } catch (error) {
      console.log(error.message)
    }
  }



  const getLocation = async () => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/search`
      let locationData = await axios.get(url)
      console.log(locationData)
      setLocations(locationData.data)
    }
    catch (error) {
      console.log(error.response)
    }
  }

   const deleteLocation = async (id) => {
      try {
        let url = `${process.env.REACT_APP_SERVER}/search/${id}`

        await axios.delete(url);

        let updatedSearch = setLocations().filter(location => location._id !== id);
        setLocations(updatedSearch)
      }

      catch (error) {
        console.log(error.response)
      }
    }



    //!! ONCLICK FOR PINPOINTS
    const [selectedLocation, setSelectedLocation] = useState(null);

    const handleMeshClick = (location) => {
      setSelectedLocation(location);
    };
    console.log(selectedLocation)


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

      earthRef.current.rotation.y = elapsedTime / 95.5;
      cloudsRef.current.rotation.y = elapsedTime / 67.5;
    });
    return (
      <>
        [//! handles search bar]
        <Html>
          <div id='SearchBar'>
        <SearchBar  onSearch={postLocation}/>
        </div>
        </Html>
        [//! Rotational AMBIET LIGHTING AND STARS]
        <ambientLight intensity={.5} />
        <pointLight color="#f6f3ea" position={[10, 10, 0]} intensity={2.2} />
        <Stars
          radius={300}
          depth={60}
          count={35000}
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
              onClick={() => handleMeshClick(location)}
            >
              <sphereGeometry args={[0.009, 30, 30]} />
              <meshBasicMaterial
                attach="material"
                color="red"
                opacity={.7}
                transparent
              />
            </mesh>
          ))}
          {selectedLocation && (
            <Html>

              <section id="locationContainer">
                <div id="locationInfo">
                  <h3 id="pinName">{selectedLocation.name}</h3>
                  <p>Hello this is so cool wow!</p>
                  <p>this is the third p tag!</p>
                  <p>and this is the Fourth!</p>
                  <p>just testing what tons of data would look like. how about we try some lipsum kdsjhbvkjhberdfkjgvbhndjkfnbvjkdnfvjkfdnvjdfknvdfjknvfjkdnvfdkjnvdfkjhzbjhzbhjasdasdasdasdasdasdsadasdasdasdsaddasdasddddddddddd</p>
                  <p>some words</p>
                  <p>some words</p>
                  <p>some words</p>
                  <p>some words</p>
                  <p>some words</p>
                  <p>some words</p>
                  <p>some words</p>
                  <p>some words</p>
                  <p>some words</p>

                  {/* display other location data */}
                </div>
              </section>
            </Html>
          )}
        </mesh>
      </>
    );
  }


