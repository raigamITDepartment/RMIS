import PageMeta from "@components/common/PageMeta";
import AuthLayout from "../AuthPages/AuthPageLayout";
import SignInForm from "@components/auth/SignInForm";

export default function SignIn() {
  return (
    <>
      <PageMeta
        title="Raigam Invoice Management System"
        description="Invoice Management System"
      />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
