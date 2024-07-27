"use client";
import { FC } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Toggle } from "./ui/toggle";
import { Columns2, SunMoon } from "lucide-react";
import { Slider } from "./ui/slider";
import { Switch } from "./ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { useMutation } from "convex/react";
import { useUser } from '@clerk/nextjs';
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { toast, useToast } from "./ui/use-toast";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

// Define the Zod schema
const schema = z.object({
  language: z.string().min(1, "Language is required"),
  voice: z.string().min(1, "Voice is required"),
  difficulty: z.coerce.number().min(1).max(3),
  training: z.boolean(),
});

type FormValues = z.infer<typeof schema>;

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export const Sidebar: FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const { user } = useUser(); // Get the current user
  const { toast } = useToast();

  const updateSettings = useMutation(api.settings.updateSettings);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      language: '',
      voice: '',
      difficulty: 2,
      training: true,
    }
  });

  const { handleSubmit, control, formState: { errors, isSubmitting } } = form;

  const onSubmit = async (data: FormValues) => {
    console.log("Form submitted:", data); // Debug log

    if (!user) {
      console.error("User is not authenticated");
      return;
    }

    try {
      await updateSettings({
        clerkId: user.id as string, // Use clerkId instead of userId
        language: data.language,
        voice: data.voice,
        difficulty: data.difficulty,
        trainingMode: data.training,
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
    <div className={`fixed top-0 left-0 h-full ${isOpen ? "w-96" : "w-0"} overflow-hidden bg-background`}>
      <div className="flex flex-col h-full border-r">
        <div className="flex items-center justify-between p-3 h-14 border-b">
          <Toggle pressed={isOpen} onPressedChange={toggleSidebar}>
            <Columns2 size={24} />
          </Toggle>
          <Button variant={"ghost"}>
            <SunMoon size={24} />
          </Button>
        </div>
        <div className="p-4">
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Language</CardTitle>
                  <CardDescription>Select your preferred language</CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={control}
                    name="language"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Language</FormLabel>
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
                        <FormMessage>{errors.language?.message}</FormMessage>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Voice</CardTitle>
                  <CardDescription>Choose your preferred voice</CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={control}
                    name="voice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Voice</FormLabel>
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
                        <FormMessage>{errors.voice?.message}</FormMessage>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Difficulty</CardTitle>
                  <CardDescription>Adjust the difficulty level</CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={control}
                    name="difficulty"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Difficulty</FormLabel>
                        <FormControl>
                          <Slider
                            {...field}
                            onValueChange={(value) => field.onChange(Number(value[0]))}
                            value={[field.value]}
                            min={1}
                            max={3}
                            step={1}
                            className="w-full"
                          >
                            <div className="bg-primary">
                              <div className="bg-primary" />
                            </div>
                            <div className="h-5 w-5 rounded-full bg-primary" />
                          </Slider>
                        </FormControl>
                        <FormMessage>{errors.difficulty?.message}</FormMessage>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card className="flex flex-row items-end justify-between">
                <CardHeader>
                  <CardTitle>Training Mode</CardTitle>
                  <CardDescription>Enable or disable training mode</CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={control}
                    name="training"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={(checked) => field.onChange(checked)}
                            id="training"
                            aria-label="Training Mode"
                          />
                        </FormControl>
                        <FormMessage>{errors.training?.message}</FormMessage>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Button type="submit" className="mt-4 w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Save Settings'}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export const SidebarToggle: FC<{ toggleSidebar: () => void; isOpen: boolean }> = ({ toggleSidebar, isOpen }) => {
  return (
    <div>
      {!isOpen && (
        <Toggle pressed={false} onPressedChange={toggleSidebar}>
          <Columns2 size={24} />
        </Toggle>
      )}
    </div>
  );
};