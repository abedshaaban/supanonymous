import { siteConfig } from '~constants/site-config'
import CircleIcon from '~icons/circle'
import ExitIcon from '~icons/exit'
import PersonIcon from '~icons/person'
import { Button } from '~ui/button'
import { logoutUser } from '~utils/client/auth-actions'
import { supabase } from '~utils/supabase/server'
import Link from 'next/link'

export async function Header() {
  const {
    data: { user }
  } = await supabase.auth.getUser()

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
            <span className={'hidden font-bold text-primary md:inline-block'}>
              {siteConfig.name}
            </span>
          </Link>
        </div>

        <div className={'flex flex-1 items-center justify-end space-x-2'}>
          <nav className={'flex items-center gap-3'}>
            {user ? (
              <>
                <Link href={'/u'}>
                  <Button variant={'outline'} size={'icon'}>
                    <PersonIcon />
                  </Button>
                </Link>

                <Button variant={'destructive'} onClick={logoutUser} size={'icon'}>
                  <ExitIcon />
                </Button>
              </>
            ) : (
              <>
                <Link href={'/login'}>
                  <Button variant={'outline'}>Login</Button>
                </Link>

                <Link href={'/signup'}>
                  <Button>Sign up</Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
