import React, {useContext, useEffect} from 'react'
import {View, StyleSheet} from 'react-native'

import {Context as AuthContext} from '../context/AuthContext'
import AuthForm from '../components/authForm'
import NavLink from '../components/NavLink'
import {SafeAreaView} from 'react-native-safe-area-context'

function SignUpScreen({navigation}) {
  const {state, signup, clearErrorMessage, tryLocalSignIn} = useContext(AuthContext)
  const {loading, setLoading} = React.useState(true)
  useEffect(() => {
    tryLocalSignIn()
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
          onSubmit={signup}
          submitButtonText={'Sign up'}
          headerText={'Sign up for tracker'}
        />
        <NavLink text='Sign in' routeName={'signIn'} />
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 150
  },
  link: {
    color: 'blue'
  }
})

export default SignUpScreen
