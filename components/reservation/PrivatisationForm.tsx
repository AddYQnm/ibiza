/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Notice = {
  type: "success" | "error" | "info";
  title: string;
  message?: string;
};

type FormState = {
  name: string;
  email: string;
  phone: string;
  company: string;
  date: Date;
  startTime: string;
  endTime: string;
  eventType: string;
  location: string;
  guests: number;
  services: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialForm: FormState = {
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
};

export default function PrivatisationForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notice, setNotice] = useState<Notice | null>(null);

  useEffect(() => {
    if (!notice) return;
    const id = window.setTimeout(() => setNotice(null), 6000);
    return () => window.clearTimeout(id);
  }, [notice]);

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

    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!form.name.trim()) newErrors.name = "Le nom et prénom est requis.";
    if (!form.email.trim()) newErrors.email = "L’email est requis.";
    if (!form.phone.trim()) newErrors.phone = "Le téléphone est requis.";
    if (!form.startTime.trim())
      newErrors.startTime = "L’heure de début est requise.";
    if (!form.endTime.trim())
      newErrors.endTime = "L’heure de fin est requise.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      setNotice({
        type: "error",
        title: "Informations manquantes",
        message: "Veuillez remplir tous les champs obligatoires marqués d’un *.",
      });
      return;
    }

    setIsSubmitting(true);
    setNotice({
      type: "info",
      title: "Envoi en cours…",
      message: "Merci de patienter.",
    });

    try {
      const response = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, type: "privatisation" }),
      });

      const text = await response.text();
      let result: any = {};
      try {
        result = text ? JSON.parse(text) : {};
      } catch {
        result = { error: text };
      }

      if (!response.ok) {
        setNotice({
          type: "error",
          title: "Impossible d’envoyer la demande",
          message: result?.error ?? `Erreur API (${response.status})`,
        });
        return;
      }

      setNotice({
        type: "success",
        title: "Demande envoyée",
        message:
          "Nous revenons vers vous très rapidement pour organiser votre événement.",
      });

      setForm(initialForm);
      setErrors({});
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Erreur inconnue";
      setNotice({
        type: "error",
        title: "Erreur serveur",
        message: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "p-4 rounded-lg bg-black/70 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold transition w-full";

  const labelClass =
    "block mb-1 text-sm font-medium text-white/80 tracking-wide";

  const noticeStyles = (type: Notice["type"]) => {
    switch (type) {
      case "success":
        return "border-emerald-400/20 bg-emerald-500/10 text-emerald-100";
      case "error":
        return "border-rose-400/20 bg-rose-500/10 text-rose-100";
      default:
        return "border-white/10 bg-white/5 text-white/90";
    }
  };

  const errorTextClass = "mt-1 text-sm text-rose-300";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gradient-to-br from-black/60 via-gray-900/60 to-black/60 p-8 rounded-xl shadow-xl space-y-6 backdrop-blur-md"
    >
      {notice && (
        <div
          className={`relative overflow-hidden rounded-xl border p-4 ${noticeStyles(
            notice.type
          )}`}
        >
          <div className="flex items-start gap-3">
            <div className="mt-0.5 h-2.5 w-2.5 rounded-full bg-white/60" />
            <div className="flex-1">
              <p className="font-semibold">{notice.title}</p>
              {notice.message && (
                <p className="mt-1 text-sm opacity-90">{notice.message}</p>
              )}
            </div>

            <button
              type="button"
              onClick={() => setNotice(null)}
              className="rounded-md px-2 py-1 text-white/70 hover:text-white hover:bg-white/5 transition"
              aria-label="Fermer"
            >
              ✕
            </button>
          </div>

          <div className="mt-3 h-[2px] w-full bg-white/10">
            <div className="h-[2px] w-1/3 bg-white/30" />
          </div>
        </div>
      )}

      <h2 className="text-2xl font-bold text-white text-center">
        Privatisation / Événement
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>
            Nom et prénom <span className="text-rose-300">*</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="Jean Dupont"
            value={form.name}
            onChange={handleChange}
            className={inputClass}
          />
          {errors.name && <p className={errorTextClass}>{errors.name}</p>}
        </div>

        <div>
          <label className={labelClass}>
            Email <span className="text-rose-300">*</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="email@exemple.com"
            value={form.email}
            onChange={handleChange}
            className={inputClass}
          />
          {errors.email && <p className={errorTextClass}>{errors.email}</p>}
        </div>

        <div>
          <label className={labelClass}>
            Téléphone <span className="text-rose-300">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            placeholder="06 12 34 56 78"
            value={form.phone}
            onChange={handleChange}
            className={inputClass}
          />
          {errors.phone && <p className={errorTextClass}>{errors.phone}</p>}
        </div>

        <div>
          <label className={labelClass}>Entreprise / Organisation</label>
          <input
            type="text"
            name="company"
            placeholder="(optionnel)"
            value={form.company}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1">
          <label className={labelClass}>
            Date <span className="text-rose-300">*</span>
          </label>
          <DatePicker
            selected={form.date}
            onChange={(date: Date | null) =>
              date && setForm((p) => ({ ...p, date }))
            }
            className={inputClass}
            dateFormat="dd/MM/yyyy"
            required
          />
        </div>

        <div>
          <label className={labelClass}>
            Heure de début <span className="text-rose-300">*</span>
          </label>
          <input
            type="time"
            name="startTime"
            value={form.startTime}
            onChange={handleChange}
            className={inputClass}
          />
          {errors.startTime && (
            <p className={errorTextClass}>{errors.startTime}</p>
          )}
        </div>

        <div>
          <label className={labelClass}>
            Heure de fin <span className="text-rose-300">*</span>
          </label>
          <input
            type="time"
            name="endTime"
            value={form.endTime}
            onChange={handleChange}
            className={inputClass}
          />
          {errors.endTime && (
            <p className={errorTextClass}>{errors.endTime}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className={labelClass}>Type d’événement</label>
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
        </div>

        <div>
          <label className={labelClass}>Lieu</label>
          <select
            name="location"
            value={form.location}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="Speakeasy">Speakeasy</option>
            <option value="Boîte entière">Boîte entière</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>Nombre d’invités</label>
          <input
            type="number"
            name="guests"
            min={5}
            max={500}
            value={form.guests}
            onChange={handleChange}
            className={inputClass}
            placeholder="ex: 80"
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Services supplémentaires</label>
        <textarea
          name="services"
          placeholder="Restauration, DJ, bouteilles, sécurité…"
          value={form.services}
          onChange={handleChange}
          className={inputClass}
          rows={3}
        />
      </div>

      <div>
        <label className={labelClass}>Message / détails</label>
        <textarea
          name="message"
          placeholder="Décris ton événement, horaires, demandes spéciales…"
          value={form.message}
          onChange={handleChange}
          className={inputClass}
          rows={4}
        />
      </div>

      <p className="text-sm text-white/60">
        <span className="text-rose-300">*</span> Champs obligatoires
      </p>

      <button
        type="submit"
        disabled={isSubmitting}
        className="
          w-full py-4 bg-gold text-white font-bold rounded-lg transition
          hover:scale-105 disabled:hover:scale-100
          disabled:opacity-60 disabled:cursor-not-allowed
        "
      >
        {isSubmitting ? "Envoi…" : "Envoyer la demande"}
      </button>
    </form>
  );
}