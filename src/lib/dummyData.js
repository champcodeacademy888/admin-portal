// ─── Helpers ────────────────────────────────────────────────
function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
}

function daysFromNow(n) {
  const d = new Date()
  d.setDate(d.getDate() + n)
  return d.toISOString()
}

function daysAgo(n) {
  return daysFromNow(-n)
}

function randomTime() {
  const hours = [9, 10, 11, 14, 15, 16, 17, 18, 19]
  const h = hours[Math.floor(Math.random() * hours.length)]
  return `${String(h).padStart(2, '0')}:00`
}

// ─── Countries ──────────────────────────────────────────────
const COUNTRIES = ['SG', 'MY', 'PH', 'ID', 'AE', 'HK', 'LK']
const CURRENCY_MAP = { SG: 'SGD', MY: 'MYR', PH: 'PHP', ID: 'IDR', AE: 'AED', HK: 'HKD', LK: 'LKR' }

// ─── Tutors (8) ─────────────────────────────────────────────
export const TUTORS = [
  { id: uuid(), full_name: 'Arun Sharma', role: 'tutor', country: 'SG', created_at: daysAgo(200) },
  { id: uuid(), full_name: 'Mei Ling Tan', role: 'tutor', country: 'SG', created_at: daysAgo(190) },
  { id: uuid(), full_name: 'Rizal Hakim', role: 'tutor', country: 'MY', created_at: daysAgo(180) },
  { id: uuid(), full_name: 'Maria Santos', role: 'tutor', country: 'PH', created_at: daysAgo(170) },
  { id: uuid(), full_name: 'Dewi Putri', role: 'tutor', country: 'ID', created_at: daysAgo(160) },
  { id: uuid(), full_name: 'Fatima Al-Hassan', role: 'tutor', country: 'AE', created_at: daysAgo(150) },
  { id: uuid(), full_name: 'Jason Lau', role: 'tutor', country: 'HK', created_at: daysAgo(140) },
  { id: uuid(), full_name: 'Nuwan Perera', role: 'tutor', country: 'LK', created_at: daysAgo(130) },
]

function tutorForCountry(country) {
  const match = TUTORS.filter((t) => t.country === country)
  if (match.length) return match[Math.floor(Math.random() * match.length)]
  return TUTORS[Math.floor(Math.random() * TUTORS.length)]
}

// ─── Leads (50) ─────────────────────────────────────────────
const LEAD_NAMES = [
  'Priya Nair', 'Ahmad Bin Yusof', 'Cherry Mae Reyes', 'Siti Aminah', 'Tan Wei Ming',
  'Ravi Chandran', 'Lim Jia Xuan', 'Nur Aisyah', 'Paolo Mendoza', 'Kavitha Devi',
  'Wong Kar Wai', 'Rashid Khan', 'Ananya Gupta', 'Budi Santoso', 'Kim Soo Jin',
  'Nurul Huda', 'Carlos Garcia', 'Lakshmi Menon', 'Hafiz Rahman', 'Isabel Reyes',
  'Deepa Krishnan', 'Farah Zain', 'Raj Patel', 'Thanya Thongchai', 'Aisha Begum',
  'Chong Wei Liang', 'Putri Wulandari', 'Miguel Torres', 'Shalini Jayawardena', 'Yusuf Ali',
  'Jenny Teo', 'Kumar Selvam', 'Rosalinda Cruz', 'Zainab Hussain', 'Liew Mei Fong',
  'Arjun Reddy', 'Nadia Ismail', 'Thilina Fernando', 'Grace Ong', 'Mohammad Aziz',
  'Patricia Lim', 'Suresh Kumar', 'Angela Dela Cruz', 'Irfan Shah', 'Chandra Kumari',
  'Darren Ng', 'Fitri Handayani', 'Jose Rizal Jr', 'Devi Lakshmi', 'Omar Farooq',
]

const CHANNELS = ['whatsapp', 'messenger']
const SOURCES = ['facebook_ad', 'instagram_ad', 'referral', 'organic']
const LEVELS = ['beginner', 'intermediate', 'advanced']
const PACKAGES = ['Starter 8', 'Standard 12', 'Premium 16', 'Intensive 24']
const LOST_REASONS = ['price', 'timing', 'chose competitor', 'not interested']

