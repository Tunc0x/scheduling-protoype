"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";

interface Props {
  initialDate?: DateRange;
  onUpdate?: (range: DateRange | undefined) => void;
}

export function DatePickerWithRange({ initialDate, onUpdate }: Props) {
  const [date, setDate] = React.useState<DateRange | undefined>(initialDate);

  React.useEffect(() => {
    onUpdate?.(date);
  }, [date]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id="date"
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, "dd.MM.yyyy")} –{" "}
                {format(date.to, "dd.MM.yyyy")}
              </>
            ) : (
              format(date.from, "dd.MM.yyyy")
            )
          ) : (
            <span>Zeitraum wählen</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={setDate}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  );
}
