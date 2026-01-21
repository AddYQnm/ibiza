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
    type: "table",
    extras: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const response = await fetch("/api/reservation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, type: "table" }),
    });

    const result = await response.json();
    if (response.ok) {
      alert("Réservation envoyée avec succès !");
      setForm({
        name: "",
        email: "",
        phone: "",
        date: new Date(),
        time: "",
        guests: 1,
        type: "table",
        extras: "",
      });
    } else {
      alert("Erreur: " + result.error);
    }
  } catch (err: any) {
    alert("Erreur serveur: " + err.message);
  }
};


  // Classe Tailwind premium pour tous les inputs/selects/textarea
  const inputClass =
    "p-4 rounded-lg bg-black/70 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold transition w-full";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gradient-to-br from-black/60 via-gray-900/60 to-black/60 p-8 rounded-xl shadow-xl space-y-6 backdrop-blur-md"
    >
      <h2 className="text-2xl font-bold text-white text-center">Réservation</h2>

      {/* Informations personnelles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Nom et prénom"
          value={form.name}
          onChange={handleChange}
          className={inputClass}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className={inputClass}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Numéro de téléphone"
          value={form.phone}
          onChange={handleChange}
          className={inputClass}
          required
        />
      </div>

      {/* Détails réservation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DatePicker
          selected={form.date}
          onChange={(date: Date) => setForm({ ...form, date })}
          className={inputClass}
          required
        />
        <input
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
          className={inputClass}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <input
          type="number"
          name="guests"
          min={1}
          max={20}
          value={form.guests}
          onChange={handleChange}
          placeholder="Nombre de personnes"
          className={inputClass}
          required
        />
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="table">Table</option>
          <option value="entrée">Entrée générale</option>
          <option value="VIP">VIP</option>
        </select>
      </div>

      <textarea
        name="extras"
        placeholder="Demandes particulières (anniversaire, bouteille spéciale…)"
        value={form.extras}
        onChange={handleChange}
        className={inputClass}
        rows={4}
      />

      <button
        type="submit"
        className="w-full py-4 bg-gold text-black font-bold rounded-lg hover:scale-105 transition"
      >
        Réserver
      </button>
    </form>
  );
}
