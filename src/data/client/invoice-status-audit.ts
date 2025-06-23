import {
  InvoiceStatusAudit,
  InvoiceStatusAuditPaginator,
  InvoiceStatusAuditQueryOptions,
  QueryOptions,
} from "../../types";
import { API_ENDPOINTS } from "./api-endpoints";
import { crudFactory } from "./crud-factory";
import { HttpClient } from "./http-client";

export const InvoiceStatusAuditClient = {
  ...crudFactory<InvoiceStatusAudit, QueryOptions, InvoiceStatusAudit>(
    API_ENDPOINTS.INVOICE_STATUS_AUDITS
  ),
  paginated: ({
    username,
    ...params
  }: Partial<InvoiceStatusAuditQueryOptions>) => {
    return HttpClient.get<InvoiceStatusAuditPaginator>(
      API_ENDPOINTS.INVOICE_STATUS_AUDITS,
      {
        searchJoin: "and",
        // self,
        ...params,
        page: params?.page ? params.page - 1 : 0,
        search: HttpClient.formatSearchParams({
          username,
        }),
      }
    );
  },
};
