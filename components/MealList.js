import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import MealItem from './MealItem';
import {useSelector} from 'react-redux'

const MealList = props => {

  const favouriteMeals = useSelector(state => state.meals.favouriteMeals);

    const renderMealItem = (itemData) => {
      const isFavourite = favouriteMeals.find(meal => meal.id === itemData.item.id);
        return( <MealItem title={itemData.item.title} 
          duration={itemData.item.duration} 
          complexity={itemData.item.complexity}
          affordability={itemData.item.affordability}
          image={itemData.item.imageUrl}
          onSelectMeal={() => {
            props.navigation.navigate({routeName: 'MealDetail', params: {
              mealId: itemData.item.id,
              mealTitle: itemData.item.title,
              isFav: isFavourite
            }})
          }}/>);
      };

      
      return (
    <View style={styles.screen}>
    <FlatList 
      data={props.listData} 
      keyExtractor={(item, index) => item.id} 
      renderItem={renderMealItem} 
      style={{width: '100%'}}/>
      {/* <Text>
          The Categories Meals Screen!
      </Text>
      <Text>{selectedCategory.title}</Text>
      <Button title="Go To Meal Detail" onPress={() => {
        props.navigation.navigate({routeName: 'MealDetail'})
      }} />
      <Button title="Go Back" onPress={() => {
        props.navigation.goBack();      
        }}/> */}
  </View>
      )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15
    }
});

export default MealList;