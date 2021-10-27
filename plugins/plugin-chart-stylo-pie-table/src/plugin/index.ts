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
import { t, ChartMetadata, ChartPlugin, QueryFormData } from '@superset-ui/core';
import buildQuery from './buildQuery';
import controlPanel from './controlPanel';
import transformProps from './transformProps';
import thumbnail from '../images/thumbnail.png';
import { StyloPieTableChartProps } from '../types';

export class StyloPieTableChartPlugin extends ChartPlugin<QueryFormData, StyloPieTableChartProps> {
  constructor() {
    // todo, fill in more useful metadata
    const metadata = new ChartMetadata({
      category: t('Part of a Whole'),
      description: t(`Interactive pie chart with traversable hierarchy.  Clicking
        on a slice of the pie navigates to the next deeper level of the hierarchy.
        Clicking on a slice at the deepest level of the hierarchy transitions the
        display to a table chart to view the data rows that make up the slice.`),
      name: t('Stylo Pie Table'),
      thumbnail,
    });

    super({
      buildQuery,
      controlPanel,
      loadChart: () => import('../StyloPieTable'),
      metadata,
      transformProps,
    });
  }
}
