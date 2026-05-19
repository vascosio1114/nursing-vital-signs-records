"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  ClipboardCheck,
  ClipboardList,
  HeartPulse,
  Shield,
  Stethoscope,
  Thermometer,
  Wind,
} from "lucide-react";
import {
  ApiError,
  armOptions,
  measurementPositions,
  oxygenModes,
  patientTypes,
  pulseRhythms,
  pulseSites,
  respirationQualities,
  temperatureRoutes,
  yesNoOptions,
} from "@/lib/types";
import { abnormalMessages } from "@/lib/validation";

type FormState = {
  studentName: string;
  studentId: string;
  classGroup: string;
  measuredDate: string;
  measuredTime: string;
  patientType: string;
  temperature: string;
  temperatureRoute: string;
  pulseRate: string;
  pulseSite: string;
  pulseRhythm: string;
  respirationRate: string;
  respirationQuality: string;
  systolicBp: string;
  diastolicBp: string;
  armUsed: string;
  position: string;
  spo2: string;
  oxygenMode: string;
  painScore: string;
  notes: string;
  studentReflection: string;
  checklistCompleted: string;
};

const checklistSections = [
  {
    title: "Before procedure / 程序前",
    items: [
      "Hand hygiene",
      "Introduce self",
      "Confirm patient identity",
      "Explain procedure",
      "Prepare equipment",
    ],
  },
  {
    title: "During procedure / 程序中",
    items: [
      "Measure temperature",
      "Measure pulse",
      "Measure respirations",
      "Measure blood pressure",
      "Measure oxygen saturation",
      "Assess pain",
    ],
  },
  {
    title: "After procedure / 程序後",
    items: [
      "Ensure patient comfort",
      "Clean equipment",
      "Hand hygiene",
      "Document findings",
      "Report abnormalities immediately",
    ],
  },
];

const learningCards = [
  {
    title: "General Preparation Checklist",
    icon: ClipboardCheck,
    points: [
      "Equipment check",
      "Patient preparation",
      "Confirm patient identity using 2 identifiers",
      "Explain procedure",
      "Ensure privacy",
      "Hand hygiene",
      "Proper patient positioning",
      "Avoid smoking, exercise, caffeine, and talking during measurement",
    ],
  },
  {
    title: "Temperature Procedure",
    icon: Thermometer,
    points: [
      "Normal adult oral range: 36.5°C - 37.5°C",
      "Oral temperature checklist",
      "Observe fever, hypothermia, sweating, chills",
      "Documentation example: T: 37.1°C oral",
    ],
  },
  {
    title: "Pulse / Heart Rate Procedure",
    icon: HeartPulse,
    points: [
      "Normal adult range: 60-100 bpm",
      "Sites: radial, apical, carotid, brachial",
      "Radial pulse procedure",
      "Assess rate, rhythm, strength, equality bilaterally",
      "Documentation example: P: 78 bpm, regular, strong",
    ],
  },
  {
    title: "Respiration Procedure",
    icon: Wind,
    points: [
      "Normal adult range: 12-20 breaths/min",
      "Count respirations",
      "Assess rate, rhythm, depth, effort",
      "Observe dyspnea, labored breathing, accessory muscles, cyanosis",
      "Documentation example: R: 16/min, regular, unlabored",
    ],
  },
  {
    title: "Blood Pressure Procedure",
    icon: Stethoscope,
    points: [
      "Normal adult BP: approximately 120/80 mmHg",
      "Manual BP checklist",
      "Correct cuff size",
      "Arm supported at heart level",
      "Deflate cuff slowly at 2-3 mmHg/sec",
      "First sound = systolic",
      "Last sound = diastolic",
      "Abnormal findings: hypertension, hypotension, orthostatic hypotension",
      "Documentation example: BP: 118/76 mmHg, left arm, sitting",
    ],
  },
  {
    title: "Oxygen Saturation Procedure",
    icon: Activity,
    points: [
      "Normal range: 95%-100%",
      "Pulse oximeter checklist",
      "Warm finger, no nail polish, stable reading",
      "Record SpO2 and pulse rate",
      "Observe cyanosis, respiratory distress, low perfusion",
      "Documentation example: SpO2: 98% RA",
    ],
  },
  {
    title: "Pain Assessment",
    icon: ClipboardList,
    points: [
      "0-10 numeric pain scale",
      "Ask location, intensity, duration, character, aggravating factors, relieving factors",
      "Documentation example: Pain: 3/10, dull abdominal pain",
    ],
  },
];

