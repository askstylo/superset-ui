import { DataRecordValue, DrillDown, getMetricLabel, getTimeFormatter } from "@superset-ui/core";
import { BarSeriesOption, EChartsOption } from "echarts";
import { defaultGrid } from "../defaults";
import { DEFAULT_LEGEND_FORM_DATA } from "../types";
import { extractGroupbyLabel, getChartPadding, getColtypesMapping, getLegendProps } from "../utils/series";
import { BarChartTransformedProps, EchartsBarChartProps, EchartsBarFormData } from "./types";

export default function transformProps(chartProps: EchartsBarChartProps): BarChartTransformedProps {
  const { formData, height, filterState, hooks, width, ownState, queriesData } = chartProps;
  const { data = [] } = queriesData[0];
  const coltypeMapping = getColtypesMapping(queriesData[0]);

  const {
    colorScheme,
    showLegend,
    legendOrientation,
    legendType,
    legendMargin,
    labelsOutside,
    labelLine,
    metric,
    groupby: hierarchyOrColumns,
    dateFormat,
    drillDown,
  }: EchartsBarFormData = { ...DEFAULT_LEGEND_FORM_DATA, ...formData };
  const groupby = drillDown && ownState?.drilldown ? [DrillDown.getColumn(ownState.drilldown, [])] : hierarchyOrColumns;
  const metricLabel = getMetricLabel(metric);

  data.sort((a, b) => {
    return (formData.orderDesc ? -1 : 1) * 
      (<number> b[metricLabel] - <number> a[metricLabel]);
  });

  const keys = data.map(datum =>
    extractGroupbyLabel({
      datum,
      groupby,
      coltypeMapping,
      timeFormatter: getTimeFormatter(dateFormat),
    }),
  );
  const labelMap = data.reduce((acc: Record<string, DataRecordValue[]>, datum) => {
    const label = extractGroupbyLabel({
      datum,
      groupby,
      coltypeMapping,
      timeFormatter: getTimeFormatter(dateFormat),
    });
    return {
      ...acc,
      [label]: groupby.map(col => datum[col]),
    };
  }, {});

  const { setDataMask = () => {} } = hooks;

  const series: BarSeriesOption[] = [
    {
      type: 'bar',
      ...getChartPadding(showLegend, legendOrientation, legendMargin),
      animation: false,
      labelLine: labelsOutside && labelLine ? { show: true } : { show: false },
      data: data.map(datum => {
        return <number> datum[metricLabel];
      }),
      color: colorScheme
    },
  ];

  const selectedValues = (filterState.selectedValues || []).reduce(
    (acc: Record<string, number>, selectedValue: string) => {
      const index = keys.findIndex(name => name === selectedValue);
      return {
        ...acc,
        [index]: selectedValue,
      };
    },
    {},
  );

  const echartOptions: EChartsOption = {
    grid: {
      ...defaultGrid,
    },
    xAxis: {
      type: 'category',
      data: keys,
      axisLabel: {
        rotate: -45
      },
    },
    yAxis: {
      type: 'value'
    },
    legend: {
      ...getLegendProps(legendType, legendOrientation, showLegend),
      data: keys,
    },
    series,
  };

  return {
    formData,
    height,
    ownState,
    width,
    labelMap,
    echartOptions,
    setDataMask,
    selectedValues
  };
}