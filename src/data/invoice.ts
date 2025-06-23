import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  GetParams,
  Invoice,
  InvoicePaginator,
  InvoiceQueryOptions,
} from "../types";
import { API_ENDPOINTS } from "./client/api-endpoints";
import { mapPaginatorData } from "../utils/data-mappers";
import { InvoiceClient } from "./client/invoice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export const useInvoicesQuery = (
  params: Partial<InvoiceQueryOptions>,
  options: any = {}
) => {
  const { data, error, isLoading } = useQuery<InvoicePaginator, Error>(
    [API_ENDPOINTS.INVOICES, params],
    ({ queryKey, pageParam }) =>
      InvoiceClient.paginated(Object.assign({}, queryKey[1], pageParam)),
    {
      keepPreviousData: true,
      ...options,
    }
  );

  return {
    invoices: data?.content ?? [],
    paginatorInfo: mapPaginatorData(data),
    error,
    loading: isLoading,
  };
};

export const useInvoiceQuery = ({ slug }: GetParams) => {
  const { data, error, isLoading } = useQuery<Invoice, Error>(
    [API_ENDPOINTS.INVOICES, { slug }],
    () => InvoiceClient.get({ slug })
  );

  return {
    invoice: data,
    error,
    loading: isLoading,
  };
};

export const useCreateInvoiceMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(InvoiceClient.create, {
    onSuccess: async () => {
      toast.success("Successfully created!");
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.INVOICES);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });
};

export const useUpdateInvoiceMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation(InvoiceClient.update, {
    onSuccess: async () => {
      navigate("/invoices");
      toast.success("Successfully updated!");
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.INVOICES);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });
};

export const usePatchInvoiceMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation(InvoiceClient.patch,  {
    onSuccess: async () => {
      navigate("/invoices");
      toast.success("Successfully updated!");
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.INVOICES);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });
};

export const useInvoiceLocaitonsQuery = (
  params: Partial<InvoiceQueryOptions>,
  options: any = {}
) => {
  const { data, error, isLoading } = useQuery<InvoicePaginator, Error>(
    [`${API_ENDPOINTS.INVOICES}/locations`, params],
    ({ queryKey, pageParam }) =>
      InvoiceClient.locations(Object.assign({}, queryKey[1], pageParam)),
    {
      keepPreviousData: true,
      ...options,
    }
  );

  return {
    locations: data?.content ?? [],
    paginatorInfo: mapPaginatorData(data),
    error,
    loading: isLoading,
  };
};