const warningValues = [
  "Temperature > 38°C",
  "Temperature < 35°C",
  "Pulse < 50 bpm",
  "Pulse > 120 bpm",
  "Irregular rhythm",
  "Respiration < 10/min",
  "Respiration > 24/min",
  "Respiratory distress",
  "Systolic BP < 90 mmHg",
  "Systolic BP > 180 mmHg",
  "SpO2 < 92%",
];

const initialForm: FormState = {
  studentName: "",
  studentId: "",
  classGroup: "",
  measuredDate: getTodayDateInputValue(),
  measuredTime: "",
  patientType: "adult_simulated",
  temperature: "",
  temperatureRoute: "oral",
  pulseRate: "",
  pulseSite: "radial",
  pulseRhythm: "regular",
  respirationRate: "",
  respirationQuality: "regular_unlabored",
  systolicBp: "",
  diastolicBp: "",
  armUsed: "left",
  position: "sitting",
  spo2: "",
  oxygenMode: "room_air",
  painScore: "",
  notes: "",
  studentReflection: "",
  checklistCompleted: "no",
};

const labels: Record<string, string> = {
  adult_simulated: "Adult simulated patient / 成人模擬病人",
  real_clinical: "Real clinical patient / 真實臨床病人",
  oral: "Oral / 口腔",
  axillary: "Axillary / 腋下",
  tympanic: "Tympanic / 耳溫",
  radial: "Radial / 橈動脈",
  apical: "Apical / 心尖",
  carotid: "Carotid / 頸動脈",
  brachial: "Brachial / 肱動脈",
  regular: "Regular / 規則",
  irregular: "Irregular / 不規則",
  regular_unlabored: "Regular, unlabored / 規則、無費力",
  labored: "Labored / 費力",
  shallow: "Shallow / 淺",
  deep: "Deep / 深",
  left: "Left / 左",
  right: "Right / 右",
  sitting: "Sitting / 坐位",
  standing: "Standing / 站立",
  lying: "Lying / 平臥",
  room_air: "Room air / 室內空氣",
  oxygen_therapy: "Oxygen therapy / 氧氣治療",
  yes: "Yes / 是",
  no: "No / 否",
};

