import { z } from 'zod'
import { phonePattern } from '~/helpers/patterns'

export const schema = z.object({
  name: z.string().nonempty(),
  email: z.string().nonempty(),
  password: z.string().nonempty(),
  phone: z.string().regex(phonePattern.value, {
    message: phonePattern.message,
  }),
})

export type ISchema = z.infer<typeof schema>
