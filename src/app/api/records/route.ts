import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase/server";
import { isAbnormalRecord, normalizeRecordPayload } from "@/lib/validation";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const { data, errors } = normalizeRecordPayload(payload);

  if (!data || errors) {
    return NextResponse.json(
      { error: "Please check the form / 請檢查表格", details: errors },
      { status: 400 },
    );
  }

  let supabase: ReturnType<typeof getSupabaseAdminClient>;

  try {
    supabase = getSupabaseAdminClient();
  } catch {
    return NextResponse.json(
      {
        error:
          "Supabase is not configured. Ask the teacher/admin to set up .env.local. / Supabase 尚未設定，請教師或管理員設定 .env.local。",
      },
      { status: 503 },
    );
  }

  const { error } = await supabase.from("vital_signs_records").insert({
    student_name: data.studentName,
    student_id: data.studentId,
    class_group: data.classGroup,
    measured_date: data.measuredDate,
    measured_time: data.measuredTime,
    patient_type: data.patientType,
    temperature: data.temperature,
    temperature_route: data.temperatureRoute,
    pulse_rate: data.pulseRate,
    pulse_site: data.pulseSite,
    pulse_rhythm: data.pulseRhythm,
    respiration_rate: data.respirationRate,
    respiration_quality: data.respirationQuality,
    systolic_bp: data.systolicBp,
    diastolic_bp: data.diastolicBp,
    arm_used: data.armUsed,
    position: data.position,
    spo2: data.spo2,
    oxygen_mode: data.oxygenMode,
    pain_score: data.painScore,
    notes: data.notes || null,
    student_reflection: data.studentReflection,
    checklist_completed: data.checklistCompleted,
    is_abnormal: isAbnormalRecord(data),
  });

  if (error) {
    return NextResponse.json(
      { error: "Could not save record / 無法儲存記錄" },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
