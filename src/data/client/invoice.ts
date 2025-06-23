import {
  Invoice,
  InvoiceLocationQueryOptions,
  InvoicePaginator,
  InvoiceQueryOptions,
  QueryOptions,
} from "../../types";
import { API_ENDPOINTS } from "./api-endpoints";
import { crudFactory } from "./crud-factory";
import { HttpClient } from "./http-client";

export const InvoiceClient = {
  ...crudFactory<Invoice, QueryOptions, Invoice>(API_ENDPOINTS.INVOICES),
  paginated: ({ companyName, ...params }: Partial<InvoiceQueryOptions>) => {
    return HttpClient.get<InvoicePaginator>(API_ENDPOINTS.INVOICES, {
      searchJoin: "and",
      // self,
      ...params,
      page: params?.page ? params.page - 1 : 0,
      search: HttpClient.formatSearchParams({
        companyName,
      }),
    });
  },
  fetchInvoiceLocations: ({ name, ...params }: Partial<InvoiceLocationQueryOptions>) => {
    return HttpClient.get<InvoicePaginator>(
      `${API_ENDPOINTS.INVOICES}/locations`,
      {
        searchJoin: "and",
        // self,
        ...params,
        page: params?.page ? params.page - 1 : 0,
        search: HttpClient.formatSearchParams({
          name,
        }),
      }
    );
  },
};
