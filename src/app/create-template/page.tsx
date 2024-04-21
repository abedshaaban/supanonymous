import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '~ui/card'
import { Input } from '~ui/input'
import { Label } from '~ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~ui/select'
import Link from 'next/link'

import { Button } from '~/lib/ui/button'

export default function CreateTemplatePage() {
  async function handleCreateTemplate() {
    'use server'
  }

  return (
    <form
      action={handleCreateTemplate}
      className={'flex h-[calc(100vh-57px)] w-full items-center justify-center'}
    >
      <Card className={'w-full max-w-[350px]'}>
        <CardHeader>
          <CardTitle>Create Template</CardTitle>
          <CardDescription>
            This will be the form type used for your submitions
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder={'Name of your template'} required />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <Input id="description" placeholder={'Description'} />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor={'type'}>Type</Label>
              <Select required>
                <SelectTrigger id={'type'}>
                  <SelectValue placeholder={'Select'} />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="complaints">Anonymous Complaints</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>

        <CardFooter className={'flex justify-between'}>
          <Link href={'/'}>
            <Button variant={'outline'}>Cancel</Button>
          </Link>

          <Button type={'submit'}>Create</Button>
        </CardFooter>
      </Card>
    </form>
  )
}
