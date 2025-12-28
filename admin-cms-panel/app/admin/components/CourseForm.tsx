'use client';

import { ICON_MAP } from "../../lib/iconRegistry";
import { TAILWIND_COLORS, TAILWIND_SHADES } from "../../lib/tailwindColors";
import { CourseFormState } from "./CourseBuilder";

/* shadcn ui */
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

type Props = {
  form: CourseFormState;
  onChange: (e: React.ChangeEvent<any>) => void;
  onSubmit: (e: React.FormEvent) => void;
};

export default function CourseForm({ form, onChange, onSubmit }: Props) {
  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      {/* Title */}
      <Input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={onChange}
      />

      {/* Description */}
      <Textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={onChange}
      />

      {/* Duration */}
      <Input
        name="duration"
        placeholder="Duration"
        value={form.duration}
        onChange={onChange}
      />

      {/* Certification */}
      <Input
        name="certification"
        placeholder="Certification"
        value={form.certification}
        onChange={onChange}
      />

      {/* Placement */}
      <Input
        name="placement"
        placeholder="Placement Support"
        value={form.placement}
        onChange={onChange}
      />

      {/* Color */}
      <Select
        value={form.color}
        onValueChange={(value) =>
          onChange({
            target: { name: "color", value },
          } as any)
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Select color" />
        </SelectTrigger>
        <SelectContent>
          {TAILWIND_COLORS.map((c) => (
            <SelectItem key={c} value={c}>
              {c}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Shade */}
      <Select
        value={form.shade}
        onValueChange={(value) =>
          onChange({
            target: { name: "shade", value },
          } as any)
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Select shade" />
        </SelectTrigger>
        <SelectContent>
          {TAILWIND_SHADES.map((s) => (
            <SelectItem key={s} value={s}>
              {s}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Icon */}
      <Select
        value={form.icon}
        onValueChange={(value) =>
          onChange({
            target: { name: "icon", value },
          } as any)
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Select icon" />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(ICON_MAP).map((icon) => (
            <SelectItem key={icon} value={icon}>
              {icon}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
{/* STATUS */}
<Select
  value={form.status}
  onValueChange={(value) =>
    onChange({
      target: { name: "status", value },
    } as any)
  }
>
  <SelectTrigger>
    <SelectValue placeholder="Select status" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="draft">Draft</SelectItem>
    <SelectItem value="published">Published</SelectItem>
  </SelectContent>
</Select>


      {/* Submit */}
      <Button type="submit" className="w-full">
        Add Course
      </Button>
    </form>
  );
}
