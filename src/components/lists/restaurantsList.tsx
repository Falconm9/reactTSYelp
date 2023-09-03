import React, {useState, useEffect} from 'react';
import './lists.css'
import { Restaurants } from '@/utils/types';
import Image from 'next/image';

import StarRating from '../rating/starRating';
import LoadingDots from '../loadings/loadingDot';

interface RestaurantsListProps {
  infoList: Restaurants[]
  loadingFilter: Boolean
}

const RestaurantsLists:React.FC<RestaurantsListProps> = ({ infoList, loadingFilter }) => {
  const [isScreenSmall, setIsScreenSmall] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsScreenSmall(window.innerWidth <= 500); 
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleView = (url: string) => {
    window.open(url, '_blank')?.focus();
  }

  const MultiList = () => {
    return(
      <>
        { infoList.map((item) => (
            <div key={item.id} className="card">
              <Image
                className='image-restaurant'
                src={item.image_url}
                width={140}
                height={140}
                alt=''
              />
              <div className='title'>
                <h4>{item.name}</h4>
              </div>
              <div className='info'>
                <StarRating rating={item.rating} />
                <div className='priceInfo'>
                  <span className='priceText'>{item.price ? item.price : 'No price info'}</span>
                </div>
              </div>
              <button className="button-View" onClick={() => handleView(item.url)}>View</button>
            </div>
          ))
        }
      </>
    )
  }

  const SimpleList = () => {
    return (
      <>
      { infoList.map((item) => (
          <div key={item.id} className="card-Simple">
            <Image
              className='image-restaurant'
              src={item.image_url}
              width={100}
              height={100}
              alt=''
            />
            <div className='infoCard'>
              <div className='title'>
                <span className='titleText'>{item.name}</span>
              </div>
              <div className='info-SimpleCard'>
                <StarRating rating={item.rating} />
                <div className='priceInfo'>
                  <span className='priceText'>{item.price ? item.price : 'No price info'}</span>
                </div>
              </div>
              <button className="button-View-SimpleCard" onClick={() => handleView(item.url)}>View</button>  
            </div>
          </div>
        ))
      }
      </>
    )
  }

  return (
    <div className="cards-list">
      {loadingFilter && <LoadingDots />}
      {!loadingFilter && !isScreenSmall && <MultiList />}
      {!loadingFilter && isScreenSmall && <SimpleList />}
    </div>
  )
}

export default RestaurantsLists;