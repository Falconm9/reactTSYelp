import React from 'react';
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
  const handleView = (url: string) => {
    window.open(url, '_blank');
  }

  return (
    <div className="cards-list">
      {loadingFilter && <LoadingDots />}
      {!loadingFilter && infoList.map((item) => (
        <div key={item.id} className="card">
          <Image 
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
      ))}
    </div>
  )
}

export default RestaurantsLists;