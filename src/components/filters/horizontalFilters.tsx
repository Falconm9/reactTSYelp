import React, {useState} from 'react';
import './filters.css';
import { Categories } from '@/utils/types';

interface HeaderProps {
  categoriesList: Categories[]
}

const HorizontalFilters:React.FC<HeaderProps> = ({ categoriesList }) => {
  const [scrollLeft, setScrollLeft] = useState(0);

  return (
    <div className="container-Filter">
      <div className="button-Filters" style={{ transform: `translateX(-${scrollLeft}px)` }}>
        {categoriesList.map((categories, index) => (
          <button key={index}>{categories.title}</button>
        ))}
      </div>
    </div>
  )
}

export default HorizontalFilters;