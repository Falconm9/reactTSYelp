export type Restaurants = {
	id: number;
	image_url: String;
	name: String;
	rating: number;
	price: String;
	url: String;
	categories: Categories[];
};
  
export type Categories = {
	alias: String;
	title: String;
}
  
export type GetYelpResponse = {
	businesses: Restaurants[];
};

export type RestaurantsInfo = {
	status?: number;
	restaurants?: Restaurants[];
	categoriesArray?: Categories[];
	error?: String;
}