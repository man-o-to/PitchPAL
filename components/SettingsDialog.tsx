// components/SettingsDialog.tsx

"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast, useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@radix-ui/react-separator";
import { useMutation, useQuery } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { api } from "@/convex/_generated/api";

// Define the schema for the settings form using Zod
const settingsFormSchema = z.object({
  language: z.string().min(1, "Language is required"),
  voice: z.string().min(1, "Voice is required"),
  difficulty: z.coerce.number().min(1).max(3),
  trainingMode: z.boolean(),
});

type SettingsFormValues = z.infer<typeof settingsFormSchema>;

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SettingsDialog({ open, onOpenChange }: SettingsDialogProps) {
  const { user } = useUser();
  const { toast } = useToast();

  const updateSettings = useMutation(api.settings.updateSettings);
  const getUserSettings = useQuery(api.settings.getUserSettings, { clerkId: user?.id! });

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: {
      language: '',
      voice: '',
      difficulty: 2,
      trainingMode: false,
    },
  });

  const { handleSubmit, control, formState: { errors, isSubmitting }, reset } = form;

  useEffect(() => {
    if (getUserSettings) {
      reset({
        language: getUserSettings.language || '',
        voice: getUserSettings.voice || '',
        difficulty: getUserSettings.difficulty || 2,
        trainingMode: getUserSettings.trainingMode || false,
      });
    }
  }, [getUserSettings, reset]);

  // Handle form submission
  const onSubmit = async (data: SettingsFormValues) => {
    if (!user) {
      console.error("User is not authenticated");
      return;
    }

    try {
      await updateSettings({
        clerkId: user.id as string,
        language: data.language,
        voice: data.voice,
        difficulty: data.difficulty,
        trainingMode: data.trainingMode,
      });
      toast({
        title: 'Settings updated successfully',
      });
    } catch (error) {
      console.error("Failed to update settings:", error);
      toast({
        title: 'Error',
        variant: 'destructive',
      });
    }
  };

  const onError = (errors: any) => {
    console.log("Form errors:", errors); // Debug log for errors
    toast({
      title: 'Form submission error',
      description: 'Please check your input and try again.',
      variant: 'destructive',
    });
  };

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
          <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-8">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-medium">Language</h3>
              </CardHeader>
              <CardContent>
                <FormField
                  control={control}
                  name="language"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Español</SelectItem>
                            <SelectItem value="fr">Français</SelectItem>
                            <SelectItem value="de">Deutsch</SelectItem>
                            <SelectItem value="zh">中文</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription>
                        Select your preferred language.
                      </FormDescription>
                      <FormMessage>{errors.language?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <h3 className="text-lg font-medium">Voice</h3>
              </CardHeader>
              <CardContent>
                <FormField
                  control={control}
                  name="voice"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select voice" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="alloy">Alloy</SelectItem>
                            <SelectItem value="echo">Echo</SelectItem>
                            <SelectItem value="fable">Fable</SelectItem>
                            <SelectItem value="onyx">Onyx</SelectItem>
                            <SelectItem value="nova">Nova</SelectItem>
                            <SelectItem value="shimmer">Shimmer</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription>
                        Select the voice for the application.
                      </FormDescription>
                      <FormMessage>{errors.voice?.message}</FormMessage>
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
                  control={control}
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
                        />
                      </FormControl>
                      <FormDescription>
                        Adjust the difficulty level.
                      </FormDescription>
                      <FormMessage>{errors.difficulty?.message}</FormMessage>
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
                  control={control}
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
                      <FormMessage>{errors.trainingMode?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Save Settings'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}