export const patientTypes = ["adult_simulated", "real_clinical"] as const;
export const temperatureRoutes = ["oral", "axillary", "tympanic"] as const;
export const pulseSites = ["radial", "apical", "carotid", "brachial"] as const;
export const pulseRhythms = ["regular", "irregular"] as const;
export const respirationQualities = [
  "regular_unlabored",
  "irregular",
  "labored",
  "shallow",
  "deep",
] as const;
export const armOptions = ["left", "right"] as const;
export const measurementPositions = ["sitting", "standing", "lying"] as const;
export const oxygenModes = ["room_air", "oxygen_therapy"] as const;
export const yesNoOptions = ["yes", "no"] as const;

export type PatientType = (typeof patientTypes)[number];
export type TemperatureRoute = (typeof temperatureRoutes)[number];
export type PulseSite = (typeof pulseSites)[number];
export type PulseRhythm = (typeof pulseRhythms)[number];
export type RespirationQuality = (typeof respirationQualities)[number];
export type ArmOption = (typeof armOptions)[number];
export type MeasurementPosition = (typeof measurementPositions)[number];
export type OxygenMode = (typeof oxygenModes)[number];
export type YesNo = (typeof yesNoOptions)[number];

export type VitalSignsRecordInput = {
  studentName: string;
  studentId: string;
  classGroup: string;
  measuredDate: string;
  measuredTime: string;
  patientType: PatientType;
  temperature: number;
  temperatureRoute: TemperatureRoute;
  pulseRate: number;
  pulseSite: PulseSite;
  pulseRhythm: PulseRhythm;
  respirationRate: number;
  respirationQuality: RespirationQuality;
  systolicBp: number;
  diastolicBp: number;
  armUsed: ArmOption;
  position: MeasurementPosition;
  spo2: number;
  oxygenMode: OxygenMode;
  painScore: number;
  notes: string;
  studentReflection: string;
  checklistCompleted: YesNo;
};

export type VitalSignsRecord = VitalSignsRecordInput & {
  id: string;
  createdAt: string;
};

export type AbnormalFlags = {
  temperatureHigh: boolean;
  temperatureLow: boolean;
  pulseLow: boolean;
  pulseHigh: boolean;
  irregularPulse: boolean;
  respirationLow: boolean;
  respirationHigh: boolean;
  respiratoryDistress: boolean;
  systolicLow: boolean;
  systolicHigh: boolean;
  spo2Low: boolean;
};

export type ApiError = {
  error: string;
  details?: Record<string, string>;
};
