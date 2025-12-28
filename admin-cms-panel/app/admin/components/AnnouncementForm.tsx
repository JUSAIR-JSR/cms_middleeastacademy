'use client';

import { ICON_MAP } from "@/app/lib/iconRegistry";
import { TAILWIND_COLORS, TAILWIND_SHADES } from "@/app/lib/tailwindColors";
import { AnnouncementFormState } from "./AnnouncementBuilder";

/* shadcn ui */
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

type Props = {
  form: AnnouncementFormState;
  onChange: (name: keyof AnnouncementFormState, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
};

export default function AnnouncementForm({
  form,
  onChange,
  onSubmit,
  loading,
}: Props) {
  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4 rounded-xl border bg-white p-6 shadow-sm"
    >
      {/* TYPE */}
      <Select value={form.type} onValueChange={(v) => onChange("type", v)}>
        <SelectTrigger>
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="New Batch">New Batch</SelectItem>
          <SelectItem value="Workshop">Workshop</SelectItem>
          <SelectItem value="Placement">Placement</SelectItem>
        </SelectContent>
      </Select>

      {/* TITLE */}
      <Input
        placeholder="Title"
        value={form.title}
        onChange={(e) => onChange("title", e.target.value)}
      />

      {/* DESCRIPTION */}
      <Textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) => onChange("description", e.target.value)}
      />

      {/* DATE */}
      <Input
        type="date"
        value={form.date}
        onChange={(e) => onChange("date", e.target.value)}
      />

      {/* COLOR */}
      <Select value={form.color} onValueChange={(v) => onChange("color", v)}>
        <SelectTrigger>
          <SelectValue placeholder="Color" />
        </SelectTrigger>
        <SelectContent>
          {TAILWIND_COLORS.map((c) => (
            <SelectItem key={c} value={c}>
              {c}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* SHADE */}
      <Select value={form.shade} onValueChange={(v) => onChange("shade", v)}>
        <SelectTrigger>
          <SelectValue placeholder="Shade" />
        </SelectTrigger>
        <SelectContent>
          {TAILWIND_SHADES.map((s) => (
            <SelectItem key={s} value={s}>
              {s}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* ICON */}
      <Select value={form.icon} onValueChange={(v) => onChange("icon", v)}>
        <SelectTrigger>
          <SelectValue placeholder="Icon (optional)" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">None</SelectItem>
          {Object.keys(ICON_MAP).map((icon) => (
            <SelectItem key={icon} value={icon}>
              {icon}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* STATUS */}
      <Select value={form.status} onValueChange={(v) => onChange("status", v)}>
        <SelectTrigger>
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="draft">Draft</SelectItem>
          <SelectItem value="published">Published</SelectItem>
        </SelectContent>
      </Select>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Saving..." : "Save Announcement"}
      </Button>
    </form>
  );
}
