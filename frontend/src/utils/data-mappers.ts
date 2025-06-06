import camelCaseKeys from "camelcase-keys";
import { MappedPaginatorInfo, PaginatorInfo } from "../types";

export const mapPaginatorData = (
  obj: PaginatorInfo<any> | undefined
): MappedPaginatorInfo | null => {
  if (!obj) return null;
  const {
    //@ts-ignore
    data,
    ...formattedValues
  } = camelCaseKeys(
    //@ts-ignore
    obj
  );
  //@ts-ignore
  return {
    // ...formattedValues,
    total: formattedValues.totalElements,
    currentPage: formattedValues.number + 1,
    perPage: formattedValues.size,
    hasMorePages:
      //@ts-ignore
      formattedValues.lastPage !== formattedValues.currentPage,
  };
};
