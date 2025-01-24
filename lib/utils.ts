import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
// @ts-ignore
export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));
