"use server"

import { z } from "zod"

export async function onSubmit(data: z.infer<typeof FormSchema>) {
  console.log("Submitted")
}

export const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Must be 8 or more characters long" })
})