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
import { QueryFormData, supersetTheme, TimeseriesDataRecord } from '@superset-ui/core';

export interface ConciseCardStylesProps {
  height: number;
  width: number;
  headerFontSize: keyof typeof supersetTheme.typography.sizes;
  boldText: boolean;
}

interface ConciseCardCustomizeProps {
  headerText: string;
}

export type ConciseCardQueryFormData = QueryFormData &
  ConciseCardStylesProps &
  ConciseCardCustomizeProps;

export type ConciseCardProps = ConciseCardStylesProps &
  ConciseCardCustomizeProps & {
    data: TimeseriesDataRecord[];
    formData: FormData;
    categoryList: [];
    selectedCategory: string;
    tagList: [];
    // add typing here for the props you pass in from transformProps.ts!
  };

export type FormData = {
  adhocFilters: [];
  metrics: Metric[];
};

export type CategoryItems = {
  categoryList: [];
  selectedCategory: string;
  setSelectedCategory: Function;
  queriedCategory: string;
};

export type TagItems = {
  tagList: [];
  selectedTag: string;
  setSelectedTag: Function;
  queriedTag: string;
};

export type SubChartProps = {
  borderTopColor: string;
  data: TimeseriesDataRecord;
  formData: FormData;
  categoryItems: CategoryItems;
  tagItems: TagItems;
  setShouldRunQuery: Function;
  enableRunButton: boolean;
  isQueryRunning: boolean;
};

export type CategoryProps = {
  categoryItems: CategoryItems;
};

export type AdhocFilter = {
  operatorId: string;
  subject: string;
  comparator: string;
};

export type Metric = {
  label: string;
  value: number;
  key: string;
};

export type PrimaryMetricProps = {
  primaryMetric: Metric;
};

export type SecondaryMetricsContainerProps = {
  secondaryMetrics: Metric[];
};
