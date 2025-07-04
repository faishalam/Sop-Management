"use client";

import Image from "next/image";
import HeaderForm from "./components/HeaderForm";
import FormLoginSection from "./components/FormLoginSection";

export default function LoginPage() {
  return (
    <>
      <div className="max-w-full w-full max-h-screen h-screen flex bg-white">
        <section className="max-w-full w-full flex flex-col justify-center items-center ">
          <Image
            src="/assets/register.png"
            alt="image"
            width={1000}
            height={1000}
            className="w-sm mb-6"
          />
          <HeaderForm
            title="Login to Your Account"
            description="Enter Your Details to Login"
          />
          <FormLoginSection />
        </section>

        <section className="hidden md:flex relative max-w-full w-full justify-center items-center bg-[#2F5249] rounded-l-full shadow-2xl flex-col">
          <div className="z-10 max-w-full pl-48 pr-16">
            <p className="text-white text-4xl font-semibold flex justify-start">
              Streamline Your SOPs <br /> and Internal Memos with Ease
            </p>

            <p className="text-white py-5">
              Welcome to the KPP SOP Management System — a centralized platform
              to organize, access, and monitor your Standard Operating
              Procedures and internal documentation efficiently.
            </p>
          </div>
          <Image
            src="/assets/hero.png"
            alt="image"
            width={1000}
            height={1000}
            className="w-md mt-6 pl-10"
          />
        </section>
      </div>
    </>
  );
}
