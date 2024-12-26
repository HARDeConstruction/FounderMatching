"use client";

import React, { useState } from "react";
import { ProfileData } from "@/lib/types/profiles";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { format, parseISO } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { CloudUpload, Paperclip, XIcon } from "lucide-react";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/ui/file-upload";
import { PhoneInput } from "@/components/ui/phone-input";
import LocationSelector from "@/components/ui/location-input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { TagsInput } from "@/components/ui/tags-input";
import { Switch } from "@/components/ui/switch";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";
import { useProfileAPI } from "@/lib/api/profiles";
import { useSearchParams } from "next/navigation";

const formSchema = z.object({
  isStartup: z.boolean(),
  name: z
    .string()
    .max(100, "Name cannot exceed 100 characters")
    .min(1, "Name is required"),
  email: z
    .string()
    .max(255, "Email cannot exceed 255 characters")
    .email("Invalid email format")
    .regex(/^[^@\s]+@[^@\s]+\.[^@\s]+$/, "Invalid email format"),
  avatar: z.union([
    z.string().optional().nullable(),
    z
      .instanceof(File)
      .optional()
      .nullable()
      .refine(
        (file) => !file || file.size <= 2 * 1024 * 1024,
        "File size must be less than 2MB"
      )
      .refine(
        (file) =>
          !file ||
          [
            "image/svg",
            "image/png",
            "image/jpeg",
            "image/jpg",
            "image/gif",
          ].includes(file.type),
        "Only SVG, PNG, JPG, JPEG, or GIF files are allowed"
      ),
  ]),
  industry: z
    .string()
    .max(100, "Industry cannot exceed 100 characters")
    .regex(/^[A-Za-z\s&,-]+$/, "Invalid industry format"),
  phoneNumber: z
    .string()
    .max(20, "Phone number cannot exceed 20 characters")
    .regex(/^\+[1-9]{1}[0-9]{3,14}$/, "Invalid phone number format"),
  country: z.string().max(100, "Country cannot exceed 100 characters"),
  city: z.string().max(100, "City cannot exceed 100 characters"),
  linkedInURL: z
    .string()
    .max(255, "LinkedIn URL cannot exceed 255 characters")
    .optional()
    .nullable(),
  slogan: z.string().max(255, "Slogan cannot exceed 255 characters").optional(),
  websiteLink: z
    .string()
    .max(255, "Website link cannot exceed 255 characters")
    .optional(),
  description: z
    .string()
    .max(5000, "Description cannot exceed 5000 characters"),
  hobbyInterest: z
    .string()
    .max(500, "Hobby Interest cannot exceed 500 characters")
    .optional(),
  gender: z.string().max(50).optional().nullable(),
  statement: z.string().max(5000, "Statement cannot exceed 5000 characters"),
  aboutUs: z.string().max(10000, "About Us cannot exceed 10,000 characters"),
  tags: z
    .array(z.string().max(300))
    .nonempty("Please add at least one tag")
    .optional(),
  education: z.string().max(500, "Education cannot exceed 500 characters"),
  dateOfBirth: z
    .string()
    .max(64, "Date of birth cannot exceed 64 characters")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
  currentStage: z
    .string()
    .max(255, "Current stage cannot exceed 255 characters")
    .optional(),
  experiences: z
    .array(
      z.object({
        companyName: z.string().max(255),
        role: z.string().max(255),
        location: z.string().max(255),
        description: z
          .string()
          .max(5000, "Description cannot exceed 500 characters")
          .optional(),
        startDate: z.string().max(64).optional().nullable(),
        endDate: z.string().max(64).optional().nullable(),
      })
    )
    .max(20, "Cannot add more than 20 experiences"),
  certificates: z
    .array(
      z.object({
        name: z.string().max(255),
        skill: z.string().max(255),
        description: z
          .string()
          .max(5000, "Description cannot exceed 500 characters")
          .optional(),
        startDate: z.string().max(64).optional().nullable(),
        endDate: z.string().max(64).optional().nullable(),
        gpa: z.number().optional(),
      })
    )
    .max(20, "Cannot add more than 20 certificates"),
  achievements: z
    .array(
      z.object({
        name: z.string().max(255),
        description: z
          .string()
          .max(5000, "Description cannot exceed 500 characters")
          .optional(),
        date: z.string().max(64).optional().nullable(),
      })
    )
    .max(20, "Cannot add more than 20 achievements"),
  jobPositions: z
    .array(
      z.object({
        jobTitle: z.string().max(100, "Job title cannot exceed 100 characters"),
        isOpening: z.boolean().default(true),
        country: z.string().max(100),
        city: z.string().max(100),
        startDate: z.string().max(64).optional().nullable(),
        description: z
          .string()
          .max(10000, "Description cannot exceed 10,000 characters")
          .optional(),
        tags: z.array(z.string().max(300)).optional(),
      })
    )
    .max(20, "Cannot add more than 20 job positions"),
});

