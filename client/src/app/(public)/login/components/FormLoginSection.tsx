"use client";

import { Controller } from "react-hook-form";
import { useUserLogin } from "../hooks";
import Link from "next/link";
import ContinueWithSection from "./ContinueWithSection";
import ButtonSubmit from "@/components/atoms/button-submit";
import { CInput } from "@/components/atoms";

export default function FormLoginSection() {
  const { handleSubmit, errors, isLoadingLogin, control, onSubmit, onInvalid } =
    useUserLogin();
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit, onInvalid)}
        className="mx-auto mb-0 mt-4 max-w-full md:max-w-md w-full space-y-3 px-10 lg:px-0"
      >
        <Controller
          name="nrp"
          control={control}
          rules={{
            required: "NRP wajib diisi",
            
          }}
          render={({ field }) => (
            <CInput
              id="nrp"
              label="NRP*"
              placeholder="Enter nrp"
              errors={errors.nrp?.message}
              {...field}
              required
              autoComplete="off"
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{ required: "Password wajib diisi" }}
          render={({ field }) => (
            <CInput
              id="password"
              label="Password*"
              placeholder="Enter password"
              type="password"
              errors={errors.password?.message}
              {...field}
              required
              autoComplete="off"
            />
          )}
        />

        <div className="flex items-center justify-between max-w-md w-full">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
            <label
              htmlFor="remember-me"
              className="ml-3 block text-sm leading-6 text-gray-900"
            >
              Remember me
            </label>
          </div>

          <div className="text-sm leading-6">
            <Link
              href={""}
              className="font-medium text-green-500 hover:text-green-600 transition cursor-not-allowed"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <div className="flex flex-col mt-8">
          <ButtonSubmit
            type={"submit"}
            classname={
              "w-fulll max-w-full rounded-lg bg-[#2F5249] hover:bg-[#164427] text-white p-2 cursor-pointer"
            }
            btnText="Login"
            btnLoading={isLoadingLogin}
          />
        </div>
      </form>
    </>
  );
}
