import axios from "axios";
import { useNavigate } from "react-router-dom";

const Axios = axios.create({
  baseURL: "/api/",
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Change request data/error
const AUTH_TOKEN_KEY =
  import.meta.env.VITE_PUBLIC_AUTH_TOKEN_KEY ?? "authToken";

Axios.interceptors.request.use((config) => {
  // const cookies = Cookies.get(AUTH_TOKEN_KEY);
  // let token = "";
  // if (cookies) {
  //   token = JSON.parse(cookies)["token"];
  // }
  
  const token = localStorage.getItem("token");

  // @ts-ignore
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${token}`,
  };
  return config;
});

// Change response data/error here
Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const navigate = useNavigate(); // Use navigate for navigation
    if (
      (error.response && error.response.status === 401) ||
      (error.response && error.response.status === 403) ||
      (error.response &&
        error.response.data.message === "PICKBAZAR_ERROR.NOT_AUTHORIZED")
    ) {
      // Cookies.remove(AUTH_TOKEN_KEY);
      // Router.reload();
      navigate("/login"); // Navigate to the login page
    }
    return Promise.reject(error);
  }
);

function formatBooleanSearchParam(key: string, value: boolean) {
  return value ? `${key}:1` : `${key}:`;
}

interface SearchParamOptions {
  name: string;
  categories: string;
  generics: string;
  code: string;
  type: string;
  first_name: string;
  shop_id: string;
  is_approved: boolean;
  tracking_number: string;
  notice: string;
  notify_type: string;
  faq_title: string;
  is_active: boolean;
  title: string;
  status: string;
  user_id: string;
  target: string;
  refund_reason: string;
  shops: string;
  "users.id": string;
  product_type: string;
  is_read: boolean;
  order_status: string;
  // fgsStatus: string;
  // financeStatus: string;
  companyName: string;
  username: string;
}

export class HttpClient {
  static async get<T>(url: string, params?: unknown) {
    const response = await Axios.get<T>(url, { params });
    return response.data;
  }

  static async post<T>(url: string, data: unknown, options?: any) {
    const response = await Axios.post<T>(url, data, options);
    return response.data;
  }

  static async put<T>(url: string, data: unknown) {
    const response = await Axios.put<T>(url, data);
    return response.data;
  }

  static async delete<T>(url: string) {
    const response = await Axios.delete<T>(url);
    return response.data;
  }

  static formatSearchParams(params: Partial<SearchParamOptions>) {
    return Object.entries(params)
      .filter(([, value]) => Boolean(value))
      .map(([k, v]) =>
        [
          "type",
          "categories",
          "generics",
          "tags",
          "author",
          "manufacturer",
          "shops",
          "refund_reason",
        ].includes(k)
          ? `${k}.slug:${v}`
          : ["is_approved"].includes(k)
          ? formatBooleanSearchParam(k, v as boolean)
          : `${k}:${v}`
      )
      .join(";");
  }
}

export function getFormErrors(error: unknown) {
  if (axios.isAxiosError(error)) {
    return error.response?.data.message;
  }
  return null;
}

export function getFieldErrors(error: unknown) {
  if (axios.isAxiosError(error)) {
    return error.response?.data.errors;
  }
  return null;
}
