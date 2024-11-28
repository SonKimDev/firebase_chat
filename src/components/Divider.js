import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../constants/theme'

export default function Divider() {
  return (
    <View style={styles.container}/>
  )
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 0.2,
    borderColor: colors.gray,
  }
})