import React, {useContext} from 'react'
import {Input, Button} from 'react-native-elements'
import Spacer from './Spacer'
import {Context as LocationContext} from '../context/LocationContext'
import useSaveTrack from '../hooks/useSaveTrack'

const TrackForm = () => {
  const {state, startRecording, stopRecording, changeName} = useContext(LocationContext)
  const {name, recording, locations} = state
  const [saveTrack] = useSaveTrack()

  return (
    <>
      <Spacer>
        <Input
          placeholder="Enter name"
          value={name}
          onChangeText={changeName}
        />
      </Spacer>
      <Spacer>
        {
          recording
            ? <Button
                title="Stop"
                onPress={stopRecording}
            />
            : <Button
                title="Start recording"
                onPress={startRecording}
            />
        }
      </Spacer>
      <Spacer>
        {
          !recording && locations.length
            ? <Button
                title="Save recording"
                onPress={() => {
                  saveTrack()
                }}
            />
            : null
        }
      </Spacer>
    </>
  )
}

export default TrackForm