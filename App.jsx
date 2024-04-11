import { StyleSheet, Image, View, Animated, SafeAreaView, StatusBar, LayoutAnimation } from 'react-native';
import React, {useRef, useEffect} from 'react';
import logo from './assets/logo.png';

export default function App() {
  const splashAnim = useRef(new Animated.Value(0)).current;
  const lightAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(lightAnim, {
        toValue: 2,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.spring(splashAnim, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: true,
        friction: 6,
        tension: 80,
      })
    ]).start();
  }, [splashAnim]);
  
  const lightTranslateY1 = lightAnim.interpolate({
    inputRange: [0, 0.96],
    outputRange: [-1000, 1000],
  });
  const lightTranslateY2 = lightAnim.interpolate({
    inputRange: [0.66, 1.62],
    outputRange: [-1000, 1000],
  });
  const lightTranslateY3 = lightAnim.interpolate({
    inputRange: [1.32, 2],
    outputRange: [-1000, 1000],
  });

  const sizeAnim = splashAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor={'#00132E'}/>
      <Animated.Image source={logo} style={[
        styles.logo, 
        {transform:[
          {scaleX: sizeAnim}, 
          {scaleY: sizeAnim}]}
      ]}/>
      <View style={styles.lights}>
        <Animated.View style={[styles.light, {translateY: lightTranslateY2}]}/>
        <Animated.View style={[styles.light, {translateY: lightTranslateY1}]}/>
        <Animated.View style={[styles.light, {translateY: lightTranslateY3}]}/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00132E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  logo: {
    height: 300,
    resizeMode: 'contain',
    position: 'absolute',
    width: '90%'
  },
  lights: {
    height: '100%',
    width: '150%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    transform: [{ rotate: '-45deg' }]
  },
  light: {
    height: 300,
    width: '0',
    borderWidth: 8,
    borderColor: 'white',
    borderRadius: 4,
  }
});
