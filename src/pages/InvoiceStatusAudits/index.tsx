import PageBreadcrumb from "@components/common/PageBreadCrumb";
import PageMeta from "@components/common/PageMeta";
import Loader from "@components/ui/loader/loader";
import ErrorMessage from "@components/ui/error-message";
import LogList from "@components/invoiceStatusAudit/log-list";
import { useInvoiceStatusAuditsQuery } from "../../data/invoice-status-audit";
import { useState } from "react";
import { SortOrder } from "@types";

export default function InvoiceStatusAudits() {
  const [page, setPage] = useState(1);
  const [orderBy, setOrder] = useState("id");
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);

  const { invoiceStatusAudits, loading, error, paginatorInfo } =
    useInvoiceStatusAuditsQuery({
      size: 15,
      page,
      orderBy,
      sortedBy,
    });

  if (loading) return <Loader text="Loading..." />;
  if (error) return <ErrorMessage message={error.message} />;

  function handlePagination(current: number) {
    setPage(current);
  }

  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Logs" />
      <div className="space-y-6">
        <LogList
          logs={invoiceStatusAudits}
          paginatorInfo={paginatorInfo}
          onPagination={handlePagination}
          onOrder={setOrder}
          onSort={setColumn}
        />
      </div>
    </>
  );
}
