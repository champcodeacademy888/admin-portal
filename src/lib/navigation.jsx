import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  UserPlus,
  GraduationCap,
  ClipboardCheck,
  CalendarClock,
  UserCheck,
  Calendar,
  BookOpen,
  BarChart3,
} from 'lucide-react'

const ICONS = {
  LayoutDashboard,
  Users,
  CalendarCheck,
  UserPlus,
  GraduationCap,
  ClipboardCheck,
  CalendarClock,
  UserCheck,
  Calendar,
  BookOpen,
  BarChart3,
}

function nav(label, path, iconName) {
  return { label, path, Icon: ICONS[iconName] }
}

export const NAV_ITEMS = {
  sales_admin: [
    nav('Dashboard', '/dashboard', 'LayoutDashboard'),
    nav('Leads', '/leads', 'Users'),
    nav('Trials', '/trials', 'CalendarCheck'),
    nav('Enrolments', '/enrolments', 'UserPlus'),
  ],
  enrolled_admin: [
    nav('Dashboard', '/dashboard', 'LayoutDashboard'),
    nav('Students', '/students', 'GraduationCap'),
    nav('Attendance', '/attendance', 'ClipboardCheck'),
    nav('Makeups', '/makeups', 'CalendarClock'),
    nav('Cover', '/cover', 'UserCheck'),
    nav('Schedule', '/schedule', 'Calendar'),
  ],
  tutor: [
    nav('Dashboard', '/dashboard', 'LayoutDashboard'),
    nav('My Classes', '/my-classes', 'BookOpen'),
    nav('Attendance', '/attendance', 'ClipboardCheck'),
  ],
  management: [
    nav('Dashboard', '/dashboard', 'LayoutDashboard'),
    nav('Reports', '/reports', 'BarChart3'),
    nav('All Students', '/students', 'GraduationCap'),
  ],
  super_admin: [
    nav('Dashboard', '/dashboard', 'LayoutDashboard'),
    nav('Leads', '/leads', 'Users'),
    nav('Trials', '/trials', 'CalendarCheck'),
    nav('Enrolments', '/enrolments', 'UserPlus'),
    nav('Students', '/students', 'GraduationCap'),
    nav('Attendance', '/attendance', 'ClipboardCheck'),
    nav('Makeups', '/makeups', 'CalendarClock'),
    nav('Cover', '/cover', 'UserCheck'),
    nav('Schedule', '/schedule', 'Calendar'),
    nav('My Classes', '/my-classes', 'BookOpen'),
    nav('Reports', '/reports', 'BarChart3'),
  ],
}

const ROLE_LABELS = {
  sales_admin: 'Sales Admin',
  enrolled_admin: 'Enrolled Admin',
  tutor: 'Tutor',
  management: 'Management',
  super_admin: 'Super Admin',
}

export function getRoleLabel(role) {
  return ROLE_LABELS[role] ?? role
}
