import * as Location from 'expo-location'

const tenMetersWithDegrees = 0.0001

const getLocation = increment => {
  return {
    timestamp: 10000000,
    cords: {
      speed: 0,
      heading: 0,
      accuracy: 0,
      altitudeAccuracy: 5,
      altitude: 5,
      longitude: -89.592583 + increment * tenMetersWithDegrees,
      latitude: 20.967369 + increment * tenMetersWithDegrees
    }
  }
}

let counter = 0

setInterval(() => {
  Location.EventEmitter.emit('Expo.locationChanged', {
    watchId: Location._getCurrentWatchId(),
    location: getLocation(counter)
  })
  counter++
}, 100)