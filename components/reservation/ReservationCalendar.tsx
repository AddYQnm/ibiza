"use client";

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

type Props = {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
};

export default function ReservationCalendar({ value, onChange }: Props) {
  return (
    <div className="border border-white/15 bg-black/40 p-4">
      <p className="mb-3 text-sm uppercase tracking-widest text-white/60">
        Date souhaitée
      </p>

      <DayPicker
        mode="single"
        selected={value}
        onSelect={onChange}
        className="text-white"
        modifiersStyles={{
          selected: {
            backgroundColor: "#a855f7",
            color: "white",
          },
        }}
        styles={{
          caption: { color: "white" },
          head_cell: { color: "rgba(255,255,255,0.5)" },
        }}
      />
    </div>
  );
}
