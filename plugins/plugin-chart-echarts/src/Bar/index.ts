import { ChartMetadata, ChartPlugin, t } from "@superset-ui/core";
import transformProps from "./transformProps";
import buildQuery from "./buildQuery";
import controlPanel from './controlPanel';
import { EchartsBarChartProps, EchartsBarFormData } from "./types";
import thumbnail from './images/thumbnail.png';

export default class EchartsBarChartPlugin extends ChartPlugin<
  EchartsBarFormData,
  EchartsBarChartProps
> {
  constructor() {
    super({
      controlPanel,
      buildQuery,
      loadChart: () => import('./EchartsBar'),
      metadata: new ChartMetadata({
        name: t('Bar Chart (echarts)'),
        thumbnail
      }),
      transformProps
    })
  }
}