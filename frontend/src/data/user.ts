import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetParams, User, UserPaginator, UserQueryOptions } from "../types";
import { API_ENDPOINTS } from "./client/api-endpoints";
import { UserClient } from "./client/user";
import { mapPaginatorData } from "../utils/data-mappers";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export const useUsersQuery = (
  params: Partial<UserQueryOptions>,
  options: any = {}
) => {
  const { data, error, isLoading } = useQuery<UserPaginator, Error>(
    [API_ENDPOINTS.USERS, params],
    ({ queryKey, pageParam }) =>
      UserClient.paginated(Object.assign({}, queryKey[1], pageParam)),
    {
      keepPreviousData: true,
      ...options,
    }
  );

  return {
    users: data?.content ?? [],
    paginatorInfo: mapPaginatorData(data),
    error,
    loading: isLoading,
  };
};

export const useUserQuery = ({ slug }: GetParams) => {
  const { data, error, isLoading } = useQuery<User, Error>(
    [API_ENDPOINTS.USERS, { slug }],
    () => UserClient.get({ slug })
  );

  return {
    user: data,
    error,
    loading: isLoading,
  };
};

export const useCreateUserMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation(UserClient.create, {
    onSuccess: async () => {
      navigate("/users");
      toast.success("Successfully created!");
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.USERS);
    },
    onError: (error: any) => {
      toast.error("Something going wrong!");
    },
  });
};

export const useUpdateUserMutation = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  return useMutation(UserClient.update, {
    onSuccess: async () => {
      navigate("/users");
      toast.success("Successfully updated!");
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.USERS);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });
};
