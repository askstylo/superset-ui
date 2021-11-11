import { buildQueryContext, DrillDown, QueryFormData } from '@superset-ui/core';
import { OwnState } from '../Pie/types';

export default function buildQuery(formData: QueryFormData, options: any) {
  const { drillDown } = formData;

  return buildQueryContext(formData, baseQueryObject => {
    let queryObject = {
      ...baseQueryObject,
    };

    if (drillDown) {
      const groupby = <string[]>formData.groupby;
      const ownState = <OwnState>options.ownState || {
        drilldown: DrillDown.fromHierarchy(groupby),
      };
      queryObject = {
        ...queryObject,
        ...(drillDown && {
          groupby: [DrillDown.getColumn(ownState.drilldown, groupby)],
          filters: [
            ...(baseQueryObject.filters || []),
            ...DrillDown.getFilters(ownState.drilldown, groupby),
          ],
        }),
      };
    }

    return [queryObject];
  });
}
