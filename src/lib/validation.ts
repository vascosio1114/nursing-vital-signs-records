import {
  AbnormalFlags,
  ArmOption,
  armOptions,
  MeasurementPosition,
  measurementPositions,
  OxygenMode,
  oxygenModes,
  PatientType,
  patientTypes,
  PulseRhythm,
  pulseRhythms,
  PulseSite,
  pulseSites,
  RespirationQuality,
  respirationQualities,
  TemperatureRoute,
  temperatureRoutes,
  VitalSignsRecordInput,
  YesNo,
  yesNoOptions,
} from "./types";

const requiredTextFields = [
  "studentName",
  "studentId",
  "classGroup",
  "measuredDate",
  "measuredTime",
  "studentReflection",
] as const;

const numericFields = [
  "temperature",
  "pulseRate",
  "respirationRate",
  "systolicBp",
  "diastolicBp",
  "spo2",
  "painScore",
] as const;

type NumericField = (typeof numericFields)[number];

export function getAbnormalFlags(
  record: Pick<
    VitalSignsRecordInput,
    | "temperature"
    | "pulseRate"
    | "pulseRhythm"
    | "respirationRate"
    | "respirationQuality"
    | "systolicBp"
    | "spo2"
  >,
): AbnormalFlags {
  return {
    temperatureHigh: record.temperature > 38,
    temperatureLow: record.temperature < 35,
    pulseLow: record.pulseRate < 50,
    pulseHigh: record.pulseRate > 120,
    irregularPulse: record.pulseRhythm === "irregular",
    respirationLow: record.respirationRate < 10,
    respirationHigh: record.respirationRate > 24,
    respiratoryDistress: record.respirationQuality === "labored",
    systolicLow: record.systolicBp < 90,
    systolicHigh: record.systolicBp > 180,
    spo2Low: record.spo2 < 92,
  };
}

export function isAbnormalRecord(record: Parameters<typeof getAbnormalFlags>[0]) {
  return Object.values(getAbnormalFlags(record)).some(Boolean);
}

export function abnormalMessages(record: Parameters<typeof getAbnormalFlags>[0]) {
  const flags = getAbnormalFlags(record);
  const messages: string[] = [];

  if (flags.temperatureHigh) messages.push("Temperature > 38°C");
  if (flags.temperatureLow) messages.push("Temperature < 35°C");
  if (flags.pulseLow) messages.push("Pulse < 50 bpm");
  if (flags.pulseHigh) messages.push("Pulse > 120 bpm");
  if (flags.irregularPulse) messages.push("Irregular rhythm");
  if (flags.respirationLow) messages.push("Respiration < 10/min");
  if (flags.respirationHigh) messages.push("Respiration > 24/min");
  if (flags.respiratoryDistress) messages.push("Respiratory distress");
  if (flags.systolicLow) messages.push("Systolic BP < 90 mmHg");
  if (flags.systolicHigh) messages.push("Systolic BP > 180 mmHg");
  if (flags.spo2Low) messages.push("SpO2 < 92%");

  return messages;
}

export function normalizeRecordPayload(payload: unknown): {
  data?: VitalSignsRecordInput;
  errors?: Record<string, string>;
} {
  if (!payload || typeof payload !== "object") {
    return { errors: { form: "Invalid form data / 表格資料無效" } };
  }

  const values = payload as Record<string, unknown>;
  const errors: Record<string, string> = {};

  for (const field of requiredTextFields) {
    if (typeof values[field] !== "string" || values[field].trim() === "") {
      errors[field] = "Required / 必填";
    }
  }

  const numbers = Object.fromEntries(
    numericFields.map((field) => [field, Number(values[field])]),
  ) as Record<NumericField, number>;

  for (const field of numericFields) {
    validateNumber(field, numbers[field], errors);
  }

  if (Number.isFinite(numbers.painScore)) {
    if (numbers.painScore < 0 || numbers.painScore > 10) {
      errors.painScore = "Pain score must be 0-10 / 疼痛分數必須為 0-10";
    }
  }

  validateOption("patientType", values.patientType, patientTypes, errors);
  validateOption("temperatureRoute", values.temperatureRoute, temperatureRoutes, errors);
  validateOption("pulseSite", values.pulseSite, pulseSites, errors);
  validateOption("pulseRhythm", values.pulseRhythm, pulseRhythms, errors);
  validateOption(
    "respirationQuality",
    values.respirationQuality,
    respirationQualities,
    errors,
  );
  validateOption("armUsed", values.armUsed, armOptions, errors);
  validateOption("position", values.position, measurementPositions, errors);
  validateOption("oxygenMode", values.oxygenMode, oxygenModes, errors);
  validateOption("checklistCompleted", values.checklistCompleted, yesNoOptions, errors);

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  return {
    data: {
      studentName: String(values.studentName).trim(),
      studentId: String(values.studentId).trim(),
      classGroup: String(values.classGroup).trim(),
      measuredDate: String(values.measuredDate),
      measuredTime: String(values.measuredTime),
      patientType: values.patientType as PatientType,
      temperature: numbers.temperature,
      temperatureRoute: values.temperatureRoute as TemperatureRoute,
      pulseRate: numbers.pulseRate,
      pulseSite: values.pulseSite as PulseSite,
      pulseRhythm: values.pulseRhythm as PulseRhythm,
      respirationRate: numbers.respirationRate,
      respirationQuality: values.respirationQuality as RespirationQuality,
      systolicBp: numbers.systolicBp,
      diastolicBp: numbers.diastolicBp,
      armUsed: values.armUsed as ArmOption,
      position: values.position as MeasurementPosition,
      spo2: numbers.spo2,
      oxygenMode: values.oxygenMode as OxygenMode,
      painScore: numbers.painScore,
      notes: typeof values.notes === "string" ? values.notes.trim() : "",
      studentReflection: String(values.studentReflection).trim(),
      checklistCompleted: values.checklistCompleted as YesNo,
    },
  };
}

function validateNumber(
  field: NumericField,
  value: number,
  errors: Record<string, string>,
) {
  if (!Number.isFinite(value)) {
    errors[field] = "Must be a number / 必須是數字";
    return;
  }

  if (field !== "painScore" && value <= 0) {
    errors[field] = "Must be greater than 0 / 必須大於 0";
  }
}

function validateOption<T extends readonly string[]>(
  field: string,
  value: unknown,
  allowed: T,
  errors: Record<string, string>,
) {
  if (typeof value !== "string" || !allowed.includes(value)) {
    errors[field] = "Choose a valid option / 請選擇正確選項";
  }
}
