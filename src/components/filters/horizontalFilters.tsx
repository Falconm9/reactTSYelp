import React from 'react';
import './filters.css';
import { Categories } from '@/utils/types';

interface HorizontalFiltersProps {
  categoriesList: Categories[];
  handleSelectFilter: (filter: string) => void;
  filterSelected: string;
}

const HorizontalFilters:React.FC<HorizontalFiltersProps> = ({ categoriesList, handleSelectFilter, filterSelected }) => {

  return (
    <div className="container-Filter">
      <div className="button-Filters" style={{ transform: `translateX(0px)` }}>
        {categoriesList.map((categories, index) => (
          <button 
            className={`button-Filter ${filterSelected === categories.alias ? 'filter-Selected': ''}`}  
            key={index}
            onClick={() => handleSelectFilter(categories.alias)}
          >
            {categories.title}
          </button>
        ))}
      </div>
    </div>
  )
}

export default HorizontalFilters;