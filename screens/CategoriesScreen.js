import React from 'react';
import { StyleSheet, Text, FlatList, View, Button, TouchableOpacity } from 'react-native';
import { CATEGORIES} from '../data/dummyData';
import CategoryGridTile from '../components/CategoryGridTile';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';


const CategoriesScreen = props => {
  const renderGriditem = (itemData) => {
    return (
    <CategoryGridTile 
      color={itemData.item.color}
      title={itemData.item.title} 
      onSelect={() => {
      props.navigation.navigate({
        routeName: 'CategoriesMeals', 
        params: {
        categoryId: itemData.item.id
      }
    });
  }}/>
    );
  };

  return(
  // <View style={styles.screen}>
  //     <Text>
  //         The Categories Screen!
  //     </Text>
  //     <Button title="Go To Meals" onPress={() => {
  //       props.navigation.navigate({routeName: 'CategoriesMeals'})
  //     }} />
  // </View>
  <FlatList 
    keyExtractor={(item, index) => item.id}
    data={CATEGORIES} 
    renderItem={renderGriditem} 
    numColumns={2} />
  );
};

CategoriesScreen.navigationOptions = navData => {
  return {
  headerTitle: 'Meal Categories',
  headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
    <Item title="Menu" iconName="ios-menu" onPress={() => {
      navData.navigation.toggleDrawer();
    }}/>
  </HeaderButtons>
  }
};


const styles = StyleSheet.create({
  screen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  },

});

export default CategoriesScreen;
