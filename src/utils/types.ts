export type Restaurants = {
	id: number;
	image_url: string;
	name: string;
	rating: number;
	price: string;
	url: string;
	categories: Categories[];
};
  
export type Categories = {
	alias: string;
	title: string;
}
  
export type GetYelpResponse = {
	businesses: Restaurants[];
};

export type RestaurantsInfo = {
	status?: number;
	restaurants?: Restaurants[];
	categoriesArray?: Categories[];
	error?: string;
}