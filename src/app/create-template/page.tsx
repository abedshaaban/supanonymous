'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { TEMPLATES } from '~constants/templates'
import { Button } from '~ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '~ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~ui/form'
import { Input } from '~ui/input'
import { generateId } from '~utils/functions/misc.functions'
import { createClient } from '~utils/supabase/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export default function CreateTemplatePage() {
  const [errorMessage, setErrorMessage] = useState<string>()
  const router = useRouter()

  const formSchema = z.object({
    name: z.string().min(3).max(50),
    description: z.string().min(0).max(50).optional()
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const supabase = createClient()

    const { error } = await supabase.from('templates').insert({
      ...values,
      slug: generateId(),
      template_type: 'COMPLAINTS'
    })

    if (!error) router.push('/')

    setErrorMessage(error?.message)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={'flex h-[calc(100vh-57px)] w-full items-center justify-center'}
      >
        <Card className={'w-full max-w-[390px]'}>
          <CardHeader>
            <CardTitle>Create Template</CardTitle>
            <CardDescription>
              This will be the form type used for your submitions
            </CardDescription>

            <CardDescription className={'text-red-500'}>{errorMessage}</CardDescription>
          </CardHeader>

          <CardContent className={'flex flex-col gap-6'}>
            <FormField
              control={form.control}
              name={'name'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input id="name" placeholder={'Name of your template'} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={'description'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input id="description" placeholder={'Description'} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter className={'flex justify-between'}>
            <Link href={'/'}>
              <Button variant={'outline'}>Cancel</Button>
            </Link>

            <Button type={'submit'}>Create</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}
