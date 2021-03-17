import React, {useState} from 'react'
import {Text, Button, Input} from 'react-native-elements'
import {StyleSheet} from 'react-native'

import Spacer from './Spacer'

const AuthForm = ({headerText, errorMessage, onSubmit, submitButtonText}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <>
      <Spacer>
        <Text h3>
          {headerText}
        </Text>
      </Spacer>
      <Spacer>
        <Input
          autoCapitalize={'none'}
          autoCorrect={false}
          label="Email"
          value={email}
          onChangeText={(newEmail) => {
            setEmail(newEmail)
          }}
        />
      </Spacer>
      <Spacer>
        <Input
          autoCapitalize={'none'}
          autoCorrect={false}
          label="password"
          value={password}
          onChangeText={(newPassword) => {
            setPassword(newPassword)
          }}
          secureTextEntry
        />
      </Spacer>
      {
        errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null
      }
      <Spacer>
        <Button
          title={submitButtonText}
          onPress={() => {
            onSubmit({email, password})
          }}
        />
      </Spacer>
    </>
  )
}

const styles = StyleSheet.create({
  errorMessage: {
    fontSize: 16,
    color: 'red',
    marginLeft: 15,
    marginTop: 15
  },
})

export default AuthForm