type EditDialogProps = {
  currentData: ProfileData;
};

export const EditDialog: React.FC<EditDialogProps> = ({ currentData }) => {
  const dropZoneConfig = {
    maxFiles: 1,
    maxSize: 1024 * 1024 * 2,
    accept: {
      "image/svg": [".svg"],
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/gif": [".gif"],
    },
  };

  const [countryName, setCountryName] = useState<string>(currentData.country);
  const [stateName, setStateName] = useState<string>(currentData.city);

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: currentData,
    resolver: zodResolver(formSchema),
  });

  const {
    fields: experienceFields,
    append: addExperience,
    remove: removeExperience,
  } = useFieldArray({
    control: form.control,
    name: "experiences",
  });

  const {
    fields: certificateFields,
    append: addCertificate,
    remove: removeCertificate,
  } = useFieldArray({
    control: form.control,
    name: "certificates",
  });

  const {
    fields: achievementFields,
    append: addAchievement,
    remove: removeAchievement,
  } = useFieldArray({
    control: form.control,
    name: "achievements",
  });

  const {
    fields: jobPositionFields,
    append: addJobPosition,
    remove: removeJobPosition,
  } = useFieldArray({
    control: form.control,
    name: "jobPositions",
  });

  const profileId = localStorage.getItem("currentProfileID")?.trim();
  const { updateUserProfile } = useProfileAPI();
  async function onSubmit(profileData: z.infer<typeof formSchema>) {
    console.log("Submit button clicked.");
    try {
      if (!profileId) {
        throw new Error("Profile ID is required");
      }
      console.log("ProfileID: ", profileId);
      const formData = new FormData();
      console.log("profileData: ", profileData);
      formData.append("ProfileInfo", JSON.stringify(profileData));
      formData.append("avatar", profileData.avatar as File);
      console.log("Sending profile data:", formData);

      await updateUserProfile(formData, profileId);
      toast.success("Profile saved successfully!");
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error("Failed to save profile. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm" variant="outline">
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-screen w-full max-w-lg overflow-hidden">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 max-w-3xl mx-auto py-10"
          >
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
            </DialogHeader>
            <div className="h-[400px] overflow-y-auto px-4">
              <FormField
                control={form.control}
                name="isStartup"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel>Are you a Startup?</FormLabel>
                      <FormDescription>
                        Toggle on to create a Startup account, or off for a
                        Candidate account.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your name"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is the full name of the user or startup.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Email address (e.g., user@example.com).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={
                            field.value ? parseISO(field.value) : undefined
                          }
                          onSelect={(date) =>
                            field.onChange(
                              date ? format(date, "yyyy-MM-dd") : ""
                            )
                          }
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      You can use this for your startup as well
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="avatar"
                render={({ field: { onChange, value } }) => (
                  <FormItem>
                    <FormLabel>Avatar</FormLabel>
                    <FormControl>
                      <FileUploader
                        value={value instanceof File ? [value] : []}
                        onValueChange={(files) => {
                          const file = files?.[0] || null;
                          if (file) {
                            onChange(file);
                          }
                        }}
                        dropzoneOptions={dropZoneConfig}
                        className="relative bg-background rounded-lg p-2"
                      >
                        <FileInput
                          id="fileInput"
                          className="outline-dashed outline-1 outline-slate-500"
                        >
                          <div className="flex items-center justify-center flex-col p-8 w-full">
                            <CloudUpload className="text-gray-500 w-10 h-10" />
                            <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">
                                Click to upload
                              </span>{" "}
                              &nbsp; or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              SVG, PNG, JPG, JPEG, or GIF (max size: 2MB)
                            </p>
                          </div>
                        </FileInput>
                        <FileUploaderContent>
                          {value instanceof File ? (
                            <FileUploaderItem index={0}>
                              <Paperclip className="h-4 w-4 stroke-current" />
                              <span>{value.name}</span>
                            </FileUploaderItem>
                          ) : value ? (
                            <div className="flex items-center justify-between m-1">
                              <Image
                                className="w-12 h-12 rounded-full"
                                src={value}
                                alt="Avatar"
                                width={60}
                                height={60}
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                onClick={() => onChange("")}
                                size="icon"
                              >
                                <XIcon />
                              </Button>
                            </div>
                          ) : null}
                        </FileUploaderContent>
                      </FileUploader>
                    </FormControl>
                    <FormDescription>
                      Optional: Upload a new file or keep the current avatar.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Industry</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Example: Software Developer"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter the field you are working in.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-start">
                    <FormLabel>Phone number</FormLabel>
                    <FormControl className="w-full">
                      <PhoneInput
                        placeholder="Placeholder"
                        {...field}
                        defaultCountry={"TR"}
                      />
                    </FormControl>
                    <FormDescription>Enter your phone number.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Change Country</FormLabel>
                    <FormControl>
                      <LocationSelector
                        onCountryChange={(selectedCountry) => {
                          setCountryName(selectedCountry?.name || "");
                          form.setValue("country", selectedCountry?.name || "");
                        }}
                        onStateChange={(selectedState) => {
                          setStateName(selectedState?.name || "");
                          form.setValue("city", selectedState?.name || "");
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      Select the country you want to set
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-6">
                  <FormField
                    control={form.control}
                    name="websiteLink"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website</FormLabel>
                        <FormControl>
                          <Input placeholder="" type="" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is your website URL.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="col-span-6">
                  <FormField
                    control={form.control}
                    name="linkedInURL"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>LinkedIn</FormLabel>
                        <FormControl>
                          <Input
                            placeholder=""
                            type="text"
                            {...field}
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormDescription>
                          Enter your LinkedIn profile URL.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {!form.watch("isStartup") ? (
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value || undefined}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>Choose your gender</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : (
                <FormField
                  control={form.control}
                  name="currentStage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Startup Stage</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your startup stage" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="idea">Idea Stage</SelectItem>
                          <SelectItem value="mvp">MVP Stage</SelectItem>
                          <SelectItem value="seed">Seed Stage</SelectItem>
                          <SelectItem value="series-a">Series A</SelectItem>
                          <SelectItem value="series-b">Series B</SelectItem>
                          <SelectItem value="growth">Growth Stage</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Select the current stage of your startup.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="slogan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slogan</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Example: Life is like lemonade. It is filled with bitter, sour and sweet moments."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Write a short tagline or slogan your profile.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell me about yourself/your startup"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Write a short description or bio for the profile
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profile Tags</FormLabel>
                    <FormControl>
                      <TagsInput
                        value={field.value || []}
                        onValueChange={field.onChange}
                        placeholder="Add tags (e.g., 'Tech, Startup, AI')"
                      />
                    </FormControl>
                    <FormDescription>
                      Add relevant tags to describe your profile (e.g., Tech,
                      Startup, AI).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {!form.watch("isStartup") ? (
                <>
                  <FormField
                    control={form.control}
                    name="hobbyInterest"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hobby Interest</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Example: I love gaming."
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          You can list out what you like to do here
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="education"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Education</FormLabel>
                        <FormControl>
                          <Textarea placeholder="" {...field} />
                        </FormControl>
                        <FormDescription>
                          Highest education level or degree obtained.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Dynamic Experiences Section */}
                  <div>
                    <h3 className="text-lg font-semibold">Experiences</h3>
                    {experienceFields.map((field, index) => (
                      <div
                        key={field.id}
                        className="mb-4 grid grid-cols-2 gap-4"
                      >
                        {/* Company Name */}
                        <div className="col-span-1">
                          <FormField
                            control={form.control}
                            name={`experiences.${index}.companyName`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Company Name</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter the company name"
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription>
                                  Provide the company name.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Role */}
                        <div className="col-span-1">
                          <FormField
                            control={form.control}
                            name={`experiences.${index}.role`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Role</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter your role"
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription>
                                  Enter the job title or role.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Location */}
                        <div className="col-span-2">
                          <FormField
                            control={form.control}
                            name={`experiences.${index}.location`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Location</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter the location"
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription>
                                  Specify the work location.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Description */}
                        <div className="col-span-2">
                          <FormField
                            control={form.control}
                            name={`experiences.${index}.description`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Describe your role or work"
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription>
                                  Briefly describe your responsibilities.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Start Date */}
                        <div className="col-span-1">
                          <FormField
                            control={form.control}
                            name={`experiences.${index}.startDate`}
                            render={({ field }) => (
                              <FormItem className="flex flex-col">
                                <FormLabel>Start Date</FormLabel>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant={"outline"}
                                        className={cn(
                                          "w-[240px] pl-3 text-left font-normal",
                                          !field.value &&
                                            "text-muted-foreground"
                                        )}
                                      >
                                        {field.value ? (
                                          format(field.value, "PPP")
                                        ) : (
                                          <span>Select start date</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                  >
                                    <Calendar
                                      mode="single"
                                      selected={
                                        field.value
                                          ? parseISO(field.value)
                                          : undefined
                                      }
                                      onSelect={(date) =>
                                        field.onChange(
                                          date ? format(date, "yyyy-MM-dd") : ""
                                        )
                                      }
                                    />
                                  </PopoverContent>
                                </Popover>
                                <FormDescription>
                                  Enter the start date of this experience.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* End Date */}
                        <div className="col-span-1">
                          <FormField
                            control={form.control}
                            name={`experiences.${index}.endDate`}
                            render={({ field }) => (
                              <FormItem className="flex flex-col">
                                <FormLabel>End Date</FormLabel>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant={"outline"}
                                        className={cn(
                                          "w-[240px] pl-3 text-left font-normal",
                                          !field.value &&
                                            "text-muted-foreground"
                                        )}
                                      >
                                        {field.value ? (
                                          format(field.value, "PPP")
                                        ) : (
                                          <span>Select end date</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                  >
                                    <Calendar
                                      mode="single"
                                      selected={
                                        field.value
                                          ? parseISO(field.value)
                                          : undefined
                                      }
                                      onSelect={(date) =>
                                        field.onChange(
                                          date ? format(date, "yyyy-MM-dd") : ""
                                        )
                                      }
                                    />
                                  </PopoverContent>
                                </Popover>
                                <FormDescription>
                                  Enter the end date of this experience.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Remove Button */}
                        <div className="col-span-2">
                          <Button
                            type="button"
                            variant="destructive"
                            onClick={() => removeExperience(index)}
                          >
                            Remove Experience
                          </Button>
                        </div>
                      </div>
                    ))}

                    {/* Add Button */}
                    <Button
                      type="button"
                      onClick={() =>
                        addExperience({
                          companyName: "",
                          role: "",
                          location: "",
                          description: "",
                          startDate: "",
                          endDate: "",
                        })
                      }
                    >
                      Add Experience
                    </Button>
                  </div>

                  {/* Dynamic Certificates Section */}
                  <div>
                    <h3 className="text-lg font-semibold">Certificates</h3>
                    {certificateFields.map((field, index) => (
                      <div
                        key={field.id}
                        className="mb-4 grid grid-cols-2 gap-4"
                      >
                        {/* Certificate Name */}
                        <div className="col-span-1">
                          <FormField
                            control={form.control}
                            name={`certificates.${index}.name`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Certificate Name</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter certificate name"
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription>
                                  Provide the name of the certificate.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Skill */}
                        <div className="col-span-1">
                          <FormField
                            control={form.control}
                            name={`certificates.${index}.skill`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Skill</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter related skill"
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription>
                                  Specify the skill associated with this
                                  certificate.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Description */}
                        <div className="col-span-2">
                          <FormField
                            control={form.control}
                            name={`certificates.${index}.description`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Brief description of the certificate"
                                    className="resize-none"
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription>
                                  Describe the certificate briefly.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Start Date */}
                        <div className="col-span-1">
                          <FormField
                            control={form.control}
                            name={`certificates.${index}.startDate`}
                            render={({ field }) => (
                              <FormItem className="flex flex-col">
                                <FormLabel>Start Date</FormLabel>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant={"outline"}
                                        className={cn(
                                          "w-[240px] pl-3 text-left font-normal",
                                          !field.value &&
                                            "text-muted-foreground"
                                        )}
                                      >
                                        {field.value ? (
                                          format(field.value, "PPP")
                                        ) : (
                                          <span>Select start date</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                  >
                                    <Calendar
                                      mode="single"
                                      selected={
                                        field.value
                                          ? parseISO(field.value)
                                          : undefined
                                      }
                                      onSelect={(date) =>
                                        field.onChange(
                                          date ? format(date, "yyyy-MM-dd") : ""
                                        )
                                      }
                                    />
                                  </PopoverContent>
                                </Popover>
                                <FormDescription>
                                  Enter the start date of this certificate.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* End Date */}
                        <div className="col-span-1">
                          <FormField
                            control={form.control}
                            name={`certificates.${index}.endDate`}
                            render={({ field }) => (
                              <FormItem className="flex flex-col">
                                <FormLabel>End Date</FormLabel>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant={"outline"}
                                        className={cn(
                                          "w-[240px] pl-3 text-left font-normal",
                                          !field.value &&
                                            "text-muted-foreground"
                                        )}
                                      >
                                        {field.value ? (
                                          format(field.value, "PPP")
                                        ) : (
                                          <span>Select end date</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                  >
                                    <Calendar
                                      mode="single"
                                      selected={
                                        field.value
                                          ? parseISO(field.value)
                                          : undefined
                                      }
                                      onSelect={(date) =>
                                        field.onChange(
                                          date ? format(date, "yyyy-MM-dd") : ""
                                        )
                                      }
                                    />
                                  </PopoverContent>
                                </Popover>
                                <FormDescription>
                                  Enter the end date of this certificate.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* GPA */}
                        <div className="col-span-2">
                          <FormField
                            control={form.control}
                            name={`certificates.${index}.gpa`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>GPA</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter GPA (e.g., 4.0)"
                                    type="number"
                                    step="0.1"
                                    min={0}
                                    max={4}
                                    value={field.value ?? ""} // Ensure no undefined value
                                    onChange={(e) =>
                                      field.onChange(
                                        e.target.value === ""
                                          ? undefined
                                          : Number(e.target.value)
                                      )
                                    }
                                  />
                                </FormControl>
                                <FormDescription>
                                  Optional: Enter GPA associated with this
                                  certificate.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Remove Button */}
                        <div className="col-span-2">
                          <Button
                            type="button"
                            variant="destructive"
                            onClick={() => removeCertificate(index)}
                          >
                            Remove Certificate
                          </Button>
                        </div>
                      </div>
                    ))}

                    {/* Add Certificate Button */}
                    <Button
                      type="button"
                      onClick={() =>
                        addCertificate({
                          name: "",
                          skill: "",
                          description: "",
                          startDate: "",
                          endDate: "",
                          gpa: undefined,
                        })
                      }
                    >
                      Add Certificate
                    </Button>
                  </div>

                  {/* Dynamic Achievements Section */}
                  <div>
                    <h3 className="text-lg font-semibold">Achievements</h3>
                    {achievementFields.map((field, index) => (
                      <div
                        key={field.id}
                        className="mb-4 grid grid-cols-2 gap-4"
                      >
                        {/* Achievement Name */}
                        <div className="col-span-2">
                          <FormField
                            control={form.control}
                            name={`achievements.${index}.name`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Achievement Name</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter the achievement name"
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription>
                                  Provide the name of the achievement.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Description */}
                        <div className="col-span-2">
                          <FormField
                            control={form.control}
                            name={`achievements.${index}.description`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Brief description of the achievement"
                                    className="resize-none"
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription>
                                  Describe the achievement briefly (optional).
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Date */}
                        <div className="col-span-1">
                          <FormField
                            control={form.control}
                            name={`achievements.${index}.date`}
                            render={({ field }) => (
                              <FormItem className="flex flex-col">
                                <FormLabel>Date</FormLabel>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant={"outline"}
                                        className={cn(
                                          "w-[240px] pl-3 text-left font-normal",
                                          !field.value &&
                                            "text-muted-foreground"
                                        )}
                                      >
                                        {field.value ? (
                                          format(field.value, "PPP")
                                        ) : (
                                          <span>Select date</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                  >
                                    <Calendar
                                      mode="single"
                                      selected={
                                        field.value
                                          ? parseISO(field.value)
                                          : undefined
                                      }
                                      onSelect={(date) =>
                                        field.onChange(
                                          date ? format(date, "yyyy-MM-dd") : ""
                                        )
                                      }
                                    />
                                  </PopoverContent>
                                </Popover>
                                <FormDescription>
                                  Enter the date of this achievement.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Remove Button */}
                        <div className="col-span-2">
                          <Button
                            type="button"
                            variant="destructive"
                            onClick={() => removeAchievement(index)}
                          >
                            Remove Achievement
                          </Button>
                        </div>
                      </div>
                    ))}

                    {/* Add Achievement Button */}
                    <Button
                      type="button"
                      onClick={() =>
                        addAchievement({
                          name: "",
                          description: "",
                          date: "",
                        })
                      }
                    >
                      Add Achievement
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <FormField
                    control={form.control}
                    name="statement"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Startup Statement</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="e.g., Empowering businesses through AI-driven solutions."
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Write a brief, impactful statement that defines your
                          startup.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="aboutUs"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Startup About Us</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about your startup's mission, vision, and story."
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Provide a detailed overview of your startup, including
                          its mission, goals, and story.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Dynamic Job Positions Section */}
                  <div>
                    <h3 className="text-lg font-semibold">Job Positions</h3>
                    {jobPositionFields.map((field, index) => (
                      <div
                        key={field.id}
                        className="mb-4 grid grid-cols-2 gap-4"
                      >
                        {/* Job Title */}
                        <div className="col-span-1">
                          <FormField
                            control={form.control}
                            name={`jobPositions.${index}.jobTitle`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Job Title</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter job title"
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription>
                                  Specify the title of the job position.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Is Opening (Toggle) */}
                        <div className="col-span-1">
                          <FormField
                            control={form.control}
                            name={`jobPositions.${index}.isOpening`}
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>
                                    Is Open for Applications
                                  </FormLabel>
                                  <FormDescription>
                                    Check if this job position is currently open
                                  </FormDescription>
                                  <FormMessage />
                                </div>
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Country */}
                        <div className="col-span-1">
                          <FormField
                            control={form.control}
                            name={`jobPositions.${index}.country`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Country</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter country name"
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription>
                                  Specify the country for this job.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* City */}
                        <div className="col-span-1">
                          <FormField
                            control={form.control}
                            name={`jobPositions.${index}.city`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter city name"
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription>
                                  Specify the city for this job.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Start Date */}
                        <div className="col-span-1">
                          <FormField
                            control={form.control}
                            name={`jobPositions.${index}.startDate`}
                            render={({ field }) => (
                              <FormItem className="flex flex-col">
                                <FormLabel>Start Date</FormLabel>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant={"outline"}
                                        className={cn(
                                          "w-[240px] pl-3 text-left font-normal",
                                          !field.value &&
                                            "text-muted-foreground"
                                        )}
                                      >
                                        {field.value ? (
                                          format(field.value, "PPP")
                                        ) : (
                                          <span>Select start date</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                  >
                                    <Calendar
                                      mode="single"
                                      selected={
                                        field.value
                                          ? parseISO(field.value)
                                          : undefined
                                      }
                                      onSelect={(date) =>
                                        field.onChange(
                                          date ? format(date, "yyyy-MM-dd") : ""
                                        )
                                      }
                                    />
                                  </PopoverContent>
                                </Popover>
                                <FormDescription>
                                  Provide the starting date for this position.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Tags */}
                        <div className="col-span-1">
                          <FormField
                            control={form.control}
                            name={`jobPositions.${index}.tags`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Tags</FormLabel>
                                <FormControl>
                                  <TagsInput
                                    value={field.value || []}
                                    onValueChange={field.onChange}
                                    placeholder="Enter your tags"
                                  />
                                </FormControl>
                                <FormDescription>
                                  Add relevant tags for this position.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Description */}
                        <div className="col-span-2">
                          <FormField
                            control={form.control}
                            name={`jobPositions.${index}.description`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Describe the job position"
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription>
                                  Provide a detailed description of this job
                                  position.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Remove Button */}
                        <div className="col-span-2">
                          <Button
                            type="button"
                            variant="destructive"
                            onClick={() => removeJobPosition(index)}
                          >
                            Remove Job Position
                          </Button>
                        </div>
                      </div>
                    ))}

                    {/* Add Job Position Button */}
                    <Button
                      type="button"
                      onClick={() =>
                        addJobPosition({
                          jobTitle: "",
                          isOpening: false,
                          country: "",
                          city: "",
                          startDate: "",
                          description: "",
                          tags: [],
                        })
                      }
                    >
                      Add Job Position
                    </Button>
                  </div>
                </>
              )}
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Form>
  );
};
