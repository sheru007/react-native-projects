import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {useRef, useState} from 'react';

const {width, height} = Dimensions.get('screen');

const slides = [
  {
    title: 'Find your new favorite restaurant',
    message:
      'Veniam proident do adipisicing sint reprehenderit qui aliqua pariatur exercitation elit ad qui anim',
    action: 'Get started',
  },
  {
    title: 'Discover new places to eat',
    message:
      'Veniam proident do adipisicing sint reprehenderit qui aliqua pariatur exercitation elit ad qui anim',
    action: 'Continue',
  },
  {
    title: "We've got you covered",
    message:
      'Veniam proident do adipisicing sint reprehenderit qui aliqua pariatur exercitation elit ad qui anim',
    action: 'Start exploring',
  },
];

const elements = [
  {
    uri: 'https://images.unsplash.com/photo-1602016753527-3b369b88af5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
    position: [-50, 15],
    rotate: '15deg',
  },
  {
    uri: 'https://images.unsplash.com/photo-1549575612-3eef24008a05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
    position: [180, 120],
    rotate: '-10deg',
  },
  {
    uri: 'https://images.unsplash.com/photo-1626118788936-29dc02466e96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHJlc3RyYXVudHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    position: [540, 50],
    rotate: '20deg',
  },
  {
    uri: 'https://images.unsplash.com/photo-1665934629826-e48c6ab70fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=985&q=80',
    position: [860, 25],
    rotate: '-4deg',
  },
];

const Background = () => {
  return (
    <View style={styles.elements}>
      {elements.map(({uri, position: [x, y], rotate}, index) => {
        return (
          <View
            style={[styles.element, {zIndex: elements.length - index}]}
            key={index}>
            <Image
              source={{uri}}
              style={[
                styles.elementImage,
                {
                  width: width * 0.8,
                  height: width * 0.6,
                  top: y,
                  left: x,
                  transform: [{rotate}],
                },
              ]}
            />
          </View>
        );
      })}
    </View>
  );
};

export default function WelcomeScreen({navigation}) {
  const swiper = useRef();
  const [slide, setSlide] = useState(0);

  const scrollX = useRef(new Animated.Value(0)).current;

  const contentOpacityRanges = Array.from({length: slides.length}).reduce(
    (acc, _, index) => {
      const screenWidth = index * width;
      const screenWidthMiddle = screenWidth + width / 2;

      acc.inputRange.push(screenWidth, screenWidthMiddle);
      // opacity 1 when screen is presented, 0.2 when screens are switching (mid point).
      acc.outputRange.push(1, 0.2);

      return acc;
    },
    {
      inputRange: [],
      outputRange: [],
    },
  );
  const contentOpacity = scrollX.interpolate(contentOpacityRanges);

  const animatedBackgroundLeft = scrollX.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [1, 0, -1],
  });

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={{left: animatedBackgroundLeft}}>
        <Background />
      </Animated.View>
      <Swiper
        ref={swiper}
        showsPagination={false}
        loop={false}
        scrollEventThrottle={1}
        onIndexChanged={setSlide}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ],
          {useNativeDriver: false},
        )}>
        {slides.map((element, index) => {
          const {title, message, action} = element;
          return (
            <Animated.View
              key={index}
              style={[styles.slide, {opacity: contentOpacity}]}>
              <Text style={styles.slideTitle}>{title}</Text>
              <Text style={styles.slideMessage}>{message}</Text>

              <TouchableOpacity
                onPress={() => {
                  // handle on press action

                  if (action === 'Start exploring') {
                    navigation.replace('Home');
                  } else {
                    swiper.current.scrollTo(slide + 1, true);
                  }
                }}>
                <View style={styles.btn}>
                  <Text style={styles.btnText}>{action}</Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </Swiper>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  elements: {
    width: width * slides.length,
    height: height * 0.6,
    position: 'absolute',
    top: 47,
    left: 0,
  },
  element: {
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
  elementImage: {
    borderRadius: 24,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFEDD5',
  },
  slide: {
    flex: 1,
    position: 'relative',
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    backgroundColor: 'transparent',
  },
  slideTitle: {
    fontSize: 36,
    lineHeight: 40,
    fontWeight: '600',
    color: '#0d0d0d',
    marginBottom: 12,
  },
  slideMessage: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0d0d0d',
  },
  btn: {
    backgroundColor: '#0d0d0d',
    padding: 18,
    borderRadius: 12,
    marginTop: 48,
    marginBottom: 40,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
