import React from 'react';
import SearchDropDown from '../SearchDropDown/SearchDropDown';
import { styled } from '@superset-ui/core';
import { TAG_SUBJECT } from '../../plugin/CustomApiUtils';
import { TagItems } from '../../types';

const WrapperComponent = styled.div`
  position: relative;
  bottom: 240px;
  width: 270px;
`;

export default function Tag(props: { tagItems: TagItems }) {
  const { tagItems } = props;

  const { tagList, selectedTag, setSelectedTag, queriedTag } = tagItems;

  const tagArray = tagList.map(c => c[TAG_SUBJECT]);

  return (
    <WrapperComponent>
      <SearchDropDown
        defaultValue={queriedTag || 'Select tag'}
        name={'tag = '}
        values={tagArray}
        selectedValue={selectedTag}
        setSelectedValue={setSelectedTag}
      />
    </WrapperComponent>
  );
}
