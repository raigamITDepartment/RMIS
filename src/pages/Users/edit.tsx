import { useParams } from "react-router-dom";
import PageBreadcrumb from "@components/common/PageBreadCrumb";
import CreateOrUpdateUserForm from "@components/user/user-form";
import { useUserQuery } from "../../data/user";
import Loader from "@components/ui/loader/loader";
import ErrorMessage from "@components/ui/error-message";

export default function EditUserPage() {
  const { id } = useParams();

  const { user, loading, error } = useUserQuery({
    slug: id!,
  });

  if (loading) return <Loader text="Loading..." />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      <PageBreadcrumb pageTitle="Edit User" />
      {user && <CreateOrUpdateUserForm initialValues={user} />}
    </>
  );
}
