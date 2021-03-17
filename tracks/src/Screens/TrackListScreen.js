import React, {useContext} from 'react'
import {StyleSheet, Text, FlatList, TouchableOpacity, View, TouchableHighlight} from 'react-native'
import {Context as TrackContext} from '../context/TrackContext'
import {ListItem} from 'react-native-elements'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useFocusEffect} from '@react-navigation/native'

function TrackListScreen({navigation, route}) {
  const {state, fetchTracks} = useContext(TrackContext)

  useFocusEffect(
    React.useCallback(() => {
      fetchTracks()
    }, [])
  )

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={state}
        keyExtractor={item => item._id}
        renderItem={({item}) => {
          return (
            <TouchableHighlight onPress={() => {
              navigation.navigate('trackDetail', {_id: item._id})
            }}>
              <View>
                <ListItem bottomDivider>
                  <ListItem.Content>
                    <ListItem.Title>
                      {item.name}
                    </ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Chevron />
                </ListItem>
              </View>
            </TouchableHighlight>)
        }}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default TrackListScreen
