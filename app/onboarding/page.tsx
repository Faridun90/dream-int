"use client";
export const dynamic = "force-dynamic";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";

const FormSchema = z.object({
  age: z
    .number({ invalid_type_error: "Age must be a number" })
    .min(18, "Age must be at least 18")
    .max(120, "Please enter a valid age"),
  gender: z
    .enum(["male", "female", "other"])
    .optional()
    .refine((val) => val !== undefined, {
      message: "Gender is required",
    }),
});

const OnboardingPage = () => {
  const router = useRouter();
  const { toast } = useToast();

  const { data: session, update } = useSession();
  console.log("Session:", session); // Debug: Log session data

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      age: 0,
      gender: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
      // Send form data to the onboarding API
      const response = await fetch("/api/user/onboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Onboarding completed successfully!",
        });

        // Refresh the session to get updated user data
        const updatedSession = await update();
        console.log("Updated session:", updatedSession); // Debug: Log updated session

        // Redirect user based on onboarding status
        if (updatedSession?.user.isOnboarded) {
          router.push("/user");
        } else {
          toast({
            title: "Error",
            description: "Failed to update session data.",
            variant: "destructive",
          });
        }
      } else {
        const data = await response.json();
        toast({
          title: "Error",
          description: data.error || "Failed to complete onboarding.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black-50">
      <div className="w-full max-w-md p-8 bg-slate-800 shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-gray-300 text-center">
          Onboarding
        </h1>
        <p className="text-sm text-gray-500 text-center mt-2">
          Let’s get to know you better to personalize your experience.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 mt-6"
          >
            {/* Age Input Field */}
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-400 font-medium">
                    Age
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your age"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(value === "" ? "" : Number(value));
                      }}
                      value={field.value || ""}
                      className="text-gray-900"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Gender Dropdown */}
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-400 font-medium">
                    Gender
                  </FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      value={field.value || ""}
                      onChange={(e) => field.onChange(e.target.value)}
                      className="w-full mt-1 p-2 border rounded-md text-gray-900 focus:ring focus:ring-blue-300 focus:border-blue-500"
                    >
                      <option value="" disabled>
                        Select Gender
                      </option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md"
              type="submit"
            >
              Complete Onboarding
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default OnboardingPage;
