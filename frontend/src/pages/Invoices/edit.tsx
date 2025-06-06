import { useParams } from "react-router-dom";
import PageBreadcrumb from "@components/common/PageBreadCrumb";
import CreateOrUpdateInvoiceForm from "@components/invoice/invoice-form";
import { useInvoiceQuery } from "../../data/invoice";
import Loader from "@components/ui/loader/loader";
import ErrorMessage from "@components/ui/error-message";

export default function EditInvoicePage() {
  const { id } = useParams();

  const { invoice, loading, error } = useInvoiceQuery({
    slug: id!,
  });

  if (loading) return <Loader text="Loading..." />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      <PageBreadcrumb pageTitle="Edit Invoice" />
      {invoice && <CreateOrUpdateInvoiceForm initialValues={invoice} />}
    </>
  );
}
