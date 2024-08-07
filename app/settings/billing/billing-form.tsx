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
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Switch } from "@/components/ui/switch"

const billingFormSchema = z.object({
  subscriptionPlan: z.string({ required_error: "Please select a subscription plan." }),
  paymentInformation: z.string({ required_error: "Please enter your payment information." }),
  automaticRenewal: z.boolean().optional(),
})

type BillingFormValues = z.infer<typeof billingFormSchema>

// Default values can come from your database or API.
const defaultValues: Partial<BillingFormValues> = {
  subscriptionPlan: "Basic",
  paymentInformation: "4111 1111 1111 1111", // Dummy card number
  automaticRenewal: true,
}

export function BillingForm() {
  const form = useForm<BillingFormValues>({
    resolver: zodResolver(billingFormSchema),
    defaultValues,
    mode: "onChange",
  })

  function onSubmit(data: BillingFormValues) {
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
        {/* Subscription Plan */}
        <FormField
          control={form.control}
          name="subscriptionPlan"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Subscription Plan</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a plan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Basic">Basic</SelectItem>
                      <SelectItem value="Pro">Pro</SelectItem>
                      <SelectItem value="Enterprise">Enterprise</SelectItem>
                      {/* Add more plans as needed */}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>Select your subscription plan.</FormDescription>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        {/* Payment Information */}
        <FormField
          control={form.control}
          name="paymentInformation"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Payment Information</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter your payment information" />
                </FormControl>
                <FormDescription>Enter your payment information.</FormDescription>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        {/* Automatic Renewal */}
        <FormField
          control={form.control}
          name="automaticRenewal"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Automatic Renewal</FormLabel>
                <FormDescription>Enable or disable automatic renewal.</FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Billing History */}
        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <FormLabel className="text-base">Billing History</FormLabel>
            <FormDescription>View your billing history.</FormDescription>
          </div>
          <Button type="button" onClick={() => console.log("Viewing Billing History")}>
            View
          </Button>
        </FormItem>

        {/* Billing Support */}
        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <FormLabel className="text-base">Billing Support</FormLabel>
            <FormDescription>Contact billing support for assistance.</FormDescription>
          </div>
          <Button type="button" onClick={() => console.log("Contacting Billing Support")}>
            Contact Support
          </Button>
        </FormItem>

        <Button type="submit">Save Settings</Button>
      </form>
    </Form>
  )
}