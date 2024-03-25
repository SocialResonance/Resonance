import { z } from 'zod'

export const MembershipFee = z.object({
  amount: z.number().optional(),
  date: z.string().optional(),
  space: z.string().uuid().optional(),
})

export type MembershipFee = z.infer<typeof MembershipFee>

export const Newsletter = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  space: z.string().uuid().optional(),
})

export type Newsletter = z.infer<typeof Newsletter>

export const Space = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  category: z.string().optional(),
  location: z.string().optional(),
  recurringTime: z.string().optional(),
  members: z.array(z.string().uuid()).optional(),
  newsletters: z.array(z.string().uuid()).optional(),
  membershipFees: z.array(z.string().uuid()).optional(),
})

export type Space = z.infer<typeof Space>

export const User = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  password: z.string().optional(),
  spaces: z.array(z.string().uuid()).optional(),
})

export type User = z.infer<typeof User>
