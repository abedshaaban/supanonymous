import clsx, { type ClassValue } from 'clsx'
import { nanoid } from 'nanoid'
import { twMerge } from 'tailwind-merge'
import clip from 'text-clipper'

export function shortenText(text: string, maxLength: number, options?: object): string {
  return clip(text, maxLength, options)
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateId(size = 9): string {
  return nanoid(size)
}
