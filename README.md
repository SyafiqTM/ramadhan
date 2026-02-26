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

- **Frontend:** HTML + Vanilla JavaScript (single-page style)
- **Persistence:** `localStorage` (offline-friendly, no backend)
- **Styling:** Custom CSS

---

## Core Features (Implemented)

1. **Daily Dashboard (Day 1–30)**
   - Date / Day number
   - Planned surah
   - Read status (Done / Not yet)
   - Notes/reflection

2. **Activity Checklist**
   Track yes/no for:
   - Fajr, Dhuhr, Asr, Maghrib, Isha
   - Taraweeh
   - Quran reading done
   - Dhikr
   - Charity/Sadaqah
   - Exercise, water, and sleep consistency

3. **Monthly Progress**
   - Days completed
   - Current and longest Quran streak
   - Activity completion percentage

4. **Data Persistence**
   - Saves all day records in localStorage
   - Reset selected day or reset full month

---

## Quran Tracker Plan (30 Days with Surah)

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

---

## Project Structure

```bash
ramadhan/
  index.html
  app.js
  styles.css
  README.md
```

---

## Run Locally

Since this app is static, you can run it with any local HTTP server:

```bash
python3 -m http.server 4173
```

Then open: `http://localhost:4173`

---

## Notes

This project is for personal worship tracking and consistency. Keep it simple first (MVP), then iterate.

May Allah make your Ramadhan consistent, meaningful, and accepted. Ameen.
