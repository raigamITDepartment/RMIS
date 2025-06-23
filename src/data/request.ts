import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  GetParams,
  Request,
  RequestPaginator,
  RequestQueryOptions,
} from "../types";
import { API_ENDPOINTS } from "./client/api-endpoints";
import { mapPaginatorData } from "../utils/data-mappers";
import { toast } from "react-toastify";
import { RequestClient } from "./client/request";
import { useNavigate } from "react-router";

export const useRequestsQuery = (
  params: Partial<RequestQueryOptions>,
  options: any = {}
) => {
  const { data, error, isLoading } = useQuery<RequestPaginator, Error>(
    [API_ENDPOINTS.REQUESTS, params],
    ({ queryKey, pageParam }) =>
      RequestClient.paginated(Object.assign({}, queryKey[1], pageParam)),
    {
      keepPreviousData: true,
      ...options,
    }
  );

  return {
    requests: data?.content ?? [],
    paginatorInfo: mapPaginatorData(data),
    error,
    loading: isLoading,
  };
};

export const useRequestQuery = ({ slug }: GetParams) => {
  const { data, error, isLoading } = useQuery<Request, Error>(
    [API_ENDPOINTS.REQUESTS, { slug }],
    () => RequestClient.get({ slug })
  );

  return {
    request: data,
    error,
    loading: isLoading,
  };
};

export const useCreateRequestMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation(RequestClient.create, {
    onSuccess: async () => {
      navigate("/requests");
      toast.success("Successfully created!");
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.REQUESTS);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });
};

export const useUpdateRequestMutation = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  return useMutation(RequestClient.update, {
    onSuccess: async () => {
      navigate("/requests");
      toast.success("Successfully updated!");
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.REQUESTS);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? 'Something went wrong!');
    },
  });
};
