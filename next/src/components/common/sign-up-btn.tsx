'use client'
import { Icon } from "@iconify/react";
import { type FunctionComponent } from "react";

const SignUpButton: FunctionComponent = () => {
  return (
    <button
      type="submit"
      className="mt-8 flex items-center justify-center gap-3 text-xl register-btn mx-auto"
    >
      <Icon icon="raphael:power" className="w-14 h-14 relative bottom-[2px]" />
      <svg
        id="sign-up-text"
        viewBox="0 0 210 80"
        xmlns="http://www.w3.org/2000/svg"
      >
        <text x="0" y="65">
          {" "}
          Sign Up
        </text>
      </svg>
    </button>
  );
};

export default SignUpButton;