"use client";

import TableReservationForm from "./TableReservationForm";
import PrivatisationForm from "./PrivatisationForm";

interface ReservationFormProps {
  type: "table" | "privatisation";
}

export default function ReservationForm({ type }: ReservationFormProps) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      {type === "table" ? <TableReservationForm /> : <PrivatisationForm />}
    </div>
  );
}
