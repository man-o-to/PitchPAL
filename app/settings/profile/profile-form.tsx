"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const profileFormSchema = z.object({
  timezone: z.string({ required_error: "Please select a timezone." }),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  timezone: "UTC",
}

export function ProfileForm() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  })

  function onSubmit(data: ProfileFormValues) {
    // Handle form submission
    console.log("Form Data:", data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Timezone */}
        <FormField
          control={form.control}
          name="timezone"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Timezone</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="PST">PST</SelectItem>
                      <SelectItem value="EST">EST</SelectItem>
                      <SelectItem value="CST">CST</SelectItem>
                      {/* Add more timezones as needed */}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>Select the timezone for your profile.</FormDescription>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        {/* Reset Password */}
        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <FormLabel className="text-base">Reset Password</FormLabel>
            <FormDescription>Send a reset password link to your email.</FormDescription>
          </div>
          <Button type="button" onClick={() => console.log("Reset Password Link Sent")}>
            Send Reset Link
          </Button>
        </FormItem>

        {/* Multi-factor Authentication */}
        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <FormLabel className="text-base">Multi-factor Authentication</FormLabel>
            <FormDescription>Enable multi-factor authentication for added security.</FormDescription>
          </div>
          <Button type="button" onClick={() => console.log("Multi-factor Authentication Enabled")}>
            Enable
          </Button>
        </FormItem>
      </form>
    </Form>
  )
}