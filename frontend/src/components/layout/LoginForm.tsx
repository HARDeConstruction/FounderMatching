"use client";
import { Form, FormProvider } from "react-hook-form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import formSchema from "../others/FormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";

function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <FormProvider {...form}>
      <form>
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel />
              <FormControl>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  className="py-5 text-xs"
                  placeholder="email address"
                />
              </FormControl>
              <FormLabel />
              <FormControl>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  className="py-5 text-xs"
                  placeholder="password"
                />
              </FormControl>
            </FormItem>
          )}
        ></FormField>
        <div className="flex flex-row justify-between mt-3 mb-6">
          <div className="flex flex-row items-center gap-2 ">
            <Checkbox id="checkbox" className="checked:bg-primaryBlue" />
            <h2 className="text-sm flex flex-row ">Remember me</h2>
          </div>
          <Button variant="link" className="text-primaryBlue font-semibold">
            Forget password?
          </Button>
        </div>
        <Button className="bg-primaryBlue hover:bg-blue-700 w-full">
          Login
        </Button>
      </form>
    </FormProvider>
  );
}

export default LoginForm;
