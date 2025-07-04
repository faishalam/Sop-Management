"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { HeroServices } from "../HeroService";
import { AxiosError } from "axios";
import { NetworkAPIError } from "@/utils/response-type";

const useUserLogged = () => {
  const useUserLoggedFn = async () => {
    try {
      const response = await HeroServices.get("/getLoggedInUser");
      if (response.status !== 200) return;
      return response.data;
    } catch (error) {
      const err = error as AxiosError<NetworkAPIError>;
      throw err || "Unknown error";
    }
  };

  const query = useQuery({
    queryKey: ["useUserLogged"],
    queryFn: useUserLoggedFn,
  });

  return { ...query };
};

export default useUserLogged;
