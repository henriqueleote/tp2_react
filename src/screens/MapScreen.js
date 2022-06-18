import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import MapView, { Marker, Polygon, Polyline, PROVIDER_GOOGLE, Callout } from 'react-native-maps';
import openMap from 'react-native-open-maps';


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
              firestore().collection('map-buildings').onSnapshot(snapshotDoc => {
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

  const oi = async () => {
    
  }
 
  return (
    <View
      style={styles.container}>
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
            console.log(pin.images[0]);
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
                <Callout tooltip
                onPress={() => openMap({ latitude: pin.location._latitude, longitude: pin.location._longitude, query: pin.buildingName, travelType: 'walk' })}>
                  <View>
                    <View style={styles.box}>
                      <Text style={styles.boxName}>{pin.buildingName}</Text>
                      <Text style={styles.boxDescription}>{pin.buildingDescription}</Text>
                    </View>
                  </View>
                </Callout>
          </Marker>
          );
          })
      }
      </MapView> 
    </View>
    );   
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  // markerPanel
  box: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 6,
    borderColor: 'white',
    borderWidth: 0.5,
    padding: 15,
    width: 200,
    height: 'auto'
  },
  boxName: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'center',
    color: 'black'
  },
  boxDescription: {
    fontSize: 13,
    marginBottom: 5,
    textAlign: 'center',
    color: 'black'
  },
  boxButtons: {
    width: 50,
    height: 50
  },
  pubImage: {
        width: 40,
        height: 40,
        borderRadius: 50,
        marginLeft: 10,
        marginTop: 10
    }
});

export default MapScreen;