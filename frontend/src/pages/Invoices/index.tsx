import PageBreadcrumb from "@components/common/PageBreadCrumb";
import PageMeta from "@components/common/PageMeta";
import InvoiceList from "@components/invoice/invoice-list";
import Loader from "@components/ui/loader/loader";
import ErrorMessage from "@components/ui/error-message";
import { Fragment, useState } from "react";
import { SortOrder } from "@types";
import { useInvoicesQuery } from "../../data/invoice";
import Card from "@components/common/card";
import Search from "@components/common/search";
import { ArrowUp } from "@components/icons/arrow-up";
import { ArrowDown } from "@components/icons/arrow-down";
import cn from "classnames";
import InvoiceFilter from "@components/invoice/invoice-filter";
import { Menu, Transition } from "@headlessui/react";
import { DownloadIcon, MoreDotIcon } from "../../icons";
import classNames from "classnames";

export default function Invoices() {
  const [searchTerm, setSearchTerm] = useState("");
  const [fgsStatus, setFgsStatus] = useState("");
  const [financeStatus, setFinanceStatus] = useState("");
  const [visible, setVisible] = useState(true);
  const [page, setPage] = useState(1);
  const [orderBy, setOrder] = useState("createdAt");
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const token = localStorage.getItem("token");

  const { invoices, loading, error, paginatorInfo } = useInvoicesQuery({
    size: 15,
    companyName: searchTerm,
    fgsStatus: fgsStatus ? fgsStatus : undefined,
    financeStatus: financeStatus ? financeStatus : undefined,
    start_date: startDate ? startDate.toISOString() : undefined,
    end_date: endDate ? endDate.toISOString() : undefined,
    page,
    orderBy,
    sortedBy,
  });

  if (loading) return <Loader text="Loading..." />;
  if (error) return <ErrorMessage message={error.message} />;

  function handlePagination(current: number) {
    setPage(current);
  }

  function handleSearch({ searchText }: { searchText: string }) {
    setSearchTerm(searchText);
    setPage(1);
  }

  const onDateRangeFilter = (dates: [Date | null, Date | null]) => {
    if (dates) {
      const [start, end] = dates;

      // Increment end date by 1 day
      const incrementedEndDate = end ? new Date(end) : null;
      if (incrementedEndDate) {
        incrementedEndDate.setDate(incrementedEndDate.getDate() + 1);
      }

      setStartDate(start);
      setEndDate(incrementedEndDate);
    } else {
      setStartDate(null);
      setEndDate(null);
    }
  };

  function toggleVisible() {
    setVisible((v) => !v);
  }

  async function handleExportOrder() {
    try {
      const params = new URLSearchParams({
        page: (page - 1).toString(), // Spring uses 0-based pagination
        size: "999",
        sort: orderBy,
        direction: sortedBy.toLowerCase(), // assuming sortedBy is "ASC" or "DESC"
      });

      if (searchTerm) params.append("search", `companyName:${searchTerm}`);
      if (fgsStatus) params.append("fgsStatus", fgsStatus);
      if (financeStatus) params.append("financeStatus", financeStatus);
      if (startDate) params.append("start_date", startDate.toISOString());
      if (endDate) params.append("end_date", endDate.toISOString());

      const response = await fetch(
        `/api/invoices/export?${params.toString()}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.ms-excel",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to export file");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "invoices.xls";
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export error:", error);
    }
  }

  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Invoices" />
      <Card className="mb-8 flex flex-col">
        <div className="flex w-full flex-col items-center md:flex-row">
          <div className="flex w-full flex-row items-center ms-auto md:w-2/4">
            <Search
              onSearch={handleSearch}
              placeholderText="Search by Company Name"
            />
            <Menu
              as="div"
              className="relative inline-block ltr:text-left rtl:text-right"
            >
              <Menu.Button className="group p-2 dark:text-white/90">
                <MoreDotIcon />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items
                  as="ul"
                  className={classNames(
                    "shadow-700 dark:text-black/90 dark:bg-white  absolute z-50 mt-2 w-52 overflow-hidden rounded border border-border-200 bg-light py-2 focus:outline-none ltr:right-0 ltr:origin-top-right rtl:left-0 rtl:origin-top-left"
                  )}
                >
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleExportOrder}
                        className={classNames(
                          "flex w-full items-center space-x-3 px-5 py-2.5 text-sm font-semibold capitalize transition duration-200 hover:text-accent focus:outline-none rtl:space-x-reverse",
                          active ? "text-accent" : "text-body"
                        )}
                      >
                        <DownloadIcon className="w-5 shrink-0" />
                        <span className="whitespace-nowrap">Invoices</span>
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>

          <button
            className="mt-5 flex items-center whitespace-nowrap text-base font-semibold text-accent md:mt-0 md:ms-5 dark:text-white/90"
            onClick={toggleVisible}
          >
            Filters
            {visible ? (
              <ArrowUp className="ms-2" />
            ) : (
              <ArrowDown className="ms-2" />
            )}
          </button>
        </div>

        <div
          className={cn("flex w-full transition", {
            "visible h-auto": visible,
            "invisible h-0": !visible,
          })}
        >
          <div className="mt-5 flex w-full flex-col border-t border-gray-200 pt-5 md:mt-8 md:flex-row md:items-center md:pt-8">
            <InvoiceFilter
              className="w-full"
              onFGStatusFilter={(object: any) => {
                setFgsStatus(object?.value);
                setPage(1);
              }}
              onFinanceStatusFilter={(object: any) => {
                setFinanceStatus(object?.value);
                setPage(1);
              }}
              onDateRangeFilter={onDateRangeFilter}
              enableDateRange
              enableFGStatus
              enableFinanceStatus
            />
          </div>
        </div>
      </Card>
      <div className="space-y-6">
        <InvoiceList
          invoices={invoices}
          paginatorInfo={paginatorInfo}
          onPagination={handlePagination}
          onOrder={setOrder}
          onSort={setColumn}
        />
      </div>
    </>
  );
}
