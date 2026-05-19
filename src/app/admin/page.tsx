"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { Worksheet } from "exceljs";
import {
  Download,
  Eye,
  FileSpreadsheet,
  LockKeyhole,
  LogOut,
  Search,
  ShieldCheck,
  X,
} from "lucide-react";
import { VitalSignsRecord } from "@/lib/types";
import { abnormalMessages, isAbnormalRecord } from "@/lib/validation";

type LoadState = "checking" | "login" | "ready" | "error";

const labels: Record<string, string> = {
  adult_simulated: "Adult simulated patient",
  real_clinical: "Real clinical patient",
  oral: "Oral",
  axillary: "Axillary",
  tympanic: "Tympanic",
  radial: "Radial",
  apical: "Apical",
  carotid: "Carotid",
  brachial: "Brachial",
  regular: "Regular",
  irregular: "Irregular",
  regular_unlabored: "Regular, unlabored",
  labored: "Labored",
  shallow: "Shallow",
  deep: "Deep",
  left: "Left",
  right: "Right",
  sitting: "Sitting",
  standing: "Standing",
  lying: "Lying",
  room_air: "Room air",
  oxygen_therapy: "Oxygen therapy",
  yes: "Yes",
  no: "No",
};

const excelColumns = [
  { header: "Student Name", key: "studentName", width: 18 },
  { header: "Student ID", key: "studentId", width: 14 },
  { header: "Class / Group", key: "classGroup", width: 16 },
  { header: "Date", key: "measuredDate", width: 14 },
  { header: "Time", key: "measuredTime", width: 12 },
  { header: "Temperature", key: "temperature", width: 14 },
  { header: "Temperature Route", key: "temperatureRoute", width: 20 },
  { header: "Pulse Rate", key: "pulseRate", width: 14 },
  { header: "Pulse Site", key: "pulseSite", width: 14 },
  { header: "Pulse Rhythm", key: "pulseRhythm", width: 16 },
  { header: "Respiration Rate", key: "respirationRate", width: 18 },
  { header: "Respiration Quality", key: "respirationQuality", width: 24 },
  { header: "Systolic BP", key: "systolicBp", width: 14 },
  { header: "Diastolic BP", key: "diastolicBp", width: 14 },
  { header: "Arm Used", key: "armUsed", width: 12 },
  { header: "Position", key: "position", width: 12 },
  { header: "SpO2", key: "spo2", width: 10 },
  { header: "Room Air / Oxygen Therapy", key: "oxygenMode", width: 26 },
  { header: "Pain Score", key: "painScore", width: 12 },
  { header: "Notes / Symptoms", key: "notes", width: 28 },
  { header: "Student Reflection", key: "studentReflection", width: 32 },
  { header: "Checklist Completed", key: "checklistCompleted", width: 22 },
  { header: "Abnormal Flag", key: "abnormalFlag", width: 34 },
  { header: "Submitted At", key: "submittedAt", width: 22 },
];

