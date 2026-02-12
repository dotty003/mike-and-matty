"use client";
import { useAdmin } from "../../components/AdminContext";
import { AdminInput, AdminTextarea } from "../../components/FormFields";

export default function EditBooking() {
  const { content, loading, updateSection } = useAdmin();

  if (loading || !content) {
    return <div className="text-slate-400">Loading...</div>;
  }

  const booking = content.booking;
  const update = (field: string, value: string) => {
    updateSection("booking", { ...booking, [field]: value });
  };

  return (
    <div>
      <h1 className="text-2xl font-serif text-white mb-8">Edit Booking Section</h1>

      <div className="max-w-2xl space-y-2">
        <AdminInput label="Title" value={booking.title} onChange={(v) => update("title", v)} />
        <AdminInput label="Title Accent (gold italic text)" value={booking.titleAccent} onChange={(v) => update("titleAccent", v)} />
        <AdminTextarea label="Description" value={booking.description} onChange={(v) => update("description", v)} rows={3} />
        <AdminInput label="Session Title" value={booking.sessionTitle} onChange={(v) => update("sessionTitle", v)} />
        <AdminInput label="Session Duration" value={booking.sessionDuration} onChange={(v) => update("sessionDuration", v)} />
        <AdminInput label="Session Type" value={booking.sessionType} onChange={(v) => update("sessionType", v)} />
        <AdminInput label="CTA Button Text" value={booking.ctaText} onChange={(v) => update("ctaText", v)} />
        <AdminInput label="Calendar URL" value={booking.calendarUrl} onChange={(v) => update("calendarUrl", v)} />
        <AdminInput label="Security Text" value={booking.securityText} onChange={(v) => update("securityText", v)} />
        <AdminInput label="Footnote" value={booking.footnote} onChange={(v) => update("footnote", v)} />
      </div>
    </div>
  );
}
