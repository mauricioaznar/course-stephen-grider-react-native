// import '../components/_mockLocation'
import React, {useContext, useCallback} from 'react'
import {StyleSheet} from 'react-native'
import {Text} from 'react-native-elements'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useIsFocused} from '@react-navigation/native'

import {Context as LocationContext} from '../context/LocationContext'
import useLocation from '../hooks/useLocation'
import Map from '../components/Map'
import TrackForm from '../components/TrackForm'

function TrackCreateScreen(props) {
  const {state, addLocation} = useContext(LocationContext)
  const isFocused = useIsFocused()
  const callback = useCallback((location) => {
    addLocation(location, state.recording)
  }, [state.recording])

  const [err] = useLocation(isFocused || state.recording, callback)

  return (
    <SafeAreaView>
      <Text h3>Creat track</Text>
      <Map />
      {err ? <Text>Please enable location services</Text> : null}
      <TrackForm />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})

export default TrackCreateScreen
