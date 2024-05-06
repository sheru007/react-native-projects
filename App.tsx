/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * react-native.config.js
 * Open reactNativeProjects/ios/reactNativeProjects.xcworkspace in Xcode or run "xed -b ios"
 * npx react-native@latest init reactNativeProjects
 * 
 * @format
 */

import React from 'react';
// import type { PropsWithChildren } from 'react';
import {
  // SafeAreaView,
  ScrollView,
  // StatusBar,
  // StyleSheet,
  Text,
  // useColorScheme,
  View,
  Button
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PasswordScreen from './projects/PasswordScreen';
import WelcomeScreen from './projects/WelcomeScreen';

// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;

// function Section({ children, title }: SectionProps): React.JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// }

function Home({ navigation }): React.JSX.Element {
  return (<ScrollView
    contentInsetAdjustmentBehavior="automatic">
    <View>
      <Text>Click on project to see what is it</Text>
      <Button title="Password Screen" onPress={() => navigation.navigate('Code Confirmation')} />
    </View>
  </ScrollView>)
}
const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  // const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome'>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Code Confirmation' component={PasswordScreen} />
        <Stack.Screen name='Welcome' component={WelcomeScreen} options={{
          headerShown: false
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

export default App;
