import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthNavigator from './src/navigators/AuthNavigator'
import { Provider } from 'react-redux'
import store from './src/store/store'
import RootNavigator from './src/navigators/RootNavigator'
import { StatusBar } from 'expo-status-bar'

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar translucent backgroundColor='transparent'/>
      <RootNavigator />
    </Provider>
  )
}