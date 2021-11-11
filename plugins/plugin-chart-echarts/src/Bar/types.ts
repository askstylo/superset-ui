import {
  ChartDataResponseResult,
  ChartProps,
  DataRecordValue,
  QueryFormData,
  SetDataMaskHook,
} from '@superset-ui/core';
import { EChartsOption } from 'echarts';
import { DEFAULT_LEGEND_FORM_DATA, EchartsLegendFormData } from '../types';
import { OwnState } from '../Pie/types';

export type EchartsBarFormData = QueryFormData &
  EchartsLegendFormData & {
    groupby: string[];
  };

// @ts-ignore
export const DEFAULT_FORM_DATA: EchartsBarFormData = {
  ...DEFAULT_LEGEND_FORM_DATA,
};

export interface EchartsBarChartProps extends ChartProps {
  formData: EchartsBarFormData;
  queriesData: ChartDataResponseResult[];
  ownState: OwnState;
}

export interface BarChartTransformedProps {
  formData: EchartsBarFormData;
  height: number;
  width: number;
  echartOptions: EChartsOption;
  setDataMask: SetDataMaskHook;
  labelMap: Record<string, DataRecordValue[]>;
  selectedValues: Record<number, string>;
  ownState: OwnState;
}
