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
import React, { PureComponent } from 'react';
import { default as EchartsPie } from '@superset-ui/plugin-chart-echarts/lib/Pie/EchartsPie';
import { default as TableChart } from '@superset-ui/plugin-chart-table/lib/TableChart';
import { StyloPieTableTransformedProps } from './types';

/**
 * This is a simple component which wraps an echarts Pie Chart with drill-down
 * permanently enabled.  However, this component adds a switch from the pie
 * chart to a TableChart after reaching the ultimate depth in the drilldon hierarchy.
 */
export default class StyloPieTable extends PureComponent<StyloPieTableTransformedProps> {
  constructor(props: StyloPieTableTransformedProps) {
    super(props);
    this.state = { drilldown: this.props.pie.ownState?.drilldown };
    this.drilldownReset = this.drilldownReset.bind(this);
  }

  // This function resets the drilldown to the most general level on button press.
  drilldownReset() {
    if (this.props.pie.ownState) {
      let drilldown = { ...this.props.pie.ownState.drilldown };
      drilldown.currentIdx = 0;
      drilldown.filters = [];

      this.props.pie.setDataMask({
        ownState: { drilldown },
      });
    }
  }

  /**
   * In transformProps.ts, we take the user configuration from the control panel and build the properties
   * that are needed for both the pie chart and the table chart.
   * In this function, we just detect if the drilldown is at ultimate depth.  If it is, we show the table
   * chart.  If it isn't, we show the pie chart.
   */
  render() {
    if (this.props.pie.ownState?.drilldown.currentIdx == this.props.pie.formData.groupby.length) {
      return (
        <div>
          <button onClick={this.drilldownReset}>Reset</button>
          <TableChart {...this.props.table} />
        </div>
      );
    } else {
      return <EchartsPie {...this.props.pie} />;
    }
  }
}
