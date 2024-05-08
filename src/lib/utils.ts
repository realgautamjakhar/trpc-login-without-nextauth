import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getPaginationSkip = (
  page: number | string | undefined,
  limit: number | string | undefined,
) => {
  return page && limit ? (Number(page) - 1) * Number(limit) : undefined;
};

export const getPaginationTake = (limit: number | undefined) => {
  return limit ? Number(limit) : undefined;
};

export const generateOTP = () => {
  const otp = Math.floor(100000 + Math.random() * 90000000).toString();
  return otp;
};
