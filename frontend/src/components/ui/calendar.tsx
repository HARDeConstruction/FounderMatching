"use client";

import * as React from "react";
import {
  DayPicker,
  NextMonthButton,
  PreviousMonthButton,
} from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      captionLayout="dropdown"
      startMonth={new Date(1911, 6)}
      endMonth={new Date(2111, 6)}
      className={cn("p-3", className)}
      classNames={{
        months: "flex sm:flex-col flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        months_dropdown: "font-medium relative translate-x-[-5px]",
        years_dropdown: "font-medium relative translate-x-[-5px]",
        caption: "flex justify-center pt-1 items-center",
        caption_label: "hidden",
        nav: "space-x-1 pr-1 ml-auto absolute top-3 right-1",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        weekdays: "flex flex-row space-x-2",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        selected: "bg-foreground text-accent",
        outside: "bg-transparent text-muted-foreground opacity-50",
        today: "bg-accent text-accent-foreground",
        disabled: "text-muted-foreground opacity-50",
        day_hidden: "invisible",
        ...classNames,
      }}
      // components={{
      //   PreviousMonthButton: ({ className, ...props }) => (
      //     <ChevronLeftIcon className={cn("h-4 w-4", className)} {...props} />
      //   ),
      //   NextMonthButton: ({ className, ...props }) => (
      //     <ChevronRightIcon className={cn("h-4 w-4", className)} {...props} />
      //   ),
      // } as any}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
