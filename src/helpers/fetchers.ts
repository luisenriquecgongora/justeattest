import { Restaurant } from '../Home';

type RandomRestaurants  = {
  newPostalCode: string,
  newRestaurants: Restaurant[],
}

export const fetchRandomRestaurants = async (): Promise<RandomRestaurants> => {
  const URI = `https://api.postcodes.io/random/postcodes`;
  const randomPostalCodesResponse = await fetch(URI).then((res) => {
    return res.json();
  });
  const newRandomPostalCode = randomPostalCodesResponse?.result?.postcode;
  const newRandomRestaurants = await fetchRestaurants(newRandomPostalCode);
  return { newPostalCode: newRandomPostalCode, newRestaurants: newRandomRestaurants };
};

export const fetchRestaurants = async (postalCode: string): Promise<Restaurant[]> => {
  const URI = `https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/${postalCode}`;
  const restaurantsResponse = await fetch(URI, { mode: 'cors' }).then((res) => {
    return res.json();
  });
  return restaurantsResponse.restaurants;
};
