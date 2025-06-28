"use client";

import { useSearchParams } from "next/navigation";
import DateRangeFilter     from "@/components/appointments/DateRangeFilter";
import AppointmentFilter   from "@/components/appointments/AppointmentFilter";
import AppointmentList     from "@/components/appointments/AppointmentList";

export default function AppointmentsPage() {
  const sp          = useSearchParams();
  const categoryId  = sp.get("cat")  ?? undefined;
  const patientId   = sp.get("pat")  ?? undefined;
  const from        = sp.get("from") ?? undefined;
  const to          = sp.get("to")   ?? undefined;

  return (
    <main className="mx-auto max-w-5xl p-6 space-y-6">
      {/* Kopfbereich */}
      <header className="flex flex-wrap items-center gap-6 rounded-xl bg-card px-4 py-3 shadow">
        <h1 className="text-xl font-semibold tracking-tight">Termin­liste</h1>
        <DateRangeFilter />
      </header>

      {/* Filterleisten */}
      <section className="rounded-xl bg-card p-4 shadow space-y-4">
        <AppointmentFilter />

        <AppointmentList
          filters={{ categoryId, patientId }}
          range={{ fromIso: from, toIso: to }}
        />
      </section>
    </main>
  );
}
