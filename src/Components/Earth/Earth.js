
import React, { useState, useRef, useEffect } from "react";
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
import { useAuth0 } from '@auth0/auth0-react';
import Button from '@mui/material/Button'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import '../Header.js'

import LocationForm from './LocationForm.js'



export function Earth(props) {
  //! image loading 
  const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(
    TextureLoader,
    [EarthDayMap, EarthNormalMap, EarthSpecularMap, EarthCloudsMap]
  );

  const meshRef = useRef();
  const earthRef = useRef();
  const cloudsRef = useRef();
  const [showModal, setShowModal] = useState(false);
  const { isAuthenticated, getIdTokenClaims } = useAuth0();
  const [selectedLocation, setSelectedLocation] = useState(null);

  const [locations, setLocations] = useState([

    { city: "Tampa Florida", lat: 27.9506, lng: -82.4572 },
    { city: "Yuma Arizona", lat: 32.6927, lng: -114.6277 },
    { city: "Seattle Washington", lat: 47.6062, lng: -122.3321 },
    { city: "Denver Colorado", lat: 39.7392, lng: -104.9903 },
    { city: "New York City", lat: 40.7128, lng: -74.0060 },
    {
      city: "San Diego", lat: 32.7157, lng: -117.1611
    },
    { city: "LA", lat: 34.0522, lng: -118.2437 },
    // Add more locations here

  ])
  console.log(locations);


  const handleOpenModal = (event) => {
    setShowModal(true);
  }

  const handleCloseModal = (event) => {
    setShowModal(false)
  }



  useEffect(() => {
    const fetchData = async () => {
      if (isAuthenticated) {
        const res = await getIdTokenClaims();
        const jwt = res.__raw;
        // console.log('token: ', jwt);

        const config = {
          headers: { "Authorization": `Bearer ${jwt}` },
          method: 'get',
          baseURL: process.env.REACT_APP_SERVER,
          url: '/my-cities'
        };

        try {
          const response = await axios(config);
          // console.log(response.data);
          setLocations(response.data);

        } catch (error) {
          console.error(error);
        }
      }
    }
    fetchData();
  }, [isAuthenticated, getIdTokenClaims]);



  const getNewLocation = async (searchObj) => {
    // console.log(`I am the search Obj ${searchObj}`)
    if (isAuthenticated) {
      const res = await getIdTokenClaims();
      const jwt = res.__raw;
      console.log('token: ', jwt);

      const config = {
        headers: { "Authorization": `Bearer ${jwt}` },
        method: 'get',
        baseURL: process.env.REACT_APP_SERVER,
        url: `/search?city=${searchObj}`,
      };

      try {
        const response = await axios(config);
        console.log(response.data);
        setLocations([...locations, response.data]);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const updateLocation = async (locationObjToUpdate) => {
    try {
      const token = await getIdTokenClaims();

      const url = `${process.env.REACT_APP_SERVER}/search/${locationObjToUpdate._id}`

      const config = {
        headers: { 'Authorization': `Bearer ${token}` },
        method: 'put',
        url: url,
        data: locationObjToUpdate
      }

      const updatedLocation = await axios(config);

      const updatedLocationArray = locations.map(existingLocation => {
        return existingLocation._id === locationObjToUpdate._id ? updatedLocation.data : existingLocation;
      });

      setLocations(updatedLocationArray);
    } catch (error) {
      console.log(error.message)
    }
  };

  const postLocation = async (locationObj) => {
    console.log(locationObj)
    try {
      const token = await getIdTokenClaims();
      // console.log(token)
      const url = `${process.env.REACT_APP_SERVER}/search?city=${locationObj.city}`;
      // console.log(url)
      const config = {
        headers: { "Authorization": `Bearer ${token}` },
        method: 'get',
        // data: locationObj,
        url: url
      };
      const createdLocation = await axios(config);
      // console.log(config)
      setSelectedLocation([...locations, createdLocation.data]);
    } catch (error) {
      console.log(error.message)
    }
  }





  const deleteLocation = async (id) => {
    try {
      const token = await getIdTokenClaims();

      const url = `${process.env.REACT_APP_SERVER}/search/${id}`;
      const config = {
        headers: { "Authorization": `Bearer ${token}` },
        method: 'delete',
        url: url
      };

      await axios(config);

      const updatedSearch = locations.filter(location => location._id !== id);
      setLocations(updatedSearch);

    } catch (error) {
      console.log(error.response);
    }
  };



  const handleClick = () => {
    let div = document.getElementById('locationContainer')
    div.style.opacity = '0';
  }


  //!! ONCLICK FOR PINPOINTS

  const handleMeshClick = (location) => {
    setSelectedLocation(location);
  };
  // console.log(selectedLocation)


  //! dynamically aquires sphere cordinates based on lat and negitive lon

  function getCoordinates(latitude, longitude, radius) {
    const phi = (90 - latitude) * Math.PI / 180;
    const theta = (longitude + 180) * Math.PI / 180;
    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);
    return [x, y, z];
  }

  // const getPlacesOfIntrest = selectedLocation.places_of_interest.map(placeOfintrest => {
  //   return (
  //     <div key={placeOfintrest.city}>
  //       <h2>{placeOfintrest.city}</h2>
  //       <p>{placeOfintrest.address}</p>
  //       <p>Rating: {placeOfintrest.rating}</p>
  //       </div>
  //       )
  // })


  //! ROTATION FOR EARTH AND CLOUDS
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();

    earthRef.current.rotation.y = elapsedTime / 95.5;
    cloudsRef.current.rotation.y = elapsedTime / 67.5;
  });
  return (
    <>
      <Html>

        <SearchBar id='searchBar' onSearch={getNewLocation} />

      </Html>
      <Html>
        {showModal ? <LocationForm
          showModal={setShowModal}
          updateLocation={updateLocation}
          handleCloseModal={handleCloseModal}
          postLocation={postLocation}
        /> : null}
      </Html>

      [//! handles search bar]
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
            key={location._id}
            position={getCoordinates(location.lat, location.lng, 1)}
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

            <section opacity='100' id="locationContainer" key={selectedLocation.name}>
              <div id="locationInfo">

                <h3 id="pinName">
                  <div id="divCloseButton" onClick={handleClick}>X</div>
                  {selectedLocation.formatted_address}
                </h3>
                {selectedLocation.places_of_interest.map(place =>
                  <div id="interestContainer">
                    <div id='headerContainer'>
                      <h4>{place.name}</h4>
                      <p>Rating: {place.rating}</p>
                      <p>Address: {place.address}</p>
                    </div>
                    <img id="interestImg" src={place.photo_url} alt={place.name} />
                    <h5>Description</h5>
                    <p>{place.description}</p>
                  </div>
                )}



                {<Button onClick={handleOpenModal}>Add New Location</Button>}
                {<Button onClick={handleOpenModal}>Update location</Button>}
                <Button onClick={() => { deleteLocation(selectedLocation._id) }}>Delete</Button>

                {/* display other location data */}
              </div>
            </section>
          </Html>
        )}
      </mesh>
    </>
  );
}


