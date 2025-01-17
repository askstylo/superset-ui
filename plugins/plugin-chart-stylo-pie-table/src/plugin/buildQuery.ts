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
//import { buildQueryContext, QueryFormData, DrillDown } from '@superset-ui/core';
import { DrillDown, QueryFormData } from '@superset-ui/core';
import { OwnState, makeTableRawFormData } from '../types';
import { default as tableBuildQuery } from '@superset-ui/plugin-chart-table/lib/buildQuery';
import { default as pieBuildQuery } from '@superset-ui/plugin-chart-echarts/lib/Pie/buildQuery';
import { default as barBuildQuery } from '@superset-ui/plugin-chart-echarts/lib/Bar/buildQuery';

/**
 * The buildQuery function is used to create an instance of QueryContext that's
 * sent to the chart data endpoint. In addition to containing information of which
 * datasource to use, it specifies the type (e.g. full payload, samples, query) and
 * format (e.g. CSV or JSON) of the result and whether or not to force refresh the data from
 * the datasource as opposed to using a cached copy of the data, if available.
 *
 * More importantly though, QueryContext contains a property `queries`, which is an array of
 * QueryObjects specifying individual data requests to be made. A QueryObject specifies which
 * columns, metrics and filters, among others, to use during the query. Usually it will be enough
 * to specify just one query based on the baseQueryObject, but for some more advanced use cases
 * it is possible to define post processing operations in the QueryObject, or multiple queries
 * if a viz needs multiple different result sets.
 */
export default function buildQuery(formData: QueryFormData, options: any) {
  const ownState =
    <OwnState>options.ownState || DrillDown.fromHierarchy(<string[]>formData.groupby);

  if (ownState.drilldown?.currentIdx == formData.groupby?.length) {
    return tableBuildQuery(makeTableRawFormData(formData, ownState.drilldown), {
      ...options,
      extras: { cachedChanges: { undefined: ownState.drilldown.filters } },
    });
  } else {
    switch (formData.child_chart_type) {
      case 'pie':
        return pieBuildQuery({ ...formData, drillDown: true }, options);
      case 'bar':
        return barBuildQuery({ ...formData, drillDown: true }, options);
      default:
        throw new Error('unknown child chart type');
    }
  }
}
