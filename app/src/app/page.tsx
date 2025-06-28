"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { dayjs } from "@/lib/date";

/* Filter & UI */
import AppointmentFilter from "@/components/appointments/AppointmentFilter";
import DateRangeFilter   from "@/components/appointments/DateRangeFilter";
import AppointmentList   from "@/components/appointments/AppointmentList";
import MonthView         from "@/components/calendar/MonthView";
import WeekView          from "@/components/calendar/WeekView";
import AppointmentDialog from "@/components/appointments/AppointmentDialog";

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function CalendarPage() {
  const router = useRouter();
  const sp     = useSearchParams();

  /* --- aktive Ansicht ---------------------------------------------- */
  const view = sp.get("view") === "week"
    ? "week"
    : sp.get("view") === "list"
      ? "list"
      : "month";

  /* --- Filter & Range ---------------------------------------------- */
  const fromIso    = sp.get("from") ?? undefined;
  const toIso      = sp.get("to")   ?? undefined;
  const dateParam  = fromIso ?? sp.get("date") ?? dayjs().format("YYYY-MM-DD");

  const categoryId = sp.get("cat") ?? undefined;
  const patientId  = sp.get("pat") ?? undefined;

  const commonFilters = { categoryId, patientId };
  const commonRange   = { fromIso, toIso };

  /* --- URL‐Builder -------------------------------------------------- */
  const buildUrl = (next: Record<string, string | undefined>) => {
    const q = new URLSearchParams(sp);
    Object.entries(next).forEach(([k, v]) =>
      v ? q.set(k, v) : q.delete(k)
    );
    return `/?${q.toString()}`;
  };

  /* --- Dialog‐State ------------------------------------------------- */
  const [openCreate, setOpenCreate] = useState(false);

  /* --- UI ----------------------------------------------------------- */
  return (
    <main className="mx-auto max-w-5xl p-6 space-y-6">
      {/* Header‐Leiste */}
      <section className="flex flex-wrap items-center gap-6 rounded-xl bg-card px-4 py-3 shadow">
        <DateRangeFilter />

        {/* Ansicht‐Tabs */}
        <ToggleGroup
          aria-label="Ansicht wählen"
          type="single"
          value={view}
          onValueChange={(v) => router.push(buildUrl({ view: v || "month" }))}
          className="rounded-lg bg-muted px-2 py-1 focus-visible:outline-none"
        >
          <ToggleGroupItem value="list"  className="px-4">Liste</ToggleGroupItem>
          <ToggleGroupItem value="week"  className="px-4">Woche</ToggleGroupItem>
          <ToggleGroupItem value="month" className="px-4">Monat</ToggleGroupItem>
        </ToggleGroup>

        <div className="flex-grow" />

        <Button
          aria-label="Neuen Termin anlegen"
          onClick={() => setOpenCreate(true)}
          className="flex items-center gap-2"
        >
          <Plus size={16} aria-hidden="true" />
          <span className="sr-only">Neuer Termin</span>
        </Button>
      </section>

      {/* Kategorie / Patienten‐Filter */}
      <AppointmentFilter />

      {/* Haupt‐Bereich */}
      <section className="rounded-xl bg-card p-4 shadow">
        {view === "list" ? (
          <AppointmentList filters={commonFilters} range={commonRange} />
        ) : view === "week" ? (
          <WeekView  date={dateParam} filters={commonFilters} range={commonRange} />
        ) : (
          <MonthView date={dateParam} filters={commonFilters} range={commonRange} />
        )}
      </section>

      {/* Dialog: Neuer Termin */}
      <AppointmentDialog open={openCreate} onClose={() => setOpenCreate(false)} />
    </main>
  );
}
