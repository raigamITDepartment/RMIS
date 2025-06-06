import {
  CreateUser,
  QueryOptions,
  User,
  UserPaginator,
  UserQueryOptions,
} from "../../types";
import { API_ENDPOINTS } from "./api-endpoints";
import { crudFactory } from "./crud-factory";
import { HttpClient } from "./http-client";

export const UserClient = {
  ...crudFactory<User, QueryOptions, CreateUser>(API_ENDPOINTS.USERS),
  paginated: ({ username, ...params }: Partial<UserQueryOptions>) => {
    return HttpClient.get<UserPaginator>(API_ENDPOINTS.USERS, {
      searchJoin: "and",
      // self,
      ...params,
      page: params?.page ? params.page - 1 : 0,
      search: HttpClient.formatSearchParams({
        username,
      }),
    });
  },
};
