import React, { useEffect, useState } from "react";
import { getRestaurantsInfo } from '@/actions/fetchYelpInfo'
import Header from "@/components/layout/header";
import Filters from "@/components/filters/horizontalFilters";
import LoadingDots from "@/components/loadings/loadingDot";
import { RestaurantsInfo, Restaurants, Categories } from "@/utils/types";
export default function Resturants(){
	const [loading, setLoading] = useState<Boolean>(true);
	const [restaurantsList, setRestaurantList] = useState<Restaurants[]>([]);
	const [categoriesList, setCategoriesList] = useState<Categories[]>([]);


	const testListCategories = [
		{alias: "test", title: "eyeyey333e" },
		{alias: "test", title: "eyeyeye" },
		{alias: "test", title: "eyeyey32e" },
		{alias: "test", title: "eyeye3ye" },
		{alias: "test", title: "eyeye12ye" }
	]

	useEffect(() => {
		async function getRestaurants() {
      try {
        // Realiza alguna operación asíncrona aquí
				setLoading(true);
        const result: RestaurantsInfo = await getRestaurantsInfo();
				setLoading(false);
				if(result.status === 200 && result.restaurants && result.categoriesArray){
					setRestaurantList(result.restaurants)
					setCategoriesList(result.categoriesArray)
					
				}
      } catch (error) {
        console.error(error);
      }
    }

    getRestaurants();

  }, []);

  return(
		<>
			<Header title='Restaurants' />
			{loading && <LoadingDots />}
			{!loading && (
				<>
					<Filters categoriesList={categoriesList} />
				</>
			)}
		</>
	)
}