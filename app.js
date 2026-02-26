const STORAGE_KEY = 'ramadhan-tracker-v1';

const quranPlan = [
  'Al-Fatihah',
  'Al-Baqarah (1–141)',
  'Al-Baqarah (142–286)',
  "Ali 'Imran",
  'An-Nisa',
  "Al-Ma'idah",
  "Al-An'am",
  "Al-A'raf",
  'Al-Anfal',
  'At-Tawbah',
  'Yunus',
  'Hud',
  'Yusuf',
  "Ar-Ra'd + Ibrahim",
  'Al-Hijr + An-Nahl',
  'Al-Isra + Al-Kahf',
  'Maryam + Ta-Ha',
  'Al-Anbiya + Al-Hajj',
  "Al-Mu'minun + An-Nur",
  "Al-Furqan + Ash-Shu'ara",
  'An-Naml + Al-Qasas',
  "Al-'Ankabut + Ar-Rum",
  'Luqman + As-Sajdah + Al-Ahzab',
  'Saba + Fatir + Ya-Sin',
  'As-Saffat + Sad + Az-Zumar',
  'Ghafir + Fussilat',
  'Ash-Shura + Az-Zukhruf + Ad-Dukhan + Al-Jathiyah',
  'Al-Ahqaf + Muhammad + Al-Fath + Al-Hujurat',
  "Qaf + Adh-Dhariyat + At-Tur + An-Najm + Al-Qamar + Ar-Rahman + Al-Waqi'ah",
  'Al-Hadid to An-Nas',
];

const activityFields = [
  ['fajr', 'Fajr'],
  ['dhuhr', 'Dhuhr'],
  ['asr', 'Asr'],
  ['maghrib', 'Maghrib'],
  ['isha', 'Isha'],
  ['taraweeh', 'Taraweeh'],
  ['quranCompleted', 'Quran Reading Done'],
  ['dhikr', 'Dhikr'],
  ['sadaqah', 'Sadaqah'],
  ['exercise', 'Exercise'],
  ['water', 'Water Goal'],
  ['sleep', 'Sleep Consistency'],
];

const daySelect = document.getElementById('daySelect');
const summaryEl = document.getElementById('summary');
const dayDetailsEl = document.getElementById('dayDetails');
const daysGridEl = document.getElementById('daysGrid');
const template = document.getElementById('activityTemplate');

let state = loadState();
let selectedDay = 1;

initialize();

function initialize() {
  for (let i = 1; i <= 30; i += 1) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = `Day ${i}`;
    daySelect.appendChild(option);
  }

  daySelect.addEventListener('change', (event) => {
    selectedDay = Number(event.target.value);
    renderDayDetails();
  });

  document.getElementById('resetCurrent').addEventListener('click', () => {
    if (!confirm(`Reset records for day ${selectedDay}?`)) return;
    state.days[selectedDay - 1] = createDay(selectedDay);
    persist();
    renderAll();
  });

  document.getElementById('resetAll').addEventListener('click', () => {
    if (!confirm('Reset all 30 days? This cannot be undone.')) return;
    state = createInitialState();
    selectedDay = 1;
    daySelect.value = '1';
    persist();
    renderAll();
  });

  daySelect.value = String(selectedDay);
  renderAll();
}

function createInitialState() {
  return {
    startedAt: new Date().toISOString().slice(0, 10),
    days: Array.from({ length: 30 }, (_, i) => createDay(i + 1)),
  };
}

function createDay(day) {
  return {
    day,
    date: dateByOffset(day - 1),
    surah: quranPlan[day - 1],
    notes: '',
    fajr: false,
    dhuhr: false,
    asr: false,
    maghrib: false,
    isha: false,
    taraweeh: false,
    quranCompleted: false,
    dhikr: false,
    sadaqah: false,
    exercise: false,
    water: false,
    sleep: false,
  };
}

function dateByOffset(offset) {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return date.toISOString().slice(0, 10);
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return createInitialState();

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed.days) || parsed.days.length !== 30) {
      return createInitialState();
    }
    return parsed;
  } catch {
    return createInitialState();
  }
}

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function renderAll() {
  renderSummary();
  renderDayDetails();
  renderDayGrid();
}

function renderSummary() {
  const completedDays = state.days.filter((day) => day.quranCompleted).length;
  const totalActivitiesDone = state.days.reduce(
    (sum, day) =>
      sum + activityFields.reduce((daySum, [field]) => daySum + Number(day[field]), 0),
    0,
  );
  const totalPossibleActivities = state.days.length * activityFields.length;
  const completionPercent = Math.round((totalActivitiesDone / totalPossibleActivities) * 100);

  const streak = state.days.reduce(
    (result, day) => {
      if (day.quranCompleted) {
        result.current += 1;
        result.longest = Math.max(result.longest, result.current);
      } else {
        result.current = 0;
      }
      return result;
    },
    { current: 0, longest: 0 },
  );

  summaryEl.innerHTML = '';
  summaryEl.appendChild(metricCard('Days with Quran Completed', `${completedDays}/30`));
  summaryEl.appendChild(metricCard('Activity Completion', `${completionPercent}%`));
  summaryEl.appendChild(metricCard('Current Quran Streak', `${streak.current} day(s)`));
  summaryEl.appendChild(metricCard('Longest Quran Streak', `${streak.longest} day(s)`));
}

function metricCard(label, value) {
  const div = document.createElement('div');
  div.className = 'metric';
  div.innerHTML = `<p>${label}</p><strong>${value}</strong>`;
  return div;
}

function renderDayDetails() {
  const day = state.days[selectedDay - 1];

  dayDetailsEl.innerHTML = '';
  const title = document.createElement('h2');
  title.textContent = `Day ${day.day} • ${day.surah}`;

  const meta = document.createElement('p');
  meta.className = 'day-meta';
  meta.textContent = `Date: ${day.date}`;

  const activityGrid = document.createElement('div');
  activityGrid.className = 'activity-grid';

  activityFields.forEach(([field, label]) => {
    const fragment = template.content.cloneNode(true);
    const input = fragment.querySelector('input');
    const span = fragment.querySelector('span');

    input.checked = day[field];
    span.textContent = label;

    input.addEventListener('change', () => {
      day[field] = input.checked;
      persist();
      renderSummary();
      renderDayGrid();
    });

    activityGrid.appendChild(fragment);
  });

  const noteLabel = document.createElement('label');
  noteLabel.textContent = 'Notes / Reflection';

  const notes = document.createElement('textarea');
  notes.value = day.notes || '';
  notes.placeholder = 'Write your reflections or goals for this day...';
  notes.addEventListener('input', () => {
    day.notes = notes.value;
    persist();
  });

  dayDetailsEl.append(title, meta, activityGrid, noteLabel, notes);
}

function renderDayGrid() {
  daysGridEl.innerHTML = '';

  state.days.forEach((day) => {
    const card = document.createElement('article');
    card.className = 'day-card';

    const completed = activityFields.filter(([field]) => day[field]).length;
    const statusClass = day.quranCompleted ? 'done' : 'pending';
    const statusText = day.quranCompleted ? 'Done' : 'Not Yet';

    card.innerHTML = `
      <h3>Day ${day.day}</h3>
      <p>${day.surah}</p>
      <span class="status ${statusClass}">Quran: ${statusText}</span>
      <p>Activities: ${completed}/${activityFields.length}</p>
    `;

    card.addEventListener('click', () => {
      selectedDay = day.day;
      daySelect.value = String(day.day);
      renderDayDetails();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    daysGridEl.appendChild(card);
  });
}
