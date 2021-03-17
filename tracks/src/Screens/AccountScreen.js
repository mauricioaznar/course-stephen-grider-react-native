import React, {useContext} from 'react'
import {View, StyleSheet, Text} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {Button} from 'react-native-elements'
import {Context as AuthContext} from '../context/AuthContext'

function AccountScreen(props) {
  const {state, signout} = useContext(AuthContext)

  return (
    <SafeAreaView>
      <Text style={{ fontSize: 48}} >
        Account Screen
      </Text>
      <Button title={'Sign Out'} onPress={() => {signout()}}/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})

export default AccountScreen
