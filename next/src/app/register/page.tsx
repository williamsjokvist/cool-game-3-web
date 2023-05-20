import { type FunctionComponent } from "react";
import RegisterForm from "@/components/register/form";

export const revalidate = 60;

const RegisterPage: FunctionComponent = () => {
  return (
    <main>
      <RegisterForm/>
    </main>
  );
};

export default RegisterPage;
