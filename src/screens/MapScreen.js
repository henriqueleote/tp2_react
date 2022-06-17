import React, {useState, useEffect, useContext} from 'react';
import { SafeAreaView } from 'react-native';

import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

const MapScreen = () => {
    return (
        // <View><Text>oi</Text></View>
      <SafeAreaView style={{flex:1}}>
        <MapView style={{flex:1}} />
      </SafeAreaView>
    );
};


export default MapScreen;