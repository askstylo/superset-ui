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
import { ensureIsArray, t } from '@superset-ui/core';
import { ControlPanelConfig, formatSelectOptions, sections } from '@superset-ui/chart-controls';

// everything here is essentially duplicated from pie chart, but discarding
// stuff that we want to be constant and adding the "columns" field that
// table chart needs.
const config: ControlPanelConfig = {
  controlPanelSections: [
    sections.legacyRegularTime,
    {
      label: t('Query'),
      expanded: true,
      controlSetRows: [
        [
          {
            name: 'child_chart_type',
            config: {
              type: 'SelectControl',
              label: t('Base Chart Type'),
              default: 'pie',
              choices: formatSelectOptions(['pie', 'bar'])
            }
          }
        ],
        ['groupby'],
        ['metric'],
        ['row_limit'],
        [
          {
            name: 'all_columns',
            config: {
              type: 'SelectControl',
              label: t('Columns'),
              description: t('Columns to display'),
              multi: true,
              freeForm: true,
              allowAll: true,
              commaChoosesOption: false,
              default: [],
              valueKey: 'column_name',
              mapStateToProps: ({ datasource, controls }, controlState) => ({
                options: datasource?.columns || [],
                externalValidationErrors:
                  ensureIsArray(controlState.value).length === 0 ? [t('must have a value')] : [],
              }),
            },
          },
        ],
        [
          {
            name: 'order_by_cols',
            config: {
              type: 'SelectControl',
              label: t('Ordering'),
              description: t('Order results by selected columns'),
              multi: true,
              default: [],
              mapStateToProps: ({ datasource }) => ({
                choices: datasource?.order_by_choices || [],
              }),
            },
          },
        ],
      ],
    },
  ],
};

export default config;
