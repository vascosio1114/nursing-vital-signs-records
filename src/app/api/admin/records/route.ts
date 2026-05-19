import { NextResponse } from "next/server";
import { isAdminSessionValid } from "@/lib/admin-auth";
import { getSupabaseAdminClient } from "@/lib/supabase/server";
import { VitalSignsRecord } from "@/lib/types";

type DatabaseRecord = {
  id: string;
  student_name: string;
  student_id: string;
  class_group: string;
  measured_date: string;
  measured_time: string;
  patient_type: VitalSignsRecord["patientType"];
  temperature: number;
  temperature_route: VitalSignsRecord["temperatureRoute"];
  pulse_rate: number;
  pulse_site: VitalSignsRecord["pulseSite"];
  pulse_rhythm: VitalSignsRecord["pulseRhythm"];
  respiration_rate: number;
  respiration_quality: VitalSignsRecord["respirationQuality"];
  systolic_bp: number;
  diastolic_bp: number;
  arm_used: VitalSignsRecord["armUsed"];
  position: VitalSignsRecord["position"];
  spo2: number;
  oxygen_mode: VitalSignsRecord["oxygenMode"];
  pain_score: number;
  notes: string | null;
  student_reflection: string;
  checklist_completed: VitalSignsRecord["checklistCompleted"];
  created_at: string;
};

export async function GET() {
  if (!(await isAdminSessionValid())) {
    return NextResponse.json(
      { error: "Admin login required / 需要教師登入" },
      { status: 401 },
    );
  }

  let supabase: ReturnType<typeof getSupabaseAdminClient>;

  try {
    supabase = getSupabaseAdminClient();
  } catch {
    return NextResponse.json(
      {
        error:
          "Supabase is not configured. Add real NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY values in .env.local. / Supabase 尚未設定，請在 .env.local 加入真實 Supabase 連線資料。",
      },
      { status: 503 },
    );
  }

  const { data, error } = await supabase
    .from("vital_signs_records")
    .select("*")
    .order("measured_date", { ascending: false })
    .order("measured_time", { ascending: false })
    .limit(3000);

  if (error) {
    return NextResponse.json(
      {
        error:
          "Could not load records from Supabase. Check your database schema and service role key. / 無法從 Supabase 讀取記錄，請檢查資料表 SQL 及 service role key。",
      },
      { status: 500 },
    );
  }

  const records: VitalSignsRecord[] = ((data ?? []) as DatabaseRecord[]).map(
    (record) => ({
      id: record.id,
      studentName: record.student_name,
      studentId: record.student_id,
      classGroup: record.class_group,
      measuredDate: record.measured_date,
      measuredTime: record.measured_time.slice(0, 5),
      patientType: record.patient_type,
      temperature: record.temperature,
      temperatureRoute: record.temperature_route,
      pulseRate: record.pulse_rate,
      pulseSite: record.pulse_site,
      pulseRhythm: record.pulse_rhythm,
      respirationRate: record.respiration_rate,
      respirationQuality: record.respiration_quality,
      systolicBp: record.systolic_bp,
      diastolicBp: record.diastolic_bp,
      armUsed: record.arm_used,
      position: record.position,
      spo2: record.spo2,
      oxygenMode: record.oxygen_mode,
      painScore: record.pain_score,
      notes: record.notes ?? "",
      studentReflection: record.student_reflection,
      checklistCompleted: record.checklist_completed,
      createdAt: record.created_at,
    }),
  );

  return NextResponse.json({ records });
}
