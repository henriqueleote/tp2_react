import React, {useState, useEffect, useContext, Component} from 'react';
import { Image } from 'react-native';


import firestore from '@react-native-firebase/firestore';
import MapView, { Marker, Polygon, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from "react-native-geolocation-service";
import logo from '../Images/fireDot.png' // relative path to image 

const MapScreen = () => {

  const [pinData, setPinData] = useState([]);
  const [zoneData, setZoneData] = useState([]);
  var pData = [];
  var zData = [];
  
    useEffect(() => {
      getPins();
      getZones();
    }, []);
  
  const getPins = async () => {
    try {
              firestore().collection('map-pins').onSnapshot(snapshotDoc => {
                snapshotDoc.forEach(documentSnapshot => {
                    pData.push(documentSnapshot.data());
                })  
                setPinData(pData);
                })
            }
            catch (error) {
                console.log(error);
            }
  };

  const getZones = async () => {
    try {
              firestore().collection('map-zones').onSnapshot(snapshotDoc => {
                snapshotDoc.forEach(documentSnapshot => {
                  zData.push(documentSnapshot.data());
                })  
                setZoneData(zData);
                })
            }
            catch (error) {
                console.log(error);
            }
  };

  const [coordinates] = React.useState([
    {
      latitude: 22.306885,
      longitude: 70.780538,
    },
    {
      latitude: 22.310696,
      longitude: 70.803152,
    },
    {
      latitude: 22.293067,
      longitude: 70.791559,
    },
     {
      latitude: 22.306885,
      longitude: 70.780538,
    },
  ]);
  
  return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
        latitude: 38.5920668,
          longitude: -9.0406193,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
      }}>
      <Polyline
		coordinates={[
			{ latitude: 37.8025259, longitude: -122.4351431 },
			{ latitude: 37.7896386, longitude: -122.421646 },
			{ latitude: 37.7665248, longitude: -122.4161628 },
			{ latitude: 37.7734153, longitude: -122.4577787 },
			{ latitude: 37.7948605, longitude: -122.4596065 },
			{ latitude: 37.8025259, longitude: -122.4351431 }
		]}
		strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
		strokeColors={[
			'#7F0000',
			'#00000000', // no color, creates a "long" gradient between the previous and next coordinate
			'#B24112',
			'#E5845C',
			'#238C23',
			'#7F0000'
		]}
		strokeWidth={6}
	/>
      {
        zoneData.map((zone) => {
          let location = [];
          zone.points.forEach(single => {
            location.push({"latitude":single._latitude, "longitude":single._longitude})
          })
          console.log(location);
          console.log(zoneData.length);
          console.log(location.length);
            return (
              <Polygon
                key={zone.zoneID}
                coordinates={location}
                strokeColor="#fc0303"
                strokeWidth={1.5}
                fillColor='rgba(242, 10, 10, 0.4)'
              />
          );
        })
      }            
      {
        pinData.map((pin) => {
          var image = "../Images/" + pin.type + "Dot.png";
          console.log(image)
            return (
              <Marker
                key={pin.buildingID}
                //image={{uri: logo}}
                coordinate={{
                  latitude: pin.location._latitude,
                  longitude: pin.location._longitude,
                }}>
                
                {pin.type == 'fire' ? <Image source={require('../Images/fireDot.png')} style={{ height: 35, width: 35 }} /> : null}
                {pin.type == 'bunker' ? <Image source={require('../Images/bunkerDot.png')} style={{ height: 35, width: 35 }} /> : null}
                {pin.type == 'earthquake' ? <Image source={require('../Images/earthquakeDot.png')} style={{ height: 35, width: 35 }} /> : null}
                {pin.type == 'war' ? <Image source={require('../Images/warDot.png')} style={{ height: 35, width: 35 }} /> : null}
                {pin.type == 'hospital' ? <Image source={require('../Images/hospitalDot.png')} style={{ height: 35, width: 35 }} /> : null}

              </Marker>
          );
          })
      }
    </MapView>
      
    );   
};

export default MapScreen;