import React, {useContext} from 'react'
import {Text, StyleSheet, ActivityIndicator} from 'react-native'
import MapView from 'react-native-maps'
import {Context as LocationContext} from '../context/LocationContext'


const Map = () => {
  const {state} = useContext(LocationContext)
  const {currentLocation, locations} = state

  return (
      !!currentLocation ?
        <MapView
          style={styles.map}
          initialRegion={{
            ...currentLocation.cords,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
          }}
          region={{
            ...currentLocation.cords,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
          }}
        >
          {
            currentLocation && currentLocation.cords &&
            <MapView.Circle
              center={currentLocation.cords}
              radius={100}
              strokeColor="rgba(158,158,255, 1)"
              fillColor="rgba(158,158,255, 0.3)"
            />
          }
          {
            locations.length > 0 &&
              <MapView.Polyline
                coordinates={locations.map(loc => {
                  let cords = loc.coords || loc.cords
                  return cords
                })}
              />
          }
        </MapView>
        : <ActivityIndicator size="large" color="#000000" style={{ marginTop: 200 }}/>
  )
}

const styles = StyleSheet.create({
  map: {
    height: 300,
    width: '100%'
  }
})

export default Map