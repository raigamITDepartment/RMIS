import { useQuery } from "@tanstack/react-query";
import {
  InvoiceStatusAuditPaginator,
  InvoiceStatusAuditQueryOptions,
} from "../types";
import { API_ENDPOINTS } from "./client/api-endpoints";
import { mapPaginatorData } from "../utils/data-mappers";
import { InvoiceStatusAuditClient } from "./client/invoice-status-audit";

export const useInvoiceStatusAuditsQuery = (
  params: Partial<InvoiceStatusAuditQueryOptions>,
  options: any = {}
) => {
  const { data, error, isLoading } = useQuery<
    InvoiceStatusAuditPaginator,
    Error
  >(
    [API_ENDPOINTS.INVOICE_STATUS_AUDITS, params],
    ({ queryKey, pageParam }) =>
      InvoiceStatusAuditClient.paginated(
        Object.assign({}, queryKey[1], pageParam)
      ),
    {
      keepPreviousData: true,
      ...options,
    }
  );

  return {
    invoiceStatusAudits: data?.content ?? [],
    paginatorInfo: mapPaginatorData(data),
    error,
    loading: isLoading,
  };
};
