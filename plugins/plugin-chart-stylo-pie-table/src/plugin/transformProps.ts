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
import { default as pieTransform } from '@superset-ui/plugin-chart-echarts/lib/Pie/transformProps';
import { default as barTransform } from '@superset-ui/plugin-chart-echarts/lib/Bar/transformProps';
import {
  DEFAULT_FORM_DATA,
  EchartsPieChartProps,
} from '@superset-ui/plugin-chart-echarts/lib/Pie/types';
import { default as tableTransform } from '@superset-ui/plugin-chart-table/lib/transformProps';
import { TableChartProps } from '@superset-ui/plugin-chart-table/lib/types';
import {
  makeTableFormData,
  makeTableRawFormData,
  StyloPieTableChartProps,
  StyloPieTableTransformedProps,
} from '../types';
import { DrillDown } from '@superset-ui/core';
import { EchartsBarChartProps } from '@superset-ui/plugin-chart-echarts/lib/Bar/types';

export default function transformProps(
  chartProps: StyloPieTableChartProps,
): StyloPieTableTransformedProps {
  /**
   * This function is called after a successful response has been
   * received from the chart data endpoint, and is used to transform
   * the incoming data prior to being sent to the Visualization.
   *
   * For the purposes of this plugin, we are merely taking the form data,
   * appending data that we need to be constant (for example, drilldown=true),
   * and then passing the appended data to the existing pie chart and table chart
   * transformProps functions to do the actual work.
   */
  const { formData } = chartProps;

  const echartProps = {
    formData: {
      ...DEFAULT_FORM_DATA,
      ...formData,
      drillDown: true,
      metrics: formData.metrics || [],
    },
    /**
     * This looks really weird, but because of the order that react evaluates
     * the child components, ownState is initially *not* populated at all, but
     * after the first time EchartsPie is interacted it will be.  So, we have
     * to use the existing drilldown if it exists.
     * The other thing that's going on here is that we need a dummy value in the
     * drilldown hierarchy so that after the user selects the ultimate-depth
     * filter value, we can know when to switch to the table chart.  However,
     * again because of the order of operations, it has to be a valid column
     * value.  For simplicity, we just use the first value again, because if the
     * user picks an invalid value for it, the whole thing won't work anyway.
     */
    ownState: {
      drilldown:
        chartProps.ownState.drilldown ||
        DrillDown.fromHierarchy(formData.groupby.concat(formData.groupby[0])),
    },
  };

  // concoct EchartsPieChartProps from chartProps
  const pieProps: EchartsPieChartProps = {
    ...chartProps,
    ...echartProps,
  };
  const barProps: EchartsBarChartProps = {
    ...pieProps,
    ...echartProps,
  };
  const tableFormData = makeTableFormData(chartProps.formData, pieProps.ownState.drilldown);
  const tableProps: TableChartProps = {
    ...chartProps,
    ownCurrentState: {},
    formData: tableFormData,
    rawFormData: makeTableRawFormData(chartProps.formData, pieProps.ownState.drilldown),
  };

  return {
    childChartType: formData.childChartType,
    pie: pieTransform(pieProps),
    bar: barTransform(barProps),
    table: tableTransform(tableProps),
  };
}
