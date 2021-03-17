import React, {useContext} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import { FontAwesome } from '@expo/vector-icons'

import SignInScreen from './src/Screens/SignInScreen'
import SignUpScreen from './src/Screens/SignUpScreen'
import TrackCreateScreen from './src/Screens/TrackCreateScreen'
import TrackListScreen from './src/Screens/TrackListScreen'
import TrackDetailScreen from './src/Screens/TrackDetailScreen'
import AccountScreen from './src/Screens/AccountScreen'
import {Provider as AuthProvider, Context as AuthContext} from './src/context/AuthContext'
import {Provider as LocationProvider} from './src/context/LocationContext'
import {Provider as TrackProvider} from './src/context/TrackContext'
import {navigationRef} from './RootNavigation'


const LoginFlowStack = createStackNavigator()

const LoginFlow = () => {

  return (
    <LoginFlowStack.Navigator>
      <LoginFlowStack.Screen
        name={'signUp'}
        component={SignUpScreen}
        options={{
          headerShown: false
        }}
      />
      <LoginFlowStack.Screen
        name={'signIn'}
        component={SignInScreen}
        options={{
          headerShown: false
        }}
      />
    </LoginFlowStack.Navigator>
  )
}

const TrackNavigator = createStackNavigator()

const TrackFlow = (props) => {

  const {state} = useContext(AuthContext)

  return (
    <TrackNavigator.Navigator>
      <TrackNavigator.Screen
        name={'trackList'}
        component={TrackListScreen}
        options={{
          headerShown: false
        }}
      />
      <TrackNavigator.Screen
        name={'trackDetail'}
        component={TrackDetailScreen}
      />
    </TrackNavigator.Navigator>
  )
}

const MainFlowBottomTab = createBottomTabNavigator()

const MainFlow = (props) => {
  return (
    <MainFlowBottomTab.Navigator>
      <MainFlowBottomTab.Screen
        name={'trackFlow'}
        component={TrackFlow}
        options={{
          title: 'List',
          tabBarIcon: ({color, size}) => {
            return <FontAwesome name="th-list" size={size} color={color}/>
          }
        }}
      />
      <MainFlowBottomTab.Screen
        name={'trackCreate'}
        component={TrackCreateScreen}
        options={{
          title: 'Create',
          tabBarIcon: ({color, size}) => {
            return <FontAwesome name="plus" size={size} color={color}/>
          }
        }}
      />
      <MainFlowBottomTab.Screen
        name={'account'}
        component={AccountScreen}
        options={{
          title: 'Account',
          tabBarIcon: ({color, size}) => {
            return <FontAwesome name="gear" size={size} color={color}/>
          }
        }}
      />
    </MainFlowBottomTab.Navigator>
  )
}

const AuthFlow = () => {
  const {state} = useContext(AuthContext)
  const {token} = state

  return (
    <>
      {token !== null ? <MainFlow /> : <LoginFlow />}
    </>
  )
}

const App = () => {
  return (
    <SafeAreaProvider>
      <TrackProvider>
        <LocationProvider>
          <AuthProvider>
            <NavigationContainer ref={navigationRef}>
              <AuthFlow />
            </NavigationContainer>
          </AuthProvider>
        </LocationProvider>
      </TrackProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
});

export default App