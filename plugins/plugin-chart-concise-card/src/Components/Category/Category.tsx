import React from 'react';
import SearchDropDown from '../SearchDropDown/SearchDropDown';
import { styled } from '@superset-ui/core';
import { CategoryProps } from '../../types';
import { CATEGORY_SUBJECT } from '../../plugin/CustomApiUtils';

const WrapperComponent = styled.div`
  position: relative;
  top: 15px;
  width: 270px;
`;

export default function Category(props: CategoryProps) {
  const { categoryItems } = props;

  const { categoryList, selectedCategory, setSelectedCategory, queriedCategory } = categoryItems;

  const categoryArray: string[] = categoryList.map(c => c[CATEGORY_SUBJECT]);

  return (
    <WrapperComponent>
      <SearchDropDown
        defaultValue={queriedCategory || 'No category'}
        name={'category'}
        values={categoryArray}
        selectedValue={selectedCategory}
        setSelectedValue={setSelectedCategory}
      />
    </WrapperComponent>
  );
}
