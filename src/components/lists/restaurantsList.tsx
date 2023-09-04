import React, {useState, useEffect, useCallback } from 'react';
import './lists.css'
import { Restaurants } from '@/utils/types';
import Image from 'next/image';

import StarRating from '../rating/starRating';
import LoadingDots from '../loadings/loadingDot';

interface RestaurantsListProps {
  infoList: Restaurants[];
  loadingFilter: Boolean;
}
interface ListProps {
  infoList: Restaurants[];
  handleView: (url: string) => void;
}


const MultiList:React.FC<ListProps> = ({infoList, handleView}) => {
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


const SimpleList:React.FC<ListProps> = ({infoList, handleView}) => {
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

const RestaurantsLists:React.FC<RestaurantsListProps> = ({ infoList, loadingFilter }) => {
  const [items, setItems] = useState<Restaurants[]>(infoList.slice(0, 15));
  const [isScreenSmall, setIsScreenSmall] = useState<Boolean>(false);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [page, setPage] = useState(1);
  const itemsPerPage = 15; 

  useEffect(() => { //detect change of screen
    const handleResize = () => {
      setIsScreenSmall(window.innerWidth <= 500); 
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setItems(infoList.slice(0, itemsPerPage));
    setPage(1)
  }, [infoList, itemsPerPage]);

  const fetchMoreItems = useCallback(() => {
    
    const startIndex = page * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    if(infoList.length < startIndex){
      return;
    }
    setIsLoading(true);

    setTimeout(() => {
      const newItems = infoList.slice(startIndex, endIndex);

      setItems([...items, ...newItems]);
      setIsLoading(false);
      setPage(page + 1);
    }, 1000); 
  },[items, infoList, page]);
  
  const handleScroll = useCallback (() => {
    /*const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;

    console.log(scrollTop)
    console.log(windowHeight)
    if (windowHeight + scrollTop >= documentHeight - 100 && !isLoading) {
      fetchMoreItems();
    }*/
    const divElement = document.getElementById('list-component');
    if (!divElement) return;

    const windowHeight = window.innerHeight;
    const loadMoreElements = document.querySelectorAll(!isScreenSmall ? '.button-View' : '.button-View-SimpleCard');

    const lastElements = Array.from(loadMoreElements)
      .slice(!isScreenSmall ? -3 : -6) 
      .map((element) => {
        const rect = element.getBoundingClientRect();
        return rect.top >= 0 && rect.bottom <= windowHeight;
      });

    if (lastElements.length > 0 && lastElements.every((isVisible) => isVisible) && !isLoading) {
      fetchMoreItems();
    }
  },[fetchMoreItems, isLoading, isScreenSmall]);
  
  useEffect(() => {
    const listElement = document.getElementById('list-component');

    listElement?.addEventListener('scroll', handleScroll);
    return () => {
      listElement?.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  

  const handleView = (url: string) => {
    window.open(url, '_blank')?.focus();
  }

  return (
    <div id="list-component" className="cards-list">
      {loadingFilter && <LoadingDots />}
      {isLoading && <LoadingDots />}
      {!loadingFilter && !isLoading && !isScreenSmall && <MultiList infoList={items} handleView={handleView}/>}
      {!loadingFilter && !isLoading && isScreenSmall && <SimpleList infoList={items} handleView={handleView}/>}
    </div>
  )
}

export default RestaurantsLists;