import PrimaryMetric from '../PrimaryMetric/PrimaryMetric';
import SecondaryMetricContainer from '../SecondaryMetricsContainer/SecondaryMetricsContainer';
import FooterSplitter from '../FooterSplitter/FooterSplitter';
import React from 'react';
import { Metric } from '../../types';

export default function Result(props: { primaryMetric: Metric; secondaryMetrics: Metric[] }) {
  const { primaryMetric, secondaryMetrics } = props;
  return (
    <div>
      <PrimaryMetric primaryMetric={primaryMetric} />
      <SecondaryMetricContainer secondaryMetrics={secondaryMetrics} />
      <FooterSplitter />
    </div>
  );
}