export default function HomePage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "saving" | "success">("idle");
  const [message, setMessage] = useState("");

  const warnings = useMemo(() => getFormWarnings(form), [form]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("saving");
    setErrors({});
    setMessage("");

    const response = await fetch("/api/records", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        temperature: Number(form.temperature),
        pulseRate: Number(form.pulseRate),
        respirationRate: Number(form.respirationRate),
        systolicBp: Number(form.systolicBp),
        diastolicBp: Number(form.diastolicBp),
        spo2: Number(form.spo2),
        painScore: Number(form.painScore),
      }),
    });

    if (!response.ok) {
      const body = (await response.json().catch(() => null)) as ApiError | null;
      setErrors(body?.details ?? {});
      setMessage(body?.error ?? "Submission failed / 提交失敗");
      setStatus("idle");
      return;
    }

    setStatus("success");
    setMessage("Vital signs practice record submitted. / 生命體徵練習記錄已提交。");
    setForm({ ...initialForm, measuredDate: getTodayDateInputValue() });
    setChecks({});
  }

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function updateCheck(item: string, checked: boolean) {
    setChecks((current) => ({ ...current, [item]: checked }));
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <header className="border-b border-blue-100 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-lg bg-blue-600 text-white">
              <Activity className="size-7" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-semibold text-emerald-700">
                Adult Patient - Nursing / Clinical Practice
              </p>
              <h1 className="text-2xl font-bold tracking-tight">
                Vital Signs Procedures & Checklists
              </h1>
            </div>
          </div>
          <Link
            href="/admin"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-blue-200 px-4 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
          >
            <Shield className="size-4" aria-hidden="true" />
            Teacher/Admin
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-6 lg:py-8">
        <div className="rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm font-medium leading-6 text-blue-950">
          This platform is for nursing education and practice documentation only. It
          is not intended for medical diagnosis or treatment.
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-8">
        <div className="mb-4 flex flex-wrap gap-2">
          {["Temperature (T)", "Pulse / Heart Rate (P)", "Respiration Rate (R)", "Blood Pressure (BP)", "Oxygen Saturation (SpO2)", "Pain Score"].map((item) => (
            <span
              key={item}
              className="rounded-md border border-emerald-200 bg-white px-3 py-2 text-sm font-semibold text-emerald-800"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {learningCards.map((card) => {
            const Icon = card.icon;
            return (
              <article
                key={card.title}
                className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
              >
                <Icon className="mb-3 size-7 text-blue-600" aria-hidden="true" />
                <h2 className="text-lg font-bold">{card.title}</h2>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
                  {card.points.map((point) => (
                    <li key={point} className="flex gap-2">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-emerald-500" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-4 pb-8 lg:grid-cols-2">
        <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Complete Vital Signs Checklist</h2>
          <div className="mt-4 grid gap-5 sm:grid-cols-3">
            {checklistSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-sm font-bold text-blue-700">{section.title}</h3>
                <div className="mt-3 space-y-3">
                  {section.items.map((item) => (
                    <label key={item} className="flex items-start gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={Boolean(checks[item])}
                        onChange={(event) => updateCheck(item, event.target.checked)}
                        className="mt-1 size-4 rounded border-slate-300 accent-blue-600"
                      />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-lg border border-red-100 bg-white p-5 shadow-sm">
          <h2 className="flex items-center gap-2 text-xl font-bold">
            <AlertTriangle className="size-6 text-red-600" aria-hidden="true" />
            Abnormal Vital Signs Reporting Guide
          </h2>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {warningValues.map((value) => (
              <span
                key={value}
                className="rounded-md border border-red-100 bg-red-50 px-3 py-2 text-sm font-semibold text-red-800"
              >
                {value}
              </span>
            ))}
          </div>
        </article>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-4 pb-8 lg:grid-cols-3">
        <InfoPanel
          title="Sample Documentation Format"
          items={[
            "Temperature: 37.2°C",
            "Pulse: 76 bpm",
            "Respiration: 16/min",
            "Blood Pressure: 120/78 mmHg",
            "SpO2: 99% RA",
            "Pain: 2/10",
          ]}
        />
        <InfoPanel
          title="Infection Control Reminders"
          items={[
            "Hand hygiene before and after contact",
            "Disinfect reusable equipment",
            "Use PPE if required",
            "Follow standard precautions",
          ]}
        />
        <InfoPanel
          title="WHO-style Key Safety Principles"
          items={[
            "Accurate patient identification",
            "Hand hygiene",
            "Proper equipment use",
            "Timely reporting of deterioration",
            "Correct documentation",
            "Patient-centered communication",
          ]}
        />
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12">
        <form
          onSubmit={handleSubmit}
          className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-6"
        >
          <div className="mb-5">
            <p className="text-sm font-semibold text-emerald-700">
              Student Submission Form / 學生提交表格
            </p>
            <h2 className="text-2xl font-bold">Full Vital Signs Practice Record</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <Field label="Student name / 學生姓名" error={errors.studentName}>
              <input
                required
                value={form.studentName}
                onChange={(event) => updateField("studentName", event.target.value)}
                className="field-input"
                autoComplete="name"
              />
            </Field>
            <Field label="Student ID / 學號" error={errors.studentId}>
              <input
                required
                value={form.studentId}
                onChange={(event) => updateField("studentId", event.target.value)}
                className="field-input"
              />
            </Field>
            <Field label="Class / group 班別 / 小組" error={errors.classGroup}>
              <input
                required
                value={form.classGroup}
                onChange={(event) => updateField("classGroup", event.target.value)}
                className="field-input"
                placeholder="Nursing 1A"
              />
            </Field>
            <Field label="Date / 日期" error={errors.measuredDate}>
              <input
                required
                type="date"
                value={form.measuredDate}
                onChange={(event) => updateField("measuredDate", event.target.value)}
                className="field-input"
              />
            </Field>
            <Field label="Time / 時間" error={errors.measuredTime}>
              <input
                required
                type="time"
                value={form.measuredTime}
                onChange={(event) => updateField("measuredTime", event.target.value)}
                className="field-input"
              />
            </Field>
            <SelectField
              label="Patient type / 病人類型"
              value={form.patientType}
              options={patientTypes}
              onChange={(value) => updateField("patientType", value)}
              error={errors.patientType}
            />
            <Field label="Temperature °C / 體溫" error={errors.temperature}>
              <input
                required
                type="number"
                step="0.1"
                inputMode="decimal"
                value={form.temperature}
                onChange={(event) => updateField("temperature", event.target.value)}
                className={inputTone(warnings, "Temperature")}
              />
            </Field>
            <SelectField
              label="Temperature route / 體溫途徑"
              value={form.temperatureRoute}
              options={temperatureRoutes}
              onChange={(value) => updateField("temperatureRoute", value)}
              error={errors.temperatureRoute}
            />
            <Field label="Pulse rate bpm / 脈搏" error={errors.pulseRate}>
              <input
                required
                type="number"
                inputMode="numeric"
                value={form.pulseRate}
                onChange={(event) => updateField("pulseRate", event.target.value)}
                className={inputTone(warnings, "Pulse")}
              />
            </Field>
            <SelectField
              label="Pulse site / 脈搏位置"
              value={form.pulseSite}
              options={pulseSites}
              onChange={(value) => updateField("pulseSite", value)}
              error={errors.pulseSite}
            />
            <SelectField
              label="Pulse rhythm / 脈搏節律"
              value={form.pulseRhythm}
              options={pulseRhythms}
              onChange={(value) => updateField("pulseRhythm", value)}
              error={errors.pulseRhythm}
            />
            <Field label="Respiration rate / 呼吸次數" error={errors.respirationRate}>
              <input
                required
                type="number"
                inputMode="numeric"
                value={form.respirationRate}
                onChange={(event) => updateField("respirationRate", event.target.value)}
                className={inputTone(warnings, "Respiration")}
              />
            </Field>
            <SelectField
              label="Respiration quality / 呼吸狀況"
              value={form.respirationQuality}
              options={respirationQualities}
              onChange={(value) => updateField("respirationQuality", value)}
              error={errors.respirationQuality}
            />
            <Field label="Systolic BP / 收縮壓" error={errors.systolicBp}>
              <input
                required
                type="number"
                inputMode="numeric"
                value={form.systolicBp}
                onChange={(event) => updateField("systolicBp", event.target.value)}
                className={inputTone(warnings, "Systolic")}
              />
            </Field>
            <Field label="Diastolic BP / 舒張壓" error={errors.diastolicBp}>
              <input
                required
                type="number"
                inputMode="numeric"
                value={form.diastolicBp}
                onChange={(event) => updateField("diastolicBp", event.target.value)}
                className="field-input"
              />
            </Field>
            <SelectField
              label="Arm used / 手臂"
              value={form.armUsed}
              options={armOptions}
              onChange={(value) => updateField("armUsed", value)}
              error={errors.armUsed}
            />
            <SelectField
              label="Position / 姿勢"
              value={form.position}
              options={measurementPositions}
              onChange={(value) => updateField("position", value)}
              error={errors.position}
            />
            <Field label="SpO2 % / 血氧" error={errors.spo2}>
              <input
                required
                type="number"
                inputMode="numeric"
                value={form.spo2}
                onChange={(event) => updateField("spo2", event.target.value)}
                className={inputTone(warnings, "SpO2")}
              />
            </Field>
            <SelectField
              label="Room air or oxygen / 空氣或氧氣"
              value={form.oxygenMode}
              options={oxygenModes}
              onChange={(value) => updateField("oxygenMode", value)}
              error={errors.oxygenMode}
            />
            <Field label="Pain score 0-10 / 疼痛分數" error={errors.painScore}>
              <input
                required
                type="number"
                min="0"
                max="10"
                inputMode="numeric"
                value={form.painScore}
                onChange={(event) => updateField("painScore", event.target.value)}
                className="field-input"
              />
            </Field>
            <SelectField
              label="Checklist completed / 清單完成"
              value={form.checklistCompleted}
              options={yesNoOptions}
              onChange={(value) => updateField("checklistCompleted", value)}
              error={errors.checklistCompleted}
            />
            <Field label="Notes / symptoms 備註 / 症狀" className="md:col-span-2">
              <textarea
                value={form.notes}
                onChange={(event) => updateField("notes", event.target.value)}
                className="field-input min-h-28 resize-y"
              />
            </Field>
            <Field
              label="Student reflection / 學生反思"
              error={errors.studentReflection}
              className="md:col-span-2 xl:col-span-3"
            >
              <textarea
                required
                value={form.studentReflection}
                onChange={(event) =>
                  updateField("studentReflection", event.target.value)
                }
                className="field-input min-h-28 resize-y"
              />
            </Field>
          </div>

          {warnings.length > 0 ? (
            <div className="mt-5 rounded-md border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
              <p className="font-bold">Warning before submission / 提交前提示</p>
              <p className="mt-1">
                Abnormal values are highlighted. Submission is still allowed for
                teaching documentation.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {warnings.map((warning) => (
                  <span key={warning} className="rounded-md bg-white px-2 py-1 font-semibold">
                    {warning}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          {message ? (
            <div
              className={`mt-5 flex items-start gap-3 rounded-md border p-4 text-sm font-medium ${
                status === "success"
                  ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                  : "border-red-200 bg-red-50 text-red-700"
              }`}
            >
              {status === "success" ? (
                <CheckCircle2 className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
              ) : null}
              <span>{message}</span>
            </div>
          ) : null}

          <button
            type="submit"
            disabled={status === "saving"}
            className="mt-6 w-full rounded-md bg-blue-600 px-5 py-4 text-base font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {status === "saving" ? "Submitting... / 提交中..." : "Submit vital signs record / 提交生命體徵記錄"}
          </button>
        </form>
      </section>
    </main>
  );
}

function InfoPanel({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-bold">{title}</h2>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-blue-500" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function SelectField<T extends readonly string[]>({
  label,
  value,
  options,
  onChange,
  error,
}: {
  label: string;
  value: string;
  options: T;
  onChange: (value: string) => void;
  error?: string;
}) {
  return (
    <Field label={label} error={error}>
      <select
        required
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="field-input"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {labels[option] ?? option}
          </option>
        ))}
      </select>
    </Field>
  );
}

function Field({
  label,
  error,
  children,
  className = "",
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-sm font-semibold text-slate-800">{label}</span>
      {children}
      {error ? <span className="mt-2 block text-sm text-red-600">{error}</span> : null}
    </label>
  );
}

function getFormWarnings(form: FormState) {
  const values = {
    temperature: Number(form.temperature),
    pulseRate: Number(form.pulseRate),
    pulseRhythm: form.pulseRhythm,
    respirationRate: Number(form.respirationRate),
    respirationQuality: form.respirationQuality,
    systolicBp: Number(form.systolicBp),
    spo2: Number(form.spo2),
  };

  if (
    !Number.isFinite(values.temperature) ||
    !Number.isFinite(values.pulseRate) ||
    !Number.isFinite(values.respirationRate) ||
    !Number.isFinite(values.systolicBp) ||
    !Number.isFinite(values.spo2)
  ) {
    return [];
  }

  return abnormalMessages({
    ...values,
    pulseRhythm: values.pulseRhythm as "regular" | "irregular",
    respirationQuality: values.respirationQuality as
      | "regular_unlabored"
      | "irregular"
      | "labored"
      | "shallow"
      | "deep",
  });
}

function inputTone(warnings: string[], keyword: string) {
  const abnormal = warnings.some((warning) => warning.includes(keyword));
  return abnormal ? "field-input border-amber-400 bg-amber-50" : "field-input";
}

function getTodayDateInputValue() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
