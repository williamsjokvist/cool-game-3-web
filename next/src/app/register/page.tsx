import SignUpButton from "@/components/common/sign-up-btn";
import { type FunctionComponent } from "react";

const RegisterPage: FunctionComponent = () => {
  return (
    <main>
      <form
        method="post"
        className="dark:text-white text-center max-w-xl mx-auto mb-8 text-sm"
      >
        <div className="flex items-center justify-between gap-4 mb-4">
          <label htmlFor="name" className="font-bold">
            Username
          </label>
          <input
            type="text"
            name="name"
            id="name"
            minLength={4}
            maxLength={12}
            placeholder="CoolGamer3"
            className="bg-[rgba(255,255,255,0.125)] max-w-xs w-full px-4 py-2 rounded-md"
          />
        </div>

        <div className="flex items-center justify-between gap-4 mb-4">
          <label htmlFor="discordUsername" className="font-bold">
            Discord Username
          </label>
          <input
            type="text"
            name="discordUsername"
            id="discordUsername"
            placeholder="CoolGamer3#69420"
            className="bg-[rgba(255,255,255,0.125)] max-w-xs w-full px-4 py-2 rounded-md"
          />
        </div>

        <div className="flex items-center justify-between gap-4 mb-4">
          <label htmlFor="discordUsername" className="font-bold">
            Birthday
          </label>
          <input
            type="date"
            name="birthday"
            id="birthday"
            defaultValue="2003-01-01"
            className="bg-[rgba(255,255,255,0.125)] max-w-xs w-full px-4 py-2 rounded-md"
          />
        </div>

        <div className="flex items-center justify-between gap-4 mb-4">
          <label htmlFor="password" className="font-bold">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            maxLength={12}
            minLength={4}
            placeholder="********"
            className="bg-[rgba(255,255,255,0.125)] max-w-xs w-full px-4 py-2 rounded-md"
          />
        </div>
        <div className="flex items-center justify-between gap-4 mb-4">
          <label htmlFor="retypePassword" className="font-bold text-left">
            Retype password
          </label>
          <input
            type="password"
            name="retypePassword"
            id="retypePassword"
            maxLength={12}
            minLength={4}
            placeholder="********"
            className="bg-[rgba(255,255,255,0.125)] max-w-xs w-full px-4 py-2 rounded-md"
          />
        </div>
        <div className="flex items-center justify-between gap-4 mb-4">
          <label htmlFor="email" className="font-bold">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="coolgamer3@hotmail.com"
            className="bg-[rgba(255,255,255,0.125)] max-w-xs w-full px-4 py-2 rounded-md"
          />
        </div>
       {/* <SignUpButton /> */}
       <p className='mt-12 text-2xl'> Registration is currently disabled</p>
      </form>
    </main>
  );
};

export default RegisterPage;
