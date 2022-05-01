import { AnyFilterObject } from '@/types/Filters';

const prepareParamsQuery = (filterObject: AnyFilterObject): string => {
  let finalQuery = {};

  for (const key in filterObject) {
    if (filterObject[key] !== undefined && filterObject[key].length === 0) {
      delete filterObject[key];
    }

    if (filterObject[key] !== undefined) {
      finalQuery = {
        ...finalQuery,
        [key]: filterObject[key],
      };
    }
  }

  if (Object.keys(finalQuery).length !== 0) {
    return new URLSearchParams(finalQuery).toString();
  }

  return '';
};

export { prepareParamsQuery };
