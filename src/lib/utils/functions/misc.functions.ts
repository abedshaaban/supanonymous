import clsx, { type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import clip from 'text-clipper'

export function shortenText(text: string, maxLength: number, options?: object): string {
  return clip(text, maxLength, options)
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
