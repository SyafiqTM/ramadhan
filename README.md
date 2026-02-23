# Ramadhan Activity & Quran Tracker

A simple web app to track daily Ramadhan activities and maintain a **consistent Quran reading plan** with a **surah target for each day**.

## Goal

Build a personal tracker for the month of Ramadhan to:
- Track daily ibadah/activity consistency
- Track Quran reading progress by day
- Show assigned surah for each day
- Store data locally (localhost/offline friendly)

---

## Tech Stack

- **Frontend:** Vue 3 (Vite)
- **Database (localhost):**
  - Option A (simple): `localStorage` (no backend)
  - Option B (recommended local DB): SQLite via a lightweight API (Express/Nitro)
- **CSS Framework:** Tailwind CSS

### Recommended MVP Stack

If you want fast development and zero backend complexity:
- Vue 3 + Tailwind CSS + localStorage

If you want more structured persistent data:
- Vue 3 + Tailwind CSS + Node/Express + SQLite

---

## Core Features (MVP)

1. **Daily Dashboard (Day 1–30)**
   - Date / Day number
   - Planned surah
   - Read status (Done / Not yet)
   - Notes/reflection

2. **Activity Checklist**
   Track yes/no or count for:
   - Fajr, Dhuhr, Asr, Maghrib, Isha
   - Taraweeh
   - Quran reading done
   - Dhikr
   - Charity/Sadaqah
   - Optional: exercise/water/sleep consistency

3. **Monthly Progress**
   - Days completed
   - Quran streak
   - Activity completion percentage

---

## Suggested Data Model

```ts
// Example shape if using localStorage or API payload
interface RamadhanDay {
  day: number; // 1..30
  date: string; // YYYY-MM-DD
  surah: string;
  quranCompleted: boolean;
  prayers: {
    fajr: boolean;
    dhuhr: boolean;
    asr: boolean;
    maghrib: boolean;
    isha: boolean;
    taraweeh: boolean;
  };
  dhikr: boolean;
  sadaqah: boolean;
  notes: string;
}
```

---

## Quran Tracker Plan (30 Days with Surah)

A balanced daily plan (short-to-medium surahs for consistency):

| Day | Surah |
|---|---|
| 1 | Al-Fatihah |
| 2 | Al-Baqarah (1–141) |
| 3 | Al-Baqarah (142–286) |
| 4 | Ali 'Imran |
| 5 | An-Nisa |
| 6 | Al-Ma'idah |
| 7 | Al-An'am |
| 8 | Al-A'raf |
| 9 | Al-Anfal |
| 10 | At-Tawbah |
| 11 | Yunus |
| 12 | Hud |
| 13 | Yusuf |
| 14 | Ar-Ra'd + Ibrahim |
| 15 | Al-Hijr + An-Nahl |
| 16 | Al-Isra + Al-Kahf |
| 17 | Maryam + Ta-Ha |
| 18 | Al-Anbiya + Al-Hajj |
| 19 | Al-Mu'minun + An-Nur |
| 20 | Al-Furqan + Ash-Shu'ara |
| 21 | An-Naml + Al-Qasas |
| 22 | Al-'Ankabut + Ar-Rum |
| 23 | Luqman + As-Sajdah + Al-Ahzab |
| 24 | Saba + Fatir + Ya-Sin |
| 25 | As-Saffat + Sad + Az-Zumar |
| 26 | Ghafir + Fussilat |
| 27 | Ash-Shura + Az-Zukhruf + Ad-Dukhan + Al-Jathiyah |
| 28 | Al-Ahqaf + Muhammad + Al-Fath + Al-Hujurat |
| 29 | Qaf + Adh-Dhariyat + At-Tur + An-Najm + Al-Qamar + Ar-Rahman + Al-Waqi'ah |
| 30 | Al-Hadid to An-Nas |

> You can customize this plan based on your recitation speed and preference.

---

## Project Structure (Suggestion)

```bash
ramadhan/
  src/
    components/
      DayCard.vue
      ActivityChecklist.vue
      ProgressSummary.vue
    data/
      quran-plan.ts
    stores/
      tracker.ts
    views/
      HomeView.vue
  README.md
```

---

## Development Roadmap

1. Initialize Vue + Tailwind project
2. Create Quran plan data file (30 days)
3. Build day card and checklist UI
4. Save/retrieve progress from localStorage (or SQLite API)
5. Add monthly summary metrics and streaks
6. Improve UX (filter by completed, reset month, export)

---

## Future Improvements

- User authentication
- Cloud sync (Supabase/Firebase)
- Printable monthly report
- Ramadan journal prompts
- Reminder notifications

---

## Notes

This project is for personal worship tracking and consistency. Keep it simple first (MVP), then iterate.

May Allah make your Ramadhan consistent, meaningful, and accepted. Ameen.
