"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@radix-ui/react-separator"

// Define the schema for the settings form using Zod
const settingsFormSchema = z.object({
  voice: z.enum(["Default", "Voice 1", "Voice 2"], {
    required_error: "Please select a voice.",
  }),
  difficulty: z.number().min(1).max(3, {
    message: "Difficulty must be between 1 and 3.",
  }),
  trainingMode: z.boolean(),
})

type SettingsFormValues = z.infer<typeof settingsFormSchema>

// Default values for the form
const defaultValues: Partial<SettingsFormValues> = {
  voice: "Default",
  difficulty: 2, // Default difficulty
  trainingMode: false,
}

export function SettingsDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues,
  })

  // Handle form submission
  function onSubmit(data: SettingsFormValues) {
    toast({
      title: "Settings Updated",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Configure your application settings here.
          </DialogDescription>
          <Separator />
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
              <CardHeader>
                <h3 className="text-lg font-medium">Voice</h3>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="voice"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select 
                          value={field.value} 
                          onValueChange={(value) => field.onChange(value)}
                        >
                          <SelectTrigger className="w-full">{field.value}</SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Default">Default</SelectItem>
                            <SelectItem value="Voice 1">Voice 1</SelectItem>
                            <SelectItem value="Voice 2">Voice 2</SelectItem>
                            {/* Add more voices if needed */}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription>
                        Select the voice for the application.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <h3 className="text-lg font-medium">Difficulty</h3>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="difficulty"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Slider
                          min={1}
                          max={3}
                          step={1}
                          value={[field.value]}
                          onValueChange={(value) => field.onChange(value[0])}
                          defaultValue={[2]} // Default difficulty
                        >
                        </Slider>
                      </FormControl>
                      <FormDescription>
                        Adjust the difficulty level.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <h3 className="text-lg font-medium">Training Mode</h3>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="trainingMode"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel>Show Hints</FormLabel>
                        <FormDescription>
                          Toggle objection hints on or off.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            <Button type="submit">Update Settings</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}