const LEAD_STATUS_DIST = [
  ...Array(10).fill('inquiry'),
  ...Array(8).fill('lead'),
  ...Array(7).fill('trial_arranged'),
  ...Array(6).fill('trial_attended'),
  ...Array(5).fill('no_show'),
  ...Array(8).fill('enrolled'),
  ...Array(4).fill('lost'),
  ...Array(2).fill('cold'),
]

export const LEADS = LEAD_NAMES.map((name, i) => {
  const status = LEAD_STATUS_DIST[i]
  const country = COUNTRIES[i % COUNTRIES.length]
  const age = 7 + (i % 9)
  return {
    id: uuid(),
    name,
    contact_number: `+${60 + (i % 8)}${String(10000000 + Math.floor(Math.random() * 89999999))}`,
    channel: CHANNELS[i % 2],
    country,
    source: SOURCES[i % 4],
    status,
    child_age: age,
    child_level: LEVELS[i % 3],
    learning_goals: ['Build first game', 'Learn Python basics', 'Prepare for competition', 'Improve logic skills', 'Create apps'][i % 5],
    package_interest: PACKAGES[i % 4],
    lost_reason: status === 'lost' ? LOST_REASONS[i % 4] : null,
    assigned_to: TUTORS[i % TUTORS.length].id,
    created_at: daysAgo(60 - i),
    updated_at: daysAgo(Math.max(0, 30 - i)),
  }
})

// ─── Trials (30) ────────────────────────────────────────────
const TRIAL_CLASSES = ['Scratch Intro', 'Python Basics', 'Web Dev Taster', 'Game Design Intro', 'Roblox Studio']
const TUTOR_NOTES_LIST = [
  'Student was very engaged, picked up loops quickly. Recommend Scratch Intermediate.',
  'Good session. Needs more practice with variables. Parent keen on weekly classes.',
  'Excellent focus for age. Completed the full tutorial. Ready for beginner course.',
  'Student was shy at first but warmed up. Enjoyed the game project.',
  'Strong logical thinking. Already has some coding experience. Suggest intermediate track.',
  'Fun session! Student loved creating sprites. Parent asked about sibling discount.',
  'Student completed basic exercises. Needs help with sequencing concepts.',
  'Very enthusiastic. Parent wants to enrol immediately. Discussed package options.',
  'Good trial overall. Student preferred Python over Scratch.',
  'Student found it challenging but stayed engaged. Suggest starting with fundamentals.',
  'Brilliant session. Student created a full mini-game. Highly motivated.',
  'Parent sat in and was impressed. Asked about holiday intensive programs.',
]

export const TRIALS = Array.from({ length: 30 }, (_, i) => {
  const lead = LEADS[i % LEADS.length]
  const tutor = tutorForCountry(lead.country)
  let outcome, scheduled_at, tutor_notes

  if (i < 10) {
    outcome = null
    scheduled_at = daysFromNow(1 + i)
    tutor_notes = null
  } else if (i < 22) {
    outcome = 'attended'
    scheduled_at = daysAgo(1 + (i - 10) * 2)
    tutor_notes = TUTOR_NOTES_LIST[i - 10]
  } else if (i < 27) {
    outcome = 'no_show'
    scheduled_at = daysAgo(3 + (i - 22) * 3)
    tutor_notes = null
  } else {
    outcome = 'rescheduled'
    scheduled_at = daysFromNow(3 + (i - 27) * 2)
    tutor_notes = null
  }

  return {
    id: uuid(),
    lead_id: lead.id,
    lead_name: lead.name,
    scheduled_at,
    class_type: TRIAL_CLASSES[i % TRIAL_CLASSES.length],
    country: lead.country,
    channel: lead.channel,
    outcome,
    tutor_id: tutor.id,
    tutor_name: tutor.full_name,
    tutor_notes,
    created_at: daysAgo(30 - i),
  }
})

