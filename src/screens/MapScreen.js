import React, {useState, useEffect, useCallback, useMemo, useRef} from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import MapView, { Marker, Polygon, Polyline, PROVIDER_GOOGLE, Callout } from 'react-native-maps';
import BottomSheet from '@gorhom/bottom-sheet';


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
 
  return (
    <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.container}
        initialRegion={{
        latitude: 38.5920668,
          longitude: -9.0406193,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
      }}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MapScreen;