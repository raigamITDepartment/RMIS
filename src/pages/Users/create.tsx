import PageBreadcrumb from "@components/common/PageBreadCrumb";
import CreateOrUpdateUserForm from "@components/user/user-form";

export default function CreateUserPage() {
  return (
    <>
      <PageBreadcrumb pageTitle="Create User" />

      <CreateOrUpdateUserForm />
    </>
  );
}
