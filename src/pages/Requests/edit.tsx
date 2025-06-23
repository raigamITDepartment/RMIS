import { useParams } from "react-router";
import PageBreadcrumb from "@components/common/PageBreadCrumb";
import CreateOrUpdateRequestForm from "@components/request/request-form";
import { useRequestQuery } from "../../data/request";
import Loader from "@components/ui/loader/loader";
import ErrorMessage from "@components/ui/error-message";

export default function EditRequestPage() {
  const { id } = useParams();

  const { request, loading, error } = useRequestQuery({
    slug: id!,
  });

  if (loading) return <Loader text="Loading..." />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      <PageBreadcrumb pageTitle="Edit Request" />
      {request && <CreateOrUpdateRequestForm initialValues={request} />}
    </>
  );
}
