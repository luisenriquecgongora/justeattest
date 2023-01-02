import { useState } from 'react';
import { isValidPostcode } from '../helpers/checkers';
import { fetchRandomRestaurants, fetchRestaurants } from '../helpers/fetchers';
import * as styledComponents from './styles';
import Moment from 'react-moment';
import ReactLoading from 'react-loading';
import { ReactComponent as ÇlockSVG } from '../assets/clock.svg';
import { ReactComponent as StarSVG } from '../assets/star.svg';
import 'moment-timezone';

export interface Restaurant {
  name: string;
  rating: {
    count: number;
    starRating: number;
  };
  openingTimeLocal: Date;
}

function Home() {
  const [postalCode, setPostalCode] = useState('');
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const PostcodeColor = isValidPostcode(postalCode) ? '#171a21' : 'red';

  const updatedPostalCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostalCode(e.target.value);
  };

  const handleClickSearch = async () => {
    setAlertMessage('');
    setIsLoading(true);
    try {
      const newRestaurants = await fetchRestaurants(postalCode);
      setRestaurants(newRestaurants);
    } catch (error) {
      setAlertMessage(JSON.stringify(error));
    }
    setIsLoading(false);
  };

  const handleClickGetRandom = async () => {
    setAlertMessage('');
    setIsLoading(true);
    try {
      const { newPostalCode, newRestaurants } = await fetchRandomRestaurants();
      setPostalCode(newPostalCode);
      setRestaurants(newRestaurants);
    } catch (error) {
      setAlertMessage(JSON.stringify(error));
    }
    setIsLoading(false);
  };

  return (
    <styledComponents.Wrapper className="flex-col flex items-center overflow-y-auto">
      <div>
        <styledComponents.Header className="sticky top-0 pt-20 pb-5 flex flex-row justify-center	 items-center">
          <input
            onChange={updatedPostalCode}
            value={postalCode}
            className={'bg-white h-14 text-md rounded-md px-3.5'}
            style={{ color: PostcodeColor, border: '1px solid #dbdbdb' }}
            title={!isValidPostcode(postalCode) ? 'Postal Code Invalid' : ''}
          />
          <button
            onClick={handleClickSearch}
            className={'bg-white h-14 rounded-lg px-6 text-lg font-medium ml-2'}
            style={{ color: '#3E49FB' }}
          >
            Search
          </button>
          <button
            onClick={handleClickGetRandom}
            className={'bg-white h-14 rounded-lg px-6 text-lg font-medium ml-2'}
            style={{ color: '#3E49FB' }}
          >
            Get Random
          </button>
        </styledComponents.Header>

        {alertMessage && (
          <div className={'w-full flex flex-col items-center mt-20'}>
            <b>Error on the request</b>
          </div>
        )}
        {isLoading && (
          <ReactLoading type={'cubes'} color={'#fb5437'} height={'50px'} width={'50px'} className={'m-auto'} />
        )}
        {!isLoading && !restaurants.length && (
          <div className={'w-full flex flex-col items-center mt-20'}>
            <b>No restaurants located in the area</b>
          </div>
        )}
        <div className="flex flex-col w-full items-center	">
          {!isLoading &&
            restaurants
              ?.sort((a: Restaurant, b: Restaurant) => {
                return b.rating.starRating - a.rating.starRating;
              })
              .map((restaurant: Restaurant, idx) => {
                return (
                  <div
                    key={idx}
                    className={'bg-white h-auto my-2 px-3.5 py-1.5 rounded-md w-96'}
                    style={{ border: '1px solid black' }}
                  >
                    <div className="text-lg font-semibold	">{restaurant.name}</div>
                    <div className="flex">
                      <StarSVG className="w-5 mr-2" />
                      {restaurant.rating.starRating} ({restaurant.rating.count})
                    </div>
                    <div className="flex">
                      <ÇlockSVG className="w-5 mr-2" />
                      Opening: &nbsp;
                      <Moment format="YYYY/MM/DD hh:mm">{restaurant.openingTimeLocal.toString()}</Moment>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </styledComponents.Wrapper>
  );
}

export default Home;
