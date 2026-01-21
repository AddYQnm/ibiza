"use client";

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { motion } from "framer-motion";

export default function DatePickerModal({
  open,
  onClose,
  value,
  onChange,
}: any) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="rounded-3xl bg-zinc-900 p-8 border border-white/10"
      >
        <h3 className="mb-4 text-lg font-semibold text-white">
          Choisir une date
        </h3>

        <DayPicker
          mode="single"
          selected={value}
          onSelect={(d) => {
            onChange(d);
            onClose();
          }}
        />

        <button
          onClick={onClose}
          className="mt-6 text-sm text-white/60 hover:text-white"
        >
          Annuler
        </button>
      </motion.div>
    </div>
  );
}
