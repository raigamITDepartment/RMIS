import {
  CreateRequest,
  QueryOptions,
  Request,
  RequestPaginator,
  RequestQueryOptions,
} from "../../types";
import { API_ENDPOINTS } from "./api-endpoints";
import { crudFactory } from "./crud-factory";
import { HttpClient } from "./http-client";

export const RequestClient = {
  ...crudFactory<Request, QueryOptions, CreateRequest>(API_ENDPOINTS.REQUESTS),
  paginated: ({ ...params }: Partial<RequestQueryOptions>) => {
    return HttpClient.get<RequestPaginator>(API_ENDPOINTS.REQUESTS, {
      searchJoin: "and",
      // self,
      ...params,
      page: params?.page ? params.page - 1 : 0,
      search: HttpClient.formatSearchParams({}),
    });
  },
};
