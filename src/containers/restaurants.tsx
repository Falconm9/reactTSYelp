import React, { useEffect, useState } from "react";
import { getRestaurantsInfo } from '@/actions/fetchYelpInfo'
import Header from "@/components/layout/header";
import Filters from "@/components/filters/horizontalFilters";
import LoadingDots from "@/components/loadings/loadingDot";
import RestaurantsLists from "@/components/lists/restaurantsList";
import { RestaurantsInfo, Restaurants, Categories } from "@/utils/types";
export default function Resturants(){
	const [loading, setLoading] = useState<Boolean>(true);
	const [loadingFilter, setLoadingFilter] = useState<Boolean>(false);
	const [restaurantsList, setRestaurantList] = useState<Restaurants[]>([]);
	const [filteredList, setFilteredList] = useState<Restaurants[]>([]);
	const [categoriesList, setCategoriesList] = useState<Categories[]>([]);
	const [filterSelected, setFilterSelected] = useState<string>('all')

	useEffect(() => {
		async function getRestaurants() {
      try {
				setLoading(true);
        const result: RestaurantsInfo = await getRestaurantsInfo();
				setLoading(false);
				if(result.status === 200 && result.restaurants && result.categoriesArray){
					setRestaurantList(result.restaurants)
					setFilteredList(result.restaurants)
					setCategoriesList(result.categoriesArray)
				}
      } catch (error) {
        console.error(error);
      }
    }

    getRestaurants();

  }, []);


	const handleSelectFilter = (filter: string) => {
		setFilterSelected(filter)
		setLoadingFilter(true)
		filterRestaurantsList(filter);
	}


	const filterRestaurantsList = (filter: string) => {

		if(filter === 'all'){
			setFilteredList(restaurantsList); //restore original list
			setLoadingFilter(false)
			return;
		}

		const newArray = restaurantsList.filter(restaurant =>
			restaurant.categories.some(category => category.alias === filter)
		);

		setFilteredList(newArray);
		setLoadingFilter(false)
	}

  return(
		<>
			<Header title='Restaurants' />
			{loading && <LoadingDots />}
			{!loading && (
				<>
					<Filters categoriesList={categoriesList} handleSelectFilter={handleSelectFilter} filterSelected={filterSelected} />
					<RestaurantsLists infoList={filteredList} loadingFilter={loadingFilter}/>
				</>
			)}
		</>
	)
}