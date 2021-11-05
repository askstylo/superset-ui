/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import React, { createRef, SetStateAction, useEffect, useState } from 'react';
import { styled } from '@superset-ui/core';
import { CategoryItems, ConciseCardProps, ConciseCardStylesProps, TagItems } from './types';
import SubChart from './Components/SubChart/SubChart';
import {
  CATEGORY_SUBJECT,
  OPERATOR_ID_EQUALS,
  runCustomQuery,
  TAG_SUBJECT,
} from './plugin/CustomApiUtils';

// Theming variables are provided for your use via a ThemeProvider
// imported from @superset-ui/core. For variables available, please visit
// https://github.com/apache-superset/superset-ui/blob/master/packages/superset-ui-core/src/style/index.ts

const Styles = styled.div<ConciseCardStylesProps>`
  //background-color: ${({ theme }) => theme.colors.secondary.light2};
  padding: ${({ theme }) => theme.gridUnit * 4}px;
  border-radius: ${({ theme }) => theme.gridUnit * 2}px;
  // height: ${({ height }) => height};
  // width: ${({ width }) => width};
  height: 400px;
  width: 900px;
  overflow: hidden;
  padding-bottom: 10px;
  margin-bottom: 10px;
`;

export default function ConciseCard(props: ConciseCardProps) {
  const { data, height, width, formData, categoryList, tagList } = props;

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [queriedCategory, setQueriedCategory] = useState('');
  const [queriedTag, setQueriedTag] = useState('');
  const [shouldRunQuery, setShouldRunQuery] = useState(false);
  const [isQueryRunning, setIsQueryRunning] = useState(false);
  const [customData, setCustomData] = useState(null);

  const isTagChanged = selectedTag && selectedTag !== queriedTag;
  const isCategoryChanged = selectedCategory && selectedCategory !== queriedCategory;

  const enableRunButton: boolean = Boolean(!isQueryRunning && (isTagChanged || isCategoryChanged));

  const requestCategory = selectedCategory || queriedCategory;
  const requestTag = selectedTag || queriedTag;

  if (shouldRunQuery && (requestCategory || requestTag) && (isTagChanged || isCategoryChanged)) {
    setIsQueryRunning(true);
    setShouldRunQuery(false);
    runCustomQuery(formData, requestCategory, requestTag)
      .then(r => {
        setCustomData(r.json.result[0].data[0]);
      })
      .catch(e => console.log(e))
      .finally(() => setIsQueryRunning(false));
  }

  const { adhocFilters } = formData;
  // @ts-ignore
  const customAdhocFilters = customData ? customData.adhocFilters : null;

  useEffect(() => {
    if (adhocFilters) {
      customAdhocFilters ||
        adhocFilters.forEach(
          (filter: { operatorId: string; subject: string; comparator: SetStateAction<any> }) => {
            if (filter.operatorId === OPERATOR_ID_EQUALS) {
              if (filter.subject === CATEGORY_SUBJECT) {
                setQueriedCategory(filter.comparator);
              }
              if (filter.subject === TAG_SUBJECT) {
                setQueriedTag(filter.comparator);
              }
            }
          },
        );
    }
  }, [adhocFilters]);

  const rootElem = createRef<HTMLDivElement>();

  const firstData = data[0];

  const categoryItems: CategoryItems = {
    categoryList,
    selectedCategory: selectedCategory,
    setSelectedCategory: setSelectedCategory,
    queriedCategory: queriedCategory,
  };

  const tagItems: TagItems = {
    tagList,
    selectedTag: selectedTag,
    setSelectedTag: setSelectedTag,
    queriedTag: queriedTag,
  };

  return (
    <Styles
      ref={rootElem}
      boldText={props.boldText}
      headerFontSize={props.headerFontSize}
      height={height}
      width={width}
    >
      {formData && (
        <SubChart
          borderTopColor={'#450097'}
          data={customData || firstData}
          formData={formData}
          categoryItems={categoryItems}
          tagItems={tagItems}
          setShouldRunQuery={setShouldRunQuery}
          enableRunButton={enableRunButton}
          isQueryRunning={isQueryRunning}
        />
      )}
    </Styles>
  );
}
