'use client'

import { forwardRef, type ButtonHTMLAttributes } from 'react'
import ThreeQuarteredCircleIcon from '~icons/three-quartered-circle'
import { cn } from '~utils/functions/misc.functions'
import { cva, type VariantProps } from 'class-variance-authority'

import type { IconType } from '~/lib/types/icons'

const buttonVariants = cva(
  'duration-150 transition-all inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-white fill-white shadow hover:bg-primary/90',
        destructive: '!bg-red-500 !text-white !fill-white !shadow-sm !hover:bg-red-400',
        outline:
          'border text-black border-input bg-background shadow-sm hover:bg-gray-100',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost:
          'hover:bg-gray-100 bg-transparent text-black fill-black w-auto h-auto shadow-none',
        link: 'text-primary underline-offset-4 hover:underline'
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-10 px-8',
        icon: 'hover:bg-gray-100 bg-transparent text-black fill-black !p-0 shadow-none !h-9 !w-9'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  label?: string
  loading?: boolean
  icon?: (props: IconType) => JSX.Element
  loadingIcon?: (props: IconType) => JSX.Element
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      loading,
      disabled,
      label,
      children,
      type = 'button',
      icon: Icon,
      loadingIcon: LoadingIcon,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={loading || disabled}
        type={type}
        {...props}
      >
        {loading ? (
          LoadingIcon ? (
            <LoadingIcon className={'h-4 w-4'} />
          ) : (
            <ThreeQuarteredCircleIcon className={'w-6 animate-spin'} />
          )
        ) : (
          Icon && <Icon className={'h-4 w-4'} />
        )}

        {label ? label : children}
      </button>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
