"use client";
import { FunctionComponent, PropsWithChildren, useEffect } from "react";
import { useForm, useController } from "react-hook-form";
import SignUpButton from "../common/sign-up-btn";
import { motion, useAnimate, useInView, stagger } from "framer-motion";

type RegisterForm = {
  username: string;
  discord: string;
  birthday: string;
  password: string;
  retypePassword: string;
  email: string;
};

const FormSection: FunctionComponent<PropsWithChildren> = (props) => {
  return (
    <motion.div
      className="flex items-center justify-between gap-4 mb-4"
      initial={{ opacity: 0, filter: "blur(2px)", x: -100 }}
      exit={{ opacity: 0 }}
    >
      {props.children}
    </motion.div>
  );
};

const RegisterForm: FunctionComponent = (props) => {
  const { register, handleSubmit, trigger, formState } =
    useForm<RegisterForm>();

  const onSubmit = (values: RegisterForm) => {
    console.log(values);
  };

  const [scope, animate] = useAnimate()

  useEffect(() => {
    animate("div", { opacity: 1, scale: 1, filter: "blur(0px)", x: 0 }, { delay: stagger(0.1, { startDelay: 0.125 }) })
  })

  return (
    <form
      ref={scope}
      method="post"
      onSubmit={handleSubmit(onSubmit)}
      className="text-white text-center max-w-xl mx-auto mb-8 text-sm"
    >
      <FormSection>
        <label htmlFor="username" className="font-bold">
          Username
        </label>
        <input
          type="text"
          id="username"
          minLength={4}
          maxLength={12}
          placeholder="CoolGamer3"
          className="bg-[rgba(255,255,255,0.125)] max-w-xs w-full px-4 py-2 rounded-md"
          {...register("username")}
        />
      </FormSection>

      <FormSection>
        <label htmlFor="discord" className="font-bold">
          Discord Username
        </label>
        <input
          type="text"
          id="discord"
          placeholder="CoolGamer3#69420"
          className="bg-[rgba(255,255,255,0.125)] max-w-xs w-full px-4 py-2 rounded-md"
          {...register("discord")}
        />
      </FormSection>

      <FormSection>
        <label htmlFor="birthday" className="font-bold">
          Birthday
        </label>
        <input
          type="date"
          id="birthday"
          defaultValue="2003-01-01"
          className="bg-[rgba(255,255,255,0.125)] max-w-xs w-full px-4 py-2 rounded-md"
          {...register("birthday")}
        />
      </FormSection>

      <FormSection>
        <label htmlFor="password" className="font-bold">
          Password
        </label>
        <input
          type="password"
          id="password"
          maxLength={12}
          minLength={4}
          placeholder="********"
          className="bg-[rgba(255,255,255,0.125)] max-w-xs w-full px-4 py-2 rounded-md"
          {...register("password")}
        />
      </FormSection>
      <FormSection>
        <label htmlFor="retypePassword" className="font-bold text-left">
          Retype password
        </label>
        <input
          type="password"
          id="retypePassword"
          maxLength={12}
          minLength={4}
          placeholder="********"
          className="bg-[rgba(255,255,255,0.125)] max-w-xs w-full px-4 py-2 rounded-md"
          {...register("retypePassword")}
        />
      </FormSection>
      <FormSection>
        <label htmlFor="email" className="font-bold">
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="coolgamer3@hotmail.com"
          className="bg-[rgba(255,255,255,0.125)] max-w-xs w-full px-4 py-2 rounded-md"
          {...register("email")}
        />
      </FormSection>
      <FormSection>
        {/*<SignUpButton />*/}
        <p className="mt-12 text-2xl"> Registration is currently disabled</p>
      </FormSection>

    </form>
  );
};

export default RegisterForm;
