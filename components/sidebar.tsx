"use client";

import { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Toggle } from "./ui/toggle";
import { Columns2, SunMoon } from "lucide-react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./ui/select";
import { Slider } from "./ui/slider";
import { Switch } from "./ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

// Define the Zod schema
const schema = z.object({
    language: z.string().min(1, "Language is required"),
    voice: z.string().min(1, "Voice is required"),
    difficulty: z.number().min(1).max(3),
    training: z.boolean(),
  });
  
  type FormValues = z.infer<typeof schema>;
  
  interface SidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
  }
  
  export const Sidebar: FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
    const { register, watch, formState: { errors } } = useForm<FormValues>({
      resolver: zodResolver(schema),
      defaultValues: {
        language: '',
        voice: '',
        difficulty: 2,
        training: false,
      }
    });
  
    // Watch all form values and log them to the console or use them as needed
    const formValues = watch();
  
    // Optionally, you can handle form values dynamically or trigger side effects here
    console.log(formValues);
  
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
            <form className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Language</CardTitle>
                  <CardDescription>Select your preferred language</CardDescription>
                </CardHeader>
                <CardContent>
                  <Select {...register('language')}>
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
                  {errors.language && <p className="text-red-500">{errors.language.message}</p>}
                </CardContent>
              </Card>
  
              <Card>
                <CardHeader>
                  <CardTitle>Voice</CardTitle>
                  <CardDescription>Choose your preferred voice</CardDescription>
                </CardHeader>
                <CardContent>
                  <Select {...register('voice')}>
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
                  {errors.voice && <p className="text-red-500">{errors.voice.message}</p>}
                </CardContent>
              </Card>
  
              <Card>
                <CardHeader>
                  <CardTitle>Difficulty</CardTitle>
                  <CardDescription>Adjust the difficulty level</CardDescription>
                </CardHeader>
                <CardContent>
                  <Slider
                    {...register('difficulty', { valueAsNumber: true })}
                    defaultValue={[2]}
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
                  {errors.difficulty && <p className="text-red-500">{errors.difficulty.message}</p>}
                </CardContent>
              </Card>
  
              <Card className="flex flex-row items-end justify-between">
                <CardHeader>
                  <CardTitle>Training Mode</CardTitle>
                  <CardDescription>Enable or disable training mode</CardDescription>
                </CardHeader>
                <CardContent>
                  <Switch {...register('training')} id="training" aria-label="Training Mode" />
                  {errors.training && <p className="text-red-500">{errors.training.message}</p>}
                </CardContent>
              </Card>
  
              {/* Optional submit button if you ever decide to include it */}
              {/* <button type="submit" className="mt-4 btn">Submit</button> */}
            </form>
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