// ─── Students (40) ──────────────────────────────────────────
const STUDENT_NAMES = [
  'Ethan Tan', 'Chloe Lim', 'Arjun Menon', 'Sofia Reyes', 'Daniel Wong',
  'Aisha Rahman', 'Lucas Ng', 'Priya Sharma', 'Ryan Chong', 'Maya Santos',
  'Zara Khan', 'Oliver Teo', 'Anya Krishnan', 'Kai Nakamura', 'Lily Ong',
  'Hassan Ali', 'Emma Lau', 'Rohan Patel', 'Mei Xin Chen', 'Noah Ibrahim',
  'Sana Begum', 'Jayden Lee', 'Amara Perera', 'Marcus Ho', 'Devi Nair',
  'Yusuf Aziz', 'Hannah Goh', 'Aryan Singh', 'Isabelle Tan', 'Rafi Hasan',
  'Tara Fernando', 'Liam Chia', 'Nisha Gupta', 'Adam Yusof', 'Zoe Wee',
  'Aarav Joshi', 'Caitlyn Koh', 'Imran Sheikh', 'Serena Cruz', 'Vincent Liew',
]

const CLASS_TYPES = ['Scratch', 'Python', 'Web Development', 'Game Design', 'Roblox', 'App Development']
const CHURN_REASONS = ['taking a break', 'financial', 'lost interest', 'switching provider']
const DAYS_OF_WEEK = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

const STUDENT_STATUS_DIST = [
  ...Array(30).fill('active'),
  ...Array(6).fill('churned'),
  ...Array(4).fill('return'),
]

export const STUDENTS = STUDENT_NAMES.map((name, i) => {
  const status = STUDENT_STATUS_DIST[i]
  const country = COUNTRIES[i % COUNTRIES.length]
  const tutor = tutorForCountry(country)
  const lessonsRemaining = 1 + (i % 20)
  const lessonsTotal = lessonsRemaining + 4 + (i % 12)

  return {
    id: uuid(),
    lead_id: LEADS[i % LEADS.length].id,
    name,
    country,
    channel: CHANNELS[i % 2],
    contact_number: `+${60 + (i % 8)}${String(10000000 + Math.floor(Math.random() * 89999999))}`,
    child_age: 7 + (i % 9),
    child_level: LEVELS[i % 3],
    class_type: CLASS_TYPES[i % CLASS_TYPES.length],
    status,
    churn_reason: status === 'churned' ? CHURN_REASONS[i % 4] : null,
    assigned_to: tutor.id,
    assigned_to_name: tutor.full_name,
    lessons_remaining: lessonsRemaining,
    lessons_total: lessonsTotal,
    package_name: PACKAGES[i % PACKAGES.length],
    package_expiry: daysFromNow(15 + i * 3),
    day_of_week: DAYS_OF_WEEK[i % DAYS_OF_WEEK.length],
    time: randomTime(),
    created_at: daysAgo(120 - i * 2),
  }
})

// ─── Classes / Attendance (60) ──────────────────────────────
const activeStudents = STUDENTS.filter((s) => s.status === 'active')

export const CLASSES = Array.from({ length: 60 }, (_, i) => {
  const student = activeStudents[i % activeStudents.length]
  const tutor = TUTORS.find((t) => t.id === student.assigned_to) ?? TUTORS[0]
  const weekOffset = Math.floor(i / 15)
  const dayOffset = weekOffset * 7 + (i % 5)

  let outcome
  const roll = Math.random()
  if (roll < 0.80) outcome = 'attended'
  else if (roll < 0.95) outcome = 'absent'
  else outcome = 'no_show'

  return {
    id: uuid(),
    student_id: student.id,
    student_name: student.name,
    schedule_id: uuid(),
    tutor_id: tutor.id,
    tutor_name: tutor.full_name,
    scheduled_at: daysAgo(dayOffset),
    type: i % 8 === 0 ? 'makeup' : 'regular',
    outcome,
    cover_tutor_id: null,
    cover_tutor_name: null,
    notes: outcome === 'attended' ? ['Good progress', 'Completed module', 'Needs revision', 'Excellent work', ''][i % 5] : '',
    country: student.country,
    created_at: daysAgo(dayOffset),
  }
})

// ─── Makeups (15) ───────────────────────────────────────────
const MAKEUP_STATUS = [
  ...Array(5).fill('scheduled'),
  ...Array(5).fill('completed'),
  ...Array(3).fill('pending'),
  ...Array(2).fill('no_show'),
]

export const MAKEUPS = Array.from({ length: 15 }, (_, i) => {
  const student = activeStudents[i % activeStudents.length]
  const tutor = TUTORS.find((t) => t.id === student.assigned_to) ?? TUTORS[0]
  const status = MAKEUP_STATUS[i]

  let scheduled_at
  if (status === 'scheduled') scheduled_at = daysFromNow(1 + i * 2)
  else if (status === 'pending') scheduled_at = null
  else scheduled_at = daysAgo(2 + i * 2)

  return {
    id: uuid(),
    student_id: student.id,
    student_name: student.name,
    original_class_date: daysAgo(10 + i * 2),
    scheduled_at,
    tutor_id: tutor.id,
    tutor_name: tutor.full_name,
    class_type: student.class_type,
    status,
    country: student.country,
    reason: ['Sick', 'Family event', 'School exam', 'Holiday', 'Schedule conflict'][i % 5],
    created_at: daysAgo(8 + i),
  }
})

// ─── Invoices (30) ──────────────────────────────────────────
const INVOICE_AMOUNTS = {
  SG: [280, 420, 560, 800],
  MY: [350, 520, 700, 1000],
  PH: [4000, 6000, 8000, 12000],
  ID: [800000, 1200000, 1600000, 2400000],
  AE: [500, 750, 1000, 1500],
  HK: [1800, 2700, 3600, 5400],
  LK: [15000, 22000, 30000, 45000],
}

const INV_STATUS_DIST = [
  ...Array(12).fill('paid'),
  ...Array(8).fill('paid'),
  ...Array(6).fill('pending'),
  ...Array(4).fill('overdue'),
]

const OVERDUE_DAYS = [3, 7, 14, 30]

export const INVOICES = Array.from({ length: 30 }, (_, i) => {
  const student = STUDENTS[i % STUDENTS.length]
  const status = INV_STATUS_DIST[i]
  const country = student.country
  const amounts = INVOICE_AMOUNTS[country]
  const amount = amounts[i % amounts.length]
  const isManual = i < 12
  const pkgIndex = i % PACKAGES.length

  let issued_at, paid_at, due_at
  if (status === 'overdue') {
    const overdueDays = OVERDUE_DAYS[i % 4]
    issued_at = daysAgo(30 + overdueDays)
    due_at = daysAgo(overdueDays)
    paid_at = null
  } else if (status === 'pending') {
    issued_at = daysAgo(5 + i)
    due_at = daysFromNow(10 + i)
    paid_at = null
  } else {
    issued_at = daysAgo(40 + i * 2)
    due_at = daysAgo(25 + i * 2)
    paid_at = daysAgo(26 + i * 2)
  }

  return {
    id: uuid(),
    student_id: student.id,
    student_name: student.name,
    amount,
    currency: CURRENCY_MAP[country],
    status,
    payment_method: status === 'paid' ? (isManual ? 'manual' : 'stripe') : null,
    payment_screenshot_url: isManual && status === 'paid' ? 'https://placeholder.co/receipt.png' : null,
    package_name: PACKAGES[pkgIndex],
    lessons_count: [8, 12, 16, 24][pkgIndex],
    issued_at,
    paid_at,
    due_at,
    country,
    created_by: TUTORS[0].id,
    created_at: issued_at,
  }
})

// ─── Schedules (for active students) ────────────────────────
export const SCHEDULES = activeStudents.map((student) => {
  const tutor = TUTORS.find((t) => t.id === student.assigned_to) ?? TUTORS[0]
  return {
    id: uuid(),
    student_id: student.id,
    student_name: student.name,
    tutor_id: tutor.id,
    tutor_name: tutor.full_name,
    day_of_week: student.day_of_week,
    time: student.time,
    frequency: Math.random() > 0.3 ? 'weekly' : 'fortnightly',
    class_type: student.class_type,
    country: student.country,
    is_active: true,
    created_at: student.created_at,
  }
})

// ─── Enrolments (recently enrolled leads) ───────────────────
export const RECENT_ENROLMENTS = LEADS
  .filter((l) => l.status === 'enrolled')
  .map((lead) => ({
    ...lead,
    enrolled_at: lead.updated_at,
    package: PACKAGES[Math.floor(Math.random() * PACKAGES.length)],
  }))