export default function AdminPage() {
  const [records, setRecords] = useState<VitalSignsRecord[]>([]);
  const [state, setState] = useState<LoadState>("checking");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [abnormalFilter, setAbnormalFilter] = useState("all");
  const [selectedRecord, setSelectedRecord] = useState<VitalSignsRecord | null>(null);
  const [isGeneratingExcel, setIsGeneratingExcel] = useState(false);

  useEffect(() => {
    loadRecords();
  }, []);

  async function loadRecords() {
    const response = await fetch("/api/admin/records", { cache: "no-store" });

    if (response.status === 401) {
      setState("login");
      return;
    }

    if (!response.ok) {
      const body = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;
      setState("error");
      setMessage(body?.error ?? "Could not load records / 無法讀取記錄");
      return;
    }

    const body = (await response.json()) as { records: VitalSignsRecord[] };
    setRecords(body.records);
    setState("ready");
  }

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (!response.ok) {
      setMessage("Incorrect password / 密碼不正確");
      return;
    }

    setPassword("");
    await loadRecords();
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setRecords([]);
    setSelectedRecord(null);
    setState("login");
  }

  const classOptions = useMemo(
    () => Array.from(new Set(records.map((record) => record.classGroup))).sort(),
    [records],
  );

  const filteredRecords = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return records.filter((record) => {
      const abnormal = isAbnormalRecord(record);
      const matchesSearch =
        normalizedSearch === "" ||
        record.studentName.toLowerCase().includes(normalizedSearch) ||
        record.studentId.toLowerCase().includes(normalizedSearch);
      const matchesClass = !classFilter || record.classGroup === classFilter;
      const matchesDate = !dateFilter || record.measuredDate === dateFilter;
      const matchesAbnormal =
        abnormalFilter === "all" ||
        (abnormalFilter === "abnormal" && abnormal) ||
        (abnormalFilter === "normal" && !abnormal);

      return matchesSearch && matchesClass && matchesDate && matchesAbnormal;
    });
  }, [abnormalFilter, classFilter, dateFilter, records, search]);

  const summary = useMemo(() => {
    return {
      total: filteredRecords.length,
      abnormal: filteredRecords.filter(isAbnormalRecord).length,
      avgTemperature: average(filteredRecords.map((record) => record.temperature), 1),
      avgPulse: average(filteredRecords.map((record) => record.pulseRate)),
      avgRespiration: average(filteredRecords.map((record) => record.respirationRate)),
      avgSystolic: average(filteredRecords.map((record) => record.systolicBp)),
      avgDiastolic: average(filteredRecords.map((record) => record.diastolicBp)),
      avgSpo2: average(filteredRecords.map((record) => record.spo2)),
      avgPain: average(filteredRecords.map((record) => record.painScore), 1),
    };
  }, [filteredRecords]);

  function exportCsv() {
    const headers = [
      "Student name",
      "Student ID",
      "Class/group",
      "Date",
      "Time",
      "Patient type",
      "Temperature",
      "Temperature route",
      "Pulse rate",
      "Pulse site",
      "Pulse rhythm",
      "Respiration rate",
      "Respiration quality",
      "Systolic BP",
      "Diastolic BP",
      "Arm used",
      "Position",
      "SpO2",
      "Oxygen mode",
      "Pain score",
      "Notes",
      "Student reflection",
      "Checklist completed",
      "Abnormal findings",
    ];
    const rows = filteredRecords.map((record) => [
      record.studentName,
      record.studentId,
      record.classGroup,
      record.measuredDate,
      record.measuredTime,
      label(record.patientType),
      record.temperature,
      label(record.temperatureRoute),
      record.pulseRate,
      label(record.pulseSite),
      label(record.pulseRhythm),
      record.respirationRate,
      label(record.respirationQuality),
      record.systolicBp,
      record.diastolicBp,
      label(record.armUsed),
      label(record.position),
      record.spo2,
      label(record.oxygenMode),
      record.painScore,
      record.notes,
      record.studentReflection,
      label(record.checklistCompleted),
      abnormalMessages(record).join("; ") || "None",
    ]);
    const csv = [headers, ...rows]
      .map((row) => row.map(csvCell).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `vital-signs-records-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  async function generateExcelRecord(recordsToExport = filteredRecords) {
    setIsGeneratingExcel(true);

    try {
      const ExcelJS = await import("exceljs");
      const workbook = new ExcelJS.Workbook();
      workbook.creator = "Nursing Vital Signs Records";
      workbook.created = new Date();

      const recordsSheet = workbook.addWorksheet("Vital Signs Records");
      recordsSheet.columns = excelColumns.map((column) => ({
        header: column.header,
        key: column.key,
        width: column.width,
      }));

      recordsSheet.getRow(1).font = { bold: true, color: { argb: "FFFFFFFF" } };
      recordsSheet.getRow(1).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF2563EB" },
      };
      recordsSheet.getRow(1).alignment = { vertical: "middle", wrapText: true };

      recordsToExport.forEach((record) => {
        const warnings = abnormalMessages(record);
        const row = recordsSheet.addRow({
          studentName: record.studentName,
          studentId: record.studentId,
          classGroup: record.classGroup,
          measuredDate: record.measuredDate,
          measuredTime: record.measuredTime,
          temperature: record.temperature,
          temperatureRoute: label(record.temperatureRoute),
          pulseRate: record.pulseRate,
          pulseSite: label(record.pulseSite),
          pulseRhythm: label(record.pulseRhythm),
          respirationRate: record.respirationRate,
          respirationQuality: label(record.respirationQuality),
          systolicBp: record.systolicBp,
          diastolicBp: record.diastolicBp,
          armUsed: label(record.armUsed),
          position: label(record.position),
          spo2: record.spo2,
          oxygenMode: label(record.oxygenMode),
          painScore: record.painScore,
          notes: record.notes,
          studentReflection: record.studentReflection,
          checklistCompleted: label(record.checklistCompleted),
          abnormalFlag: warnings.length > 0 ? warnings.join("; ") : "No",
          submittedAt: formatSubmittedAt(record.createdAt),
        });

        row.alignment = { vertical: "top", wrapText: true };

        if (warnings.length > 0) {
          row.eachCell((cell) => {
            cell.fill = {
              type: "pattern",
              pattern: "solid",
              fgColor: { argb: "FFFFE4E6" },
            };
          });
        }
      });

      autosizeColumns(recordsSheet);
      recordsSheet.views = [{ state: "frozen", ySplit: 1 }];

      const summarySheet = workbook.addWorksheet("Summary");
      summarySheet.columns = [
        { header: "Metric", key: "metric", width: 32 },
        { header: "Value", key: "value", width: 18 },
      ];
      summarySheet.getRow(1).font = { bold: true, color: { argb: "FFFFFFFF" } };
      summarySheet.getRow(1).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF047857" },
      };

      const exportSummary = buildSummary(recordsToExport);
      [
        ["Total submissions", exportSummary.total],
        ["Number of abnormal records", exportSummary.abnormal],
        ["Average temperature", exportSummary.avgTemperature],
        ["Average pulse", exportSummary.avgPulse],
        ["Average respiration rate", exportSummary.avgRespiration],
        ["Average systolic BP", exportSummary.avgSystolic],
        ["Average diastolic BP", exportSummary.avgDiastolic],
        ["Average SpO2", exportSummary.avgSpo2],
        ["Average pain score", exportSummary.avgPain],
      ].forEach(([metric, value]) => {
        summarySheet.addRow({ metric, value });
      });

      autosizeColumns(summarySheet);

      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `vital-signs-records-${new Date().toISOString().slice(0, 10)}.xlsx`;
      link.click();
      URL.revokeObjectURL(url);
    } finally {
      setIsGeneratingExcel(false);
    }
  }

  if (state === "checking") {
    return <StatusScreen text="Checking admin access... / 正在檢查教師權限..." />;
  }

  if (state === "login") {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-950">
        <section className="mx-auto max-w-md rounded-lg border border-blue-100 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-lg bg-blue-600 text-white">
              <LockKeyhole className="size-6" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-semibold text-blue-700">
                Teacher/Admin / 教師管理
              </p>
              <h1 className="text-xl font-bold">Protected vital signs records</h1>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold">
                Admin password / 管理密碼
              </span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="field-input"
                required
              />
            </label>
            {message ? <p className="text-sm font-medium text-red-600">{message}</p> : null}
            <button className="w-full rounded-md bg-blue-600 px-5 py-4 font-bold text-white transition hover:bg-blue-700">
              Login / 登入
            </button>
          </form>

          <Link
            href="/"
            className="mt-5 inline-block text-sm font-semibold text-blue-700 hover:text-blue-900"
          >
            Back to learning page / 返回學習頁
          </Link>
        </section>
      </main>
    );
  }

  if (state === "error") {
    return (
      <StatusScreen
        text={message}
        actions={
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <button
              onClick={handleLogout}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700"
            >
              Logout / 登出
            </button>
            <Link
              href="/"
              className="rounded-md border border-blue-200 px-4 py-2 text-sm font-bold text-blue-700 hover:bg-blue-50"
            >
              Learning page / 學習頁
            </Link>
          </div>
        }
      />
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <header className="border-b border-blue-100 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-lg bg-blue-600 text-white">
              <ShieldCheck className="size-6" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-semibold text-blue-700">
                Teacher/Admin / 教師管理
              </p>
              <h1 className="text-xl font-bold">Vital signs dashboard / 生命體徵資料表</h1>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              href="/"
              className="rounded-md border border-blue-200 px-3 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50"
            >
              Learning page / 學習頁
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              <LogOut className="size-4" aria-hidden="true" />
              Logout / 登出
            </button>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl space-y-5 px-4 py-6">
        <p className="rounded-md border border-blue-100 bg-blue-50 p-4 text-sm text-blue-950">
          This platform is for nursing education and practice documentation only. It
          is not intended for medical diagnosis or treatment.
        </p>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <SummaryCard label="Total submissions" value={summary.total} />
          <SummaryCard label="Abnormal records" value={summary.abnormal} tone="red" />
          <SummaryCard label="Avg temp" value={summary.avgTemperature} suffix="°C" />
          <SummaryCard label="Avg pulse" value={summary.avgPulse} suffix=" bpm" />
          <SummaryCard label="Avg respiration" value={summary.avgRespiration} suffix="/min" />
          <SummaryCard label="Avg systolic BP" value={summary.avgSystolic} />
          <SummaryCard label="Avg diastolic BP" value={summary.avgDiastolic} />
          <SummaryCard label="Avg SpO2" value={summary.avgSpo2} suffix="%" />
          <SummaryCard label="Avg pain score" value={summary.avgPain} />
        </div>

        <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <div className="grid gap-3 lg:grid-cols-[1.4fr_1fr_1fr_1fr_auto]">
            <label className="relative block">
              <span className="mb-2 block text-sm font-semibold">
                Search name or ID / 搜尋姓名或學號
              </span>
              <Search className="pointer-events-none absolute bottom-3.5 left-3 size-5 text-slate-400" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="field-input pl-10"
                placeholder="e.g. Chan or S123"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold">Class/group</span>
              <select
                value={classFilter}
                onChange={(event) => setClassFilter(event.target.value)}
                className="field-input"
              >
                <option value="">All / 全部</option>
                {classOptions.map((classGroup) => (
                  <option key={classGroup} value={classGroup}>
                    {classGroup}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold">Date / 日期</span>
              <input
                type="date"
                value={dateFilter}
                onChange={(event) => setDateFilter(event.target.value)}
                className="field-input"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold">Abnormal readings</span>
              <select
                value={abnormalFilter}
                onChange={(event) => setAbnormalFilter(event.target.value)}
                className="field-input"
              >
                <option value="all">All / 全部</option>
                <option value="abnormal">Abnormal only / 只看異常</option>
                <option value="normal">Normal only / 只看正常</option>
              </select>
            </label>

            <button
              onClick={exportCsv}
              className="mt-auto inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-blue-200 px-4 font-bold text-blue-700 hover:bg-blue-50"
            >
              <Download className="size-5" aria-hidden="true" />
              Export CSV
            </button>
            <button
              onClick={() => generateExcelRecord()}
              disabled={isGeneratingExcel}
              className="mt-auto inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-blue-600 px-4 font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              <FileSpreadsheet className="size-5" aria-hidden="true" />
              {isGeneratingExcel ? "Generating..." : "Generate Excel Record"}
            </button>
          </div>
        </section>

        <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-[1200px] w-full border-collapse text-left text-sm">
              <thead className="bg-slate-100 text-slate-700">
                <tr>
                  <TableHead>Student</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Date/time</TableHead>
                  <TableHead>T</TableHead>
                  <TableHead>P</TableHead>
                  <TableHead>R</TableHead>
                  <TableHead>BP</TableHead>
                  <TableHead>SpO2</TableHead>
                  <TableHead>Pain</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Details</TableHead>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map((record) => {
                  const warnings = abnormalMessages(record);
                  const abnormal = warnings.length > 0;
                  return (
                    <tr
                      key={record.id}
                      className={
                        abnormal
                          ? "border-t border-red-100 bg-red-50"
                          : "border-t border-slate-100"
                      }
                    >
                      <TableCell>
                        <span className="font-semibold">{record.studentName}</span>
                        <span className="block text-xs text-slate-500">
                          {record.studentId}
                        </span>
                      </TableCell>
                      <TableCell>{record.classGroup}</TableCell>
                      <TableCell>
                        {record.measuredDate}
                        <span className="block text-xs text-slate-500">
                          {record.measuredTime}
                        </span>
                      </TableCell>
                      <TableCell>{record.temperature}°C</TableCell>
                      <TableCell>
                        {record.pulseRate}
                        <span className="block text-xs text-slate-500">
                          {label(record.pulseRhythm)}
                        </span>
                      </TableCell>
                      <TableCell>
                        {record.respirationRate}
                        <span className="block text-xs text-slate-500">
                          {label(record.respirationQuality)}
                        </span>
                      </TableCell>
                      <TableCell>
                        {record.systolicBp}/{record.diastolicBp}
                      </TableCell>
                      <TableCell>{record.spo2}%</TableCell>
                      <TableCell>{record.painScore}/10</TableCell>
                      <TableCell>
                        <span
                          className={`rounded-md px-2 py-1 text-xs font-bold ${
                            abnormal
                              ? "bg-red-100 text-red-800"
                              : "bg-emerald-100 text-emerald-800"
                          }`}
                        >
                          {abnormal ? "Abnormal" : "No warning"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <button
                          onClick={() => setSelectedRecord(record)}
                          className="inline-flex items-center gap-1 rounded-md border border-blue-200 px-2 py-1 font-semibold text-blue-700 hover:bg-blue-50"
                        >
                          <Eye className="size-4" aria-hidden="true" />
                          View
                        </button>
                      </TableCell>
                    </tr>
                  );
                })}
                {filteredRecords.length === 0 ? (
                  <tr>
                    <td colSpan={11} className="px-4 py-10 text-center text-slate-500">
                      No matching records / 沒有符合條件的記錄
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </section>
      </section>

      {selectedRecord ? (
        <RecordDialog
          record={selectedRecord}
          onClose={() => setSelectedRecord(null)}
          onGenerateExcel={() => generateExcelRecord([selectedRecord])}
          isGeneratingExcel={isGeneratingExcel}
        />
      ) : null}
    </main>
  );
}

function RecordDialog({
  record,
  onClose,
  onGenerateExcel,
  isGeneratingExcel,
}: {
  record: VitalSignsRecord;
  onClose: () => void;
  onGenerateExcel: () => void;
  isGeneratingExcel: boolean;
}) {
  const warnings = abnormalMessages(record);
  const rows = [
    ["Patient type", label(record.patientType)],
    ["Temperature", `${record.temperature}°C ${label(record.temperatureRoute)}`],
    ["Pulse", `${record.pulseRate} bpm, ${label(record.pulseSite)}, ${label(record.pulseRhythm)}`],
    ["Respiration", `${record.respirationRate}/min, ${label(record.respirationQuality)}`],
    ["Blood pressure", `${record.systolicBp}/${record.diastolicBp} mmHg, ${label(record.armUsed)} arm, ${label(record.position)}`],
    ["SpO2", `${record.spo2}% ${label(record.oxygenMode)}`],
    ["Pain", `${record.painScore}/10`],
    ["Checklist completed", label(record.checklistCompleted)],
    ["Notes / symptoms", record.notes || "-"],
    ["Student reflection", record.studentReflection],
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/50 px-4 py-6">
      <section className="mx-auto max-w-3xl rounded-lg bg-white p-5 shadow-xl">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-blue-700">
              {record.measuredDate} {record.measuredTime}
            </p>
            <h2 className="text-2xl font-bold">{record.studentName}</h2>
            <p className="text-sm text-slate-600">
              {record.studentId} · {record.classGroup}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-md border border-slate-200 p-2 text-slate-700 hover:bg-slate-100"
            aria-label="Close"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        <button
          onClick={onGenerateExcel}
          disabled={isGeneratingExcel}
          className="mb-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-blue-600 px-4 font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          <FileSpreadsheet className="size-5" aria-hidden="true" />
          {isGeneratingExcel ? "Generating..." : "Generate Excel Record"}
        </button>

        {warnings.length > 0 ? (
          <div className="mb-4 rounded-md border border-red-100 bg-red-50 p-3 text-sm text-red-800">
            <p className="font-bold">Abnormal findings</p>
            <p className="mt-1">{warnings.join(", ")}</p>
          </div>
        ) : null}

        <div className="grid gap-3 sm:grid-cols-2">
          {rows.map(([name, value]) => (
            <div key={name} className="rounded-md border border-slate-200 p-3">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                {name}
              </p>
              <p className="mt-1 text-sm font-medium text-slate-900">{value}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function SummaryCard({
  label: cardLabel,
  value,
  suffix = "",
  tone = "blue",
}: {
  label: string;
  value: number | string;
  suffix?: string;
  tone?: "blue" | "red";
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <p className={`text-sm font-semibold ${tone === "red" ? "text-red-700" : "text-blue-700"}`}>
        {cardLabel}
      </p>
      <p className="mt-2 text-3xl font-bold tracking-tight">
        {value}
        {value === "-" ? "" : suffix}
      </p>
    </div>
  );
}

function TableHead({ children }: { children: React.ReactNode }) {
  return <th className="px-4 py-3 font-bold">{children}</th>;
}

function TableCell({ children }: { children: React.ReactNode }) {
  return <td className="px-4 py-3 align-top">{children}</td>;
}

function StatusScreen({
  text,
  actions,
}: {
  text: string;
  actions?: React.ReactNode;
}) {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-50 px-4 text-slate-950">
      <div className="max-w-xl rounded-lg border border-blue-100 bg-white p-6 text-center shadow-sm">
        <p className="font-semibold text-blue-700">{text}</p>
        {actions}
      </div>
    </main>
  );
}

function buildSummary(records: VitalSignsRecord[]) {
  return {
    total: records.length,
    abnormal: records.filter(isAbnormalRecord).length,
    avgTemperature: average(records.map((record) => record.temperature), 1),
    avgPulse: average(records.map((record) => record.pulseRate)),
    avgRespiration: average(records.map((record) => record.respirationRate)),
    avgSystolic: average(records.map((record) => record.systolicBp)),
    avgDiastolic: average(records.map((record) => record.diastolicBp)),
    avgSpo2: average(records.map((record) => record.spo2)),
    avgPain: average(records.map((record) => record.painScore), 1),
  };
}

function autosizeColumns(sheet: Worksheet) {
  sheet.columns.forEach((column) => {
    let maxLength = 12;
    column.eachCell?.({ includeEmpty: true }, (cell) => {
      const value = cell.value;
      const text =
        value === null || value === undefined
          ? ""
          : typeof value === "object"
            ? JSON.stringify(value)
            : String(value);
      maxLength = Math.max(maxLength, text.length);
    });
    column.width = Math.min(Math.max(maxLength + 2, 12), 42);
  });
}

function formatSubmittedAt(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString();
}

function average(values: number[], precision = 0) {
  if (values.length === 0) {
    return "-";
  }

  const avg = values.reduce((sum, value) => sum + value, 0) / values.length;
  return Number(avg.toFixed(precision));
}

function label(value: string) {
  return labels[value] ?? value;
}

function csvCell(value: string | number) {
  const text = String(value).replaceAll('"', '""');
  return `"${text}"`;
}
