import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import 'react-native-gesture-handler';
import HomeScreen from '../screens/master-data';
import TransaksiScreen from '../screens/transaksi';

const Stack = createStackNavigator()
const Top = createMaterialTopTabNavigator();

const TopTab = () => {
    return (
        <Top.Navigator
        screenOptions={{
            tabBarActiveTintColor: '#fff',
            tabBarStyle: { backgroundColor: '#539165' },
            tabBarIndicatorStyle: { backgroundColor: '#fff' },
        }}
        >
            <Top.Screen
            name='MasterBarang' 
            component={RootStack}
            />
            <Top.Screen
            name='Transaksi' 
            component={TransaksiScreen}
            />
        </Top.Navigator>
    )
}


const RootStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
            name="home"
            component={HomeScreen}
            options={{
                headerShown: false
            }}
          />
        </Stack.Navigator>
    )
}

const Navigation = () => {
    

    return (
        <NavigationContainer>
            <TopTab/>
        </NavigationContainer>
    )
}

export default Navigation