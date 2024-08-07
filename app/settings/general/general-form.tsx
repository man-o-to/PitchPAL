"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"

const generalSettingsSchema = z.object({
  language: z.string().nonempty({ message: "Please select a language." }),
  theme: z.string().nonempty({ message: "Please select a theme." }),
  emailNotifications: z.boolean().default(false),
  pushNotifications: z.boolean().default(false),
  shareData: z.boolean().default(false),
})

type GeneralSettingsFormValues = z.infer<typeof generalSettingsSchema>

const defaultValues: Partial<GeneralSettingsFormValues> = {
  language: "en",
  theme: "light",
  emailNotifications: false,
  pushNotifications: false,
  shareData: false,
}

export function GeneralForm() {
  const form = useForm<GeneralSettingsFormValues>({
    resolver: zodResolver(generalSettingsSchema),
    defaultValues,
    mode: "onChange",
  })

  function onSubmit(data: GeneralSettingsFormValues) {
    console.log("Form submitted", data) // Add a console log for debugging
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Language</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a language" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  {/* Add more languages as needed */}
                </SelectContent>
              </Select>
              <FormDescription>Select your preferred language.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="theme"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Theme</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a theme" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System Default</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Choose your preferred theme.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="emailNotifications"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                    <FormLabel className="text-base">Email Notifications</FormLabel>
                    <FormDescription>
                        Enable or disable email notifications.
                    </FormDescription>
                </div>
                <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
            </FormItem>
          )}
        />

        <FormField
        control={form.control}
        name="pushNotifications"
        render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
                <FormLabel className="text-base">Push Notifications</FormLabel>
                <FormDescription>
                Enable or disable push notifications.
                </FormDescription>
            </div>
            <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
            </FormItem>
        )}
        />

        <FormField
        control={form.control}
        name="shareData"
        render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
                <FormLabel className="text-base">Allow Data Sharing</FormLabel>
                <FormDescription>
                Allow sharing of your data with third parties.
                </FormDescription>
            </div>
            <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
            </FormItem>
        )}
        />

        <Button type="submit">Save Settings</Button>
      </form>
    </Form>
  )
}