"use server";
import { cookies } from "next/headers";
import { axiosInstance } from "./axios";
import { getSession } from "./session";

export const getProfile = async () => {
  const cookie = await cookies();
  const cookieValue = cookie.get("token")?.value;
  if (!cookieValue) return null;
  const session = await getSession();

  const res = await axiosInstance.get(`/users/${session?.user.sub}`, {
    headers: {
      Authorization: `Bearer ${cookieValue}`,
    },
  });

  if (res.status === 200) {
    return res.data.data;
  } else {
    return null;
  }
};
