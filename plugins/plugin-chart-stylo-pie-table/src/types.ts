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
import {
  ChartDataResponseResult,
  ChartProps,
  DrillDownType,
  QueryFormData,
  SetAdhocFilter,
} from '@superset-ui/core';

import {
  PieChartTransformedProps,
  OwnState,
} from '@superset-ui/plugin-chart-echarts/lib/Pie/types';
import { TableChartTransformedProps } from '@superset-ui/plugin-chart-table/lib/types';

export { OwnState };

export interface StyloPieTableChartProps extends ChartProps {
  formData: QueryFormData & {
    drillDown: boolean;
    groupby: string[];
  };
  queriesData: ChartDataResponseResult[];
  ownState: OwnState;
}

export interface StyloPieTableTransformedProps {
  pie: PieChartTransformedProps;
  table: TableChartTransformedProps;
}

// TODO need other function for raw-table-data
export function makeTableFormData(formData: QueryFormData, drilldown: DrillDownType) {
  return {
    ...formData,
    groupby: [],
    queryMode: 'raw',
    metric: undefined,
    serverPageLength: 10,
    orderDesc: true,
    percentMetrics: [],
    adhocFilters: drilldown.filters.map((f: any) => {
      return <SetAdhocFilter>{
        expressionType: 'SIMPLE',
        subject: f.col,
        operator: f.op,
        operatorId: f.op,
        comparator: f?.val || [],
        clause: 'WHERE',
        sqlExpression: null,
        isExtra: false,
        isNew: false,
      };
    }),
  };
}
