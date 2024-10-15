"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { log } from "console";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().min(2).endsWith("@gmail.com"),
  password: z.string().min(8),
});



export default formSchema;
