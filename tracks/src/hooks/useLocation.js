import React from 'react'
import {Accuracy, requestPermissionsAsync, watchPositionAsync} from 'expo-location'

export default (shouldTrack, callback) => {
  const [err, setError] = React.useState(null)

  React.useEffect(() => {
    let subscriber
    const startWatching = async () => {
      try {
        const { granted } = await requestPermissionsAsync()
        subscriber = await watchPositionAsync(
          {
            accuracy: Accuracy.BestForNavigation,
            timeInterval: 1000,
            distanceInterval: 10
          },
          callback
        )
        if (!granted) {
          throw new Error('User permission is not granted')
        }
      } catch (e) {
        setError(e)
      }
    }

    if (shouldTrack) {
      startWatching()
    } else {
      if (subscriber) {
        subscriber.remove()
      }
      subscriber = null
    }

    return () => {
      if (subscriber) {
        subscriber.remove()
      }
    }
  }, [shouldTrack, callback])

  return [err]
}