import React from 'react'
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs'
import {createAppContainer} from 'react-navigation';
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoriesMealsScreen from '../screens/CategoriesMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import {Platform, Text} from 'react-native';
import Colors from '../constants/Colors';
import FavouritesScreen from '../screens/FavouritesScreen'
import {Ionicons} from '@expo/vector-icons'
import FiltersScreen from '../screens/FiltersScreen';

const defaultStackNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle:{
        fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor
};

const MealsNavigator = createStackNavigator({

    Categories: {
        screen: CategoriesScreen
    },
    CategoriesMeals: {
        screen: CategoriesMealsScreen,
        
    },
    MealDetail: {
        screen: MealDetailScreen 
    }
}, 
    {
    defaultNavigationOptions: defaultStackNavOptions
        
    }
);

const FavouritesNavigator = createStackNavigator({
    Favourites: FavouritesScreen,
    MealDetail: MealDetailScreen
},
{
    defaultNavigationOptions: defaultStackNavOptions
    });

const tabScreenConfig = 
    {
        Meals: {
            screen: MealsNavigator,
            navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return (<Ionicons name='ios-restaurant' size={25} color={tabInfo.tintColor} />  );

                },
                tabBarColor: Colors.primaryColor,
                tabBarLabel: Platform.OS === 'android' 
                    ? <Text style={{fontFamily: 'open-sans-bold'}}>Meals</Text> 
                    : 'Meals'
            }
        },
        Favourites: {
            screen: FavouritesNavigator,
            navigationOptions: {
            //tabBarLabel: 'Favourites!',
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='ios-star' size={25} color={tabInfo.tintColor} />           
                },
                tabBarColor: Colors.accentColor,
                tabBarLabel: Platform.OS === 'android' 
                    ? <Text style={{fontFamily: 'open-sans-bold'}}>Favourites</Text> 
                    : 'Favourites'
            }
        }
    };

const FiltersNavigator = createStackNavigator({
    Filters: FiltersScreen
},
{
    defaultNavigationOptions: defaultStackNavOptions
});


const MealsFavTabNavigator = 
    Platform.OS === 'android' 
    ? createMaterialBottomTabNavigator (tabScreenConfig, {
        activeTintColor: 'white',
        shifting: true,
        barStyle: {
            backgroundColor: Colors.primaryColor
        }
    })
    : createBottomTabNavigator(tabScreenConfig, {
    tabBarOptions: {
        labelStyle: {
            fontFamily: 'open-sans'   
        },
        activeTintColor: Colors.accentColor
    }
});

const MainNavigator = createDrawerNavigator(
    {
        MealFavs: {screen: MealsFavTabNavigator,
            navigationOptions: {
                drawerLabel: 'Meals'
            }
        },
        Filters: FiltersNavigator
    },
    {
        contentOptions: {
            activeTintColor: Colors.accentColor,
            labelStyle: {
                fontFamily: 'open-sans-bold'
            }
        }
    }
);



export default createAppContainer(MainNavigator);