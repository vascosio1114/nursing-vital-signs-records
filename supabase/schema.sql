create extension if not exists pgcrypto;

create table if not exists public.vital_signs_records (
  id uuid primary key default gen_random_uuid(),
  student_name text not null,
  student_id text not null,
  class_group text not null,
  measured_date date not null,
  measured_time time not null,
  patient_type text not null check (
    patient_type in ('adult_simulated', 'real_clinical')
  ),
  temperature numeric(4, 1) not null check (temperature > 0),
  temperature_route text not null check (
    temperature_route in ('oral', 'axillary', 'tympanic')
  ),
  pulse_rate integer not null check (pulse_rate > 0),
  pulse_site text not null check (
    pulse_site in ('radial', 'apical', 'carotid', 'brachial')
  ),
  pulse_rhythm text not null check (pulse_rhythm in ('regular', 'irregular')),
  respiration_rate integer not null check (respiration_rate > 0),
  respiration_quality text not null check (
    respiration_quality in (
      'regular_unlabored',
      'irregular',
      'labored',
      'shallow',
      'deep'
    )
  ),
  systolic_bp integer not null check (systolic_bp > 0),
  diastolic_bp integer not null check (diastolic_bp > 0),
  arm_used text not null check (arm_used in ('left', 'right')),
  position text not null check (position in ('sitting', 'standing', 'lying')),
  spo2 integer not null check (spo2 > 0 and spo2 <= 100),
  oxygen_mode text not null check (oxygen_mode in ('room_air', 'oxygen_therapy')),
  pain_score integer not null check (pain_score >= 0 and pain_score <= 10),
  notes text,
  student_reflection text not null,
  checklist_completed text not null check (checklist_completed in ('yes', 'no')),
  is_abnormal boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists vital_signs_records_student_search_idx
  on public.vital_signs_records (student_name, student_id);

create index if not exists vital_signs_records_class_date_idx
  on public.vital_signs_records (class_group, measured_date);

create index if not exists vital_signs_records_abnormal_idx
  on public.vital_signs_records (is_abnormal);

alter table public.vital_signs_records enable row level security;

-- The app writes and reads through server-side API routes using the service role key.
-- No anon/authenticated SELECT policy is added, so student records are not public.
grant usage on schema public to service_role;
grant select, insert, update, delete on public.vital_signs_records to service_role;
