import { DataMask, DrillDown } from "@superset-ui/core";
import React, { useCallback } from "react";
import Echart from "../components/Echart";
import { EventHandlers } from "../types";
import { BarChartTransformedProps } from "./types";

export default function EchartsBar({
  formData,
  height,
  ownState,
  width,
  echartOptions,
  labelMap,
  setDataMask,
  selectedValues,
}: BarChartTransformedProps) {
  const {
    groupby
  } = formData;

  const handleChange = useCallback(
    (values: string[]) => {
      if (!formData.emitFilter && !formData.drillDown) {
        return;
      }

      const groupbyValues = values.map(value => labelMap[value]);

      let dataMask: DataMask = {};
      if (formData.emitFilter) {
        dataMask = {
          extraFormData: {
            filters:
              values.length === 0
                ? []
                : groupby.map((col, idx) => {
                    const val = groupbyValues.map(v => v[idx]);
                    return {
                      col,
                      op: 'IN',
                      val: val as (string | number | boolean)[],
                    };
                  }),
          },
          filterState: {
            value: groupbyValues.length ? groupbyValues : null,
            selectedValues: values.length ? values : null,
          },
        }
      }

      if (formData.drillDown && ownState?.drilldown) {
        const drilldown = DrillDown.drillDown(ownState?.drilldown, values[0])
        dataMask = {
          extraFormData: {
            filters: drilldown.filters,
          },
          filterState: {
            value: groupbyValues.length && drilldown.filters.length > 0 ? groupbyValues : null,
          },
          ownState: {
            drilldown: drilldown,
          }
        }
      }

      setDataMask(dataMask);
    },
    [groupby, labelMap, setDataMask, selectedValues],
  );

  const eventHandlers: EventHandlers = {
    click: props => {
      const { name } = props;
      const values = Object.values(selectedValues);
      if (values.includes(name)) {
        handleChange(values.filter(v => v !== name));
      } else {
        handleChange([name]);
      }
    },
  };
  return (
    <Echart
      height={height}
      width={width}
      echartOptions={echartOptions}
      eventHandlers={eventHandlers}
      selectedValues={selectedValues}
    />
  )
}