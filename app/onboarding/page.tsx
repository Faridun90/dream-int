"use client";

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

const FormSchema = z.object({
  age: z
    .number({ invalid_type_error: "Age must be a number" })
    .min(1, "Age must be at least 1")
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

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      age: 0,
      gender: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
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
        router.push("/admin");
      } else {
        const data = await response.json();
        toast({
          title: "Error",
          description: data.error || "Failed to complete onboarding.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error during onboarding:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-md mx-auto mt-16 space-y-6"
      >
        <h1 className="text-3xl font-semibold text-center">Onboarding</h1>
        <p className="text-sm text-center text-gray-600">
          Complete your profile to continue
        </p>
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter your age"
                  {...field}
                  onChange={
                    (e) => field.onChange(Number(e.target.value)) // Ensure age is a number
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <FormControl>
                <select
                  {...field}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-black"
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
        <Button className="w-full" type="submit">
          Complete Onboarding
        </Button>
      </form>
    </Form>
  );
};

export default OnboardingPage;
