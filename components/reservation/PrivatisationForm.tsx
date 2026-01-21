"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function PrivatisationForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    date: new Date(),
    startTime: "",
    endTime: "",
    eventType: "anniversaire",
    location: "Speakeasy",
    guests: 10,
    services: "",
    message: "",
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
        company: "",
        date: new Date(),
        startTime: "",
        endTime: "",
        eventType: "anniversaire",
        location: "Speakeasy",
        guests: 10,
        services: "",
        message: "",
      });
    } else {
      alert("Erreur: " + result.error);
    }
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Erreur inconnue";
    alert("Erreur serveur: " + errorMessage);
  }
};


  // Classe Tailwind premium pour tous les inputs / selects / textarea
  const inputClass =
    "p-4 rounded-lg bg-black/70 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold transition w-full";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gradient-to-br from-black/60 via-gray-900/60 to-black/60 p-8 rounded-xl shadow-xl space-y-6 backdrop-blur-md"
    >
      <h2 className="text-2xl font-bold text-white text-center">
        Privatisation / Événement
      </h2>

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
        <input
          type="text"
          name="company"
          placeholder="Entreprise / Organisation (facultatif)"
          value={form.company}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      {/* Détails événement */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DatePicker
          selected={form.date}
          onChange={(date: Date | null) => date && setForm({ ...form, date })}
          className={inputClass}
          required
        />
        <input
          type="time"
          name="startTime"
          value={form.startTime}
          onChange={handleChange}
          placeholder="Heure de début"
          className={inputClass}
          required
        />
        <input
          type="time"
          name="endTime"
          value={form.endTime}
          onChange={handleChange}
          placeholder="Heure de fin"
          className={inputClass}
          required
        />
      </div>

      {/* Type d'événement et lieu */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <select
          name="eventType"
          value={form.eventType}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="anniversaire">Anniversaire</option>
          <option value="soireeEntreprise">Soirée entreprise</option>
          <option value="cocktail">Cocktail</option>
        </select>
        <select
          name="location"
          value={form.location}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="Speakeasy">Speakeasy</option>
          <option value="Boîte entière">Boîte entière</option>
        </select>
        <input
          type="number"
          name="guests"
          min={5}
          max={500}
          value={form.guests}
          onChange={handleChange}
          placeholder="Nombre approximatif d’invités"
          className={inputClass}
        />
      </div>

      {/* Services supplémentaires et message */}
      <textarea
        name="services"
        placeholder="Services supplémentaires (restauration, DJ…)"
        value={form.services}
        onChange={handleChange}
        className={inputClass}
        rows={3}
      />

      <textarea
        name="message"
        placeholder="Message libre / détails"
        value={form.message}
        onChange={handleChange}
        className={inputClass}
        rows={4}
      />

      <button
        type="submit"
        className="w-full py-4 bg-gold text-black font-bold rounded-lg hover:scale-105 transition"
      >
        Envoyer la demande
      </button>
    </form>
  );
}
