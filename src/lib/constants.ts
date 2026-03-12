export const COUNTRIES = [
  { value: "netherlands", label: "Hollanda", flag: "🇳🇱" },
  { value: "denmark", label: "Danimarka", flag: "🇩🇰" },
  { value: "france", label: "Fransa", flag: "🇫🇷" },
  { value: "italy", label: "İtalya", flag: "🇮🇹" },
  { value: "austria", label: "Avusturya", flag: "🇦🇹" },
  { value: "belgium", label: "Belçika", flag: "🇧🇪" },
  { value: "germany", label: "Almanya", flag: "🇩🇪" },
  { value: "spain", label: "İspanya", flag: "🇪🇸" },
  { value: "sweden", label: "İsveç", flag: "🇸🇪" },
  { value: "norway", label: "Norveç", flag: "🇳🇴" },
] as const;

export const CITIES = [
  { value: "ankara", label: "Ankara" },
  { value: "istanbul-beyoglu", label: "İstanbul (Beyoğlu)" },
  { value: "istanbul-altunizade", label: "İstanbul (Altunizade)" },
  { value: "izmir", label: "İzmir" },
  { value: "antalya", label: "Antalya" },
  { value: "bursa", label: "Bursa" },
  { value: "gaziantep", label: "Gaziantep" },
] as const;

export const VISA_CATEGORIES = [
  "Turist Vizesi",
  "İş Vizesi",
  "Öğrenci Vizesi",
  "Aile Birleşimi",
  "Transit Vize",
  "Kısa Süreli (Schengen)",
] as const;

export type TrackingStatus = "idle" | "searching" | "found" | "error";

export interface Applicant {
  id: string;
  firstName: string;
  lastName: string;
  passport: string;
  birthDate: string;
  phone: string;
  email: string;
}

export const createEmptyApplicant = (id: string): Applicant => ({
  id,
  firstName: "",
  lastName: "",
  passport: "",
  birthDate: "",
  phone: "",
  email: "",
});
