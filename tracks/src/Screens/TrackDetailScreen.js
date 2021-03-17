import React, {useContext} from 'react'
import { StyleSheet, Text } from 'react-native'
import { Context as TrackContext } from '../context/TrackContext'
import MapView from 'react-native-maps'

function TrackDetailScreen({navigation, route}) {
  const {state} = useContext(TrackContext)
  const _id = route.params._id
  const track = state.find(t => t._id === _id )
  const initialCoords = track.locations.length > 1 ? track.locations[0].coords : {}
  const coords = track.locations.map(loc => loc.coords)

  return (
    <>
      <Text style={{ fontSize: 48}} >
        {track.name}
      </Text>
      <MapView
        initialRegion={{
          ...initialCoords,
          longitudeDelta: 0.01,
          latitudeDelta: 0.01,
        }}
        style={styles.map}
      >
        <MapView.Polyline
          coordinates={coords}
        />
      </MapView>
    </>
  )
}

const styles = StyleSheet.create({
  map: {
    height: 300,
    width: '100%'
  }
})

export default TrackDetailScreen
