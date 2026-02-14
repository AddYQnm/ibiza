"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function TableReservationForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: new Date(),
    time: "",
    guests: 1,
    tableType: "table",
    extras: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "guests" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, type: "table" }),
      });

      const text = await response.text();
      let result: any = {};
      try {
        result = text ? JSON.parse(text) : {};
      } catch {
        result = { error: text };
      }

      if (!response.ok) {
        alert(`Erreur API (${response.status}) : ${result?.error ?? "inconnue"}`);
        return;
      }

      alert("Réservation envoyée avec succès !");
      setForm({
        name: "",
        email: "",
        phone: "",
        date: new Date(),
        time: "",
        guests: 1,
        tableType: "table",
        extras: "",
      });
    } catch (err: unknown) {
      alert(
        "Erreur serveur : " +
          (err instanceof Error ? err.message : "inconnue")
      );
    }
  };

  const inputClass =
    "p-4 rounded-lg bg-black/70 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold transition w-full";

  const labelClass =
    "block mb-1 text-sm font-medium text-white/80 tracking-wide";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gradient-to-br from-black/60 via-gray-900/60 to-black/60 p-8 rounded-xl shadow-xl space-y-6 backdrop-blur-md"
    >
      <h2 className="text-2xl font-bold text-white text-center">
        Réservation
      </h2>

      {/* Informations personnelles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Nom et prénom</label>
          <input
            type="text"
            name="name"
            placeholder="Jean Dupont"
            value={form.name}
            onChange={handleChange}
            className={inputClass}
            required
          />
        </div>

        <div>
          <label className={labelClass}>Email</label>
          <input
            type="email"
            name="email"
            placeholder="email@exemple.com"
            value={form.email}
            onChange={handleChange}
            className={inputClass}
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className={labelClass}>Téléphone</label>
          <input
            type="tel"
            name="phone"
            placeholder="06 12 34 56 78"
            value={form.phone}
            onChange={handleChange}
            className={inputClass}
            required
          />
        </div>
      </div>

      {/* Détails réservation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Date</label>
          <DatePicker
            selected={form.date}
            onChange={(date: Date | null) =>
              date && setForm({ ...form, date })
            }
            className={inputClass}
            dateFormat="dd/MM/yyyy"
            required
          />
        </div>

        <div>
          <label className={labelClass}>Heure d’arrivée</label>
          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            className={inputClass}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Nombre de personnes</label>
          <input
            type="number"
            name="guests"
            min={1}
            max={20}
            value={form.guests}
            onChange={handleChange}
            className={inputClass}
            required
          />
        </div>

        <div>
          <label className={labelClass}>Type de réservation</label>
          <select
            name="tableType"
            value={form.tableType}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="table">Table</option>
            <option value="entrée">Entrée générale</option>
            <option value="VIP">VIP</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>Demandes particulières</label>
        <textarea
          name="extras"
          placeholder="Anniversaire, bouteille spécifique, allergie…"
          value={form.extras}
          onChange={handleChange}
          className={inputClass}
          rows={4}
        />
      </div>

      <button
        type="submit"
        className="w-full py-4 bg-gold text-white font-bold rounded-lg hover:scale-105 transition"
      >
        Réserver
      </button>
    </form>
  );
}
