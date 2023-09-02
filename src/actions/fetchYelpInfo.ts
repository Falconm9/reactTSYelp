import axios from "axios";
import { Restaurants, Categories, GetYelpResponse, RestaurantsInfo } from "../utils/types";

export async function getRestaurantsInfo(): Promise<RestaurantsInfo> {
  try {
    const corsApiUrl = 'http://localhost:8080/';
    const { data, status } = await axios.get<GetYelpResponse>(
      `${corsApiUrl}https://api.yelp.com/v3/businesses/search?location=San%20Jose,%20CA%2095127&term=restaurants`,
      {
        headers:
         {
          Accept: 'application/json',
          Authorization: 'Bearer 83e7pu5hQ7kbSEnJ7TE69tSjXPPeu1awR5WbdbsAeaicksSzpNs-dtOG80C7UNnB9MC72f79N1SIgfzGX9xFfjb5ss9wIRE6dupmCWxINh3iUTtoa9fx1txTg3DxZHYx'
        },
      },
    );

    const restaurants: Restaurants[] = data.businesses;

    const categoriesArray = restaurants
      .flatMap(restaurant => restaurant.categories) // Combina todos los arrays de categorías en uno
      .reduce((categories: Categories[], categorie: Categories) => {
        // Comprueba si la categoría ya existe en el array de categorías únicas
        const categoriaExistente = categories.find(c => c.alias === categorie.alias);
        
        if (!categoriaExistente) {
          categories.push(categorie); // Si no existe, agrégala al array de categorías únicas
        }
        
        return categories;
      }, []);

      return {status, restaurants, categoriesArray};
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
      return  { error: error.message };
    } else {
      console.log('unexpected error: ', error);
      return  { error: 'An unexpected error occurred'};
    }
  }
}