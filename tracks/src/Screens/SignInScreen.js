import React, {useContext, useEffect} from 'react'
import {View, StyleSheet, Text, Button} from 'react-native'
import AuthForm from '../components/authForm'
import NavLink from '../components/NavLink'
import {SafeAreaView} from 'react-native-safe-area-context'

import {Context as AuthContext} from '../context/AuthContext'


function SignInScreen({navigation}) {
  const {state, signin, clearErrorMessage} = useContext(AuthContext)

  useEffect(() => {
    const listener = navigation.addListener('focus', () => {
      clearErrorMessage()
    })
    return () => {
      listener()
    }
  }, [])

  return (
      <View style={styles.container}>
        <AuthForm
          errorMessage={state.errorMessage}
          onSubmit={signin}
          submitButtonText={'Sign in'}
          headerText={'Sign in for tracker'}
        />
        <NavLink text='Sign up' routeName={'signUp'} />
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 150
  }
})

export default SignInScreen
