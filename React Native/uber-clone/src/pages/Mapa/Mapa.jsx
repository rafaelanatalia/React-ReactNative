import { View, Text , SafeAreaView} from 'react-native'
import React from 'react'
import tw from "tailwind-react-native-classnames";

const Mapa = () => {
  return (
    <SafeAreaView style={tw`bg-white h-full`}>
    <View style={tw`p-8`}>
      <Text style={tw`text-lg p-10`}>Mapa</Text>
    </View>
    </SafeAreaView>
   
  )
}

export default Mapa