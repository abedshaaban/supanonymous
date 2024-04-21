import { siteConfig } from '~constants/site-config'
import CircleIcon from '~icons/circle'
import ExitIcon from '~icons/exit'
import { Button } from '~ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~ui/select'
import { createClient } from '~utils/supabase/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export async function Header() {
  const supabase = createClient()

  const {
    data: { user }
  } = await supabase.auth.getUser()

  async function handleLogoutUser() {
    'use server'

    const supabase = createClient()

    await supabase.auth.signOut()

    redirect('/login')
  }

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
                <Select>
                  <SelectTrigger className={'w-[210px]'}>
                    <SelectValue placeholder="Select a timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                  </SelectContent>
                </Select>

                <form action={handleLogoutUser}>
                  <Button variant={'destructive'} size={'icon'} type={'submit'}>
                    <ExitIcon />
                  </Button>
                </form>
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
