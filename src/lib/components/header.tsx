import { siteConfig } from '~constants/site-config'
import CircleIcon from '~icons/circle'
import { Button } from '~ui/button'
import Link from 'next/link'

export function Header() {
  return (
    <header
      className={
        'bg-background/95 sticky top-0 z-40 flex w-full justify-center border-b backdrop-blur'
      }
    >
      <div className={'container flex h-14 items-center px-1'}>
        <div className={'mr-4'}>
          <Link href="/" className={'mr-6 flex items-center space-x-2'}>
            <CircleIcon className={'h-6 w-6'} />
            <span className={'text-primary hidden font-bold md:inline-block'}>
              {siteConfig.name}
            </span>
          </Link>
        </div>

        <div className={'flex flex-1 items-center justify-end space-x-2'}>
          <nav className={'flex items-center gap-3'}>
            <Button variant={'outline'}>Login</Button>

            <Button>Sign up</Button>
          </nav>
        </div>
      </div>
    </header>
  )
}
