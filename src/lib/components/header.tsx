import { siteConfig } from '~constants/site-config'
import { TEMPLATES } from '~constants/templates'
import CircleIcon from '~icons/circle'
import ExitIcon from '~icons/exit'
import PlusIcon from '~icons/plus'
import SlashIcon from '~icons/slash'
import { Button } from '~ui/button'
import { Select, SelectContent, SelectTrigger, SelectValue } from '~ui/select'
import { createClient } from '~utils/supabase/server'
import { headers } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'

async function UserTemplates({ user_id }: { user_id: string }) {
  const headersList = headers()
  const pathname = headersList.get('referer')
  const supabase = createClient()

  const { data } = await supabase.from('templates').select('*').eq('user_id', user_id)

  const templateId = pathname?.split('/').pop()
  const templateName = data?.find((template) => template.slug === templateId)?.name

  return (
    <div className={'flex items-center'}>
      <SlashIcon className={'h-6 w-6'} />

      <Select>
        <SelectTrigger className={'w-[180px] border-none'}>
          <SelectValue
            placeholder={pathname?.includes('profile') ? templateName : 'Select Template'}
          />
        </SelectTrigger>
        <SelectContent>
          {data?.map((template) => (
            <Link
              href={`/profile/${template.template_type === TEMPLATES.COMPLAINTS ? 'complaints' : ''}/${template.slug}`}
              key={template.slug}
              className={
                'flex items-center gap-2 rounded-sm py-1.5 pl-2 pr-8 text-sm font-semibold hover:bg-gray-100'
              }
            >
              {template.name}
            </Link>
          ))}

          <Link
            href={'/create-template'}
            className={
              'flex items-center gap-2 rounded-sm py-1.5 pl-2 pr-8 text-sm font-semibold hover:bg-gray-100'
            }
          >
            <PlusIcon />
            Create Template
          </Link>
        </SelectContent>
      </Select>
    </div>
  )
}

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
          <Link href="/" className={'flex items-center space-x-2'}>
            <CircleIcon className={'h-6 w-6'} />
            <span className={'hidden font-bold text-primary md:inline-block'}>
              {siteConfig.name}
            </span>
          </Link>
        </div>

        <div className={'flex flex-1'}>{user && <UserTemplates user_id={user.id} />}</div>

        <div className={'flex flex-1 items-center justify-end space-x-2'}>
          <nav className={'flex items-center gap-3'}>
            {user ? (
              <>
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
