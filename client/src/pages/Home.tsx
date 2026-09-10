import { useMemo, useState } from "react";

const initialStudents = [
  "Safwan",
  "Abid",
  "Mayur",
  "Amin",
  "Adham",
  "Abhijeet",
  "Rehan",
  "Farhaan",
  "Abdul-Hadi",
  "Ayman",
  "Bilal",
  "Faris",
  "Hamza",
  "Idris",
  "Junaid",
  "Khalid",
  "Luqman",
  "Mahir",
  "Nasir",
  "Qasim",
] as const;

type AttendanceStatus = "present" | "absent";
type Attendance = Record<string, AttendanceStatus | undefined>;

export default function Home() {
  const [students, setStudents] = useState<string[]>([...initialStudents]);
  const [attendance, setAttendance] = useState<Attendance>({});
  const [reportOpen, setReportOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [addStudentOpen, setAddStudentOpen] = useState(false);
  const [newStudentName, setNewStudentName] = useState("");
  const [addStudentError, setAddStudentError] = useState("");

  const counts = useMemo(() => {
    const statuses = Object.values(attendance);
    const present = statuses.filter((status) => status === "present").length;
    const absent = statuses.filter((status) => status === "absent").length;

    return {
      present,
      absent,
      unmarked: students.length - present - absent,
      markedPercentage: Math.round(((present + absent) / students.length) * 100),
      presentPercentage: Math.round((present / students.length) * 100),
      absentPercentage: Math.round((absent / students.length) * 100),
    };
  }, [attendance]);

  const setStatus = (student: string, status: AttendanceStatus) => {
    setAttendance((current) => ({ ...current, [student]: status }));
  };

  const resetAttendance = () => {
    setAttendance({});
    setSelectedStudent(null);
    setReportOpen(false);
  };

  const addStudent = () => {
    const name = newStudentName.trim();
    if (!name) {
      setAddStudentError("Enter a student name.");
      return;
    }
    if (students.some((student) => student.toLowerCase() === name.toLowerCase())) {
      setAddStudentError("That student is already on the list.");
      return;
    }

    setStudents((current) => [...current, name]);
    setNewStudentName("");
    setAddStudentError("");
    setAddStudentOpen(false);
  };

  const selectedStatus = selectedStudent ? attendance[selectedStudent] : undefined;
  const reportDescription =
    counts.markedPercentage === 0
      ? "No attendance has been recorded yet today. Use the buttons below to start marking the class."
      : `Today, ${counts.present} ${counts.present === 1 ? "student is" : "students are"} present and ${counts.absent} ${counts.absent === 1 ? "student is" : "students are"} absent. ${counts.unmarked} ${counts.unmarked === 1 ? "student remains" : "students remain"} unmarked.`;

  return (
    <main className="min-h-screen bg-[#f7f8fa] px-4 py-10 text-[#1d2733] sm:px-6 lg:py-16">
      <div className="mx-auto w-full max-w-3xl">
        <header className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#7a8794]">
              Classroom overview
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-[#17212b] sm:text-4xl">
              Student attendance
            </h1>
            <p className="mt-2 text-sm text-[#6d7884]">
              Mark each student as present or absent.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              aria-expanded={addStudentOpen}
              className={`rounded-lg border px-3.5 py-2 text-xs font-semibold transition-all duration-150 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#18815a]/30 ${
                addStudentOpen
                  ? "border-[#18815a] bg-[#18815a] text-white"
                  : "border-[#18815a] bg-white text-[#18815a] hover:bg-[#f5fbf8]"
              }`}
              onClick={() => {
                setAddStudentOpen((open) => !open);
                setAddStudentError("");
              }}
              type="button"
            >
              {addStudentOpen ? "Close" : "New student"}
            </button>
            <button
              className="rounded-lg border border-[#dce3e8] bg-white px-3.5 py-2 text-xs font-semibold text-[#66727e] transition-all duration-150 hover:border-[#aebbc5] hover:bg-[#f9fafb] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#66727e]/30"
              onClick={resetAttendance}
              type="button"
            >
              Reset
            </button>
            <button
              aria-expanded={reportOpen}
              className={`rounded-lg border px-3.5 py-2 text-xs font-semibold transition-all duration-150 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#526a9a]/30 ${
                reportOpen
                  ? "border-[#526a9a] bg-[#526a9a] text-white"
                  : "border-[#526a9a] bg-white text-[#526a9a] hover:bg-[#f4f6fb]"
              }`}
              onClick={() => setReportOpen((open) => !open)}
              type="button"
            >
              {reportOpen ? "Hide report" : "Today's report"}
            </button>
          </div>
        </header>

        {addStudentOpen && (
          <form
            aria-label="Add a new student"
            className="mb-6 flex flex-col gap-2 rounded-2xl border border-[#dfe9e3] bg-white p-4 shadow-[0_8px_24px_rgba(29,39,51,0.04)] sm:flex-row sm:items-start"
            onSubmit={(event) => {
              event.preventDefault();
              addStudent();
            }}
          >
            <div className="min-w-0 flex-1">
              <label className="sr-only" htmlFor="new-student-name">Student name</label>
              <input
                autoFocus
                className="w-full rounded-lg border border-[#dce3e8] bg-white px-3.5 py-2.5 text-sm text-[#303c48] outline-none placeholder:text-[#a0aab4] focus:border-[#18815a] focus:ring-2 focus:ring-[#18815a]/15"
                id="new-student-name"
                onChange={(event) => {
                  setNewStudentName(event.target.value);
                  setAddStudentError("");
                }}
                placeholder="Enter student name"
                type="text"
                value={newStudentName}
              />
              {addStudentError && <p className="mt-1.5 text-xs text-[#c94848]">{addStudentError}</p>}
            </div>
            <button
              className="rounded-lg bg-[#18815a] px-4 py-2.5 text-xs font-semibold text-white transition-all duration-150 hover:bg-[#126b4a] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#18815a]/40"
              type="submit"
            >
              Add student
            </button>
          </form>
        )}

        <section aria-label="Attendance summary" className="mb-6 grid grid-cols-3 gap-3 sm:gap-4">
          <div className="rounded-2xl border border-[#e5e9ed] bg-white px-4 py-4 shadow-[0_8px_24px_rgba(29,39,51,0.04)] sm:px-5">
            <p className="text-xs font-medium text-[#7a8794]">Total students</p>
            <p className="mt-1 text-2xl font-semibold tabular-nums text-[#17212b]">{students.length}</p>
          </div>
          <div className="rounded-2xl border border-[#e5e9ed] bg-white px-4 py-4 shadow-[0_8px_24px_rgba(29,39,51,0.04)] sm:px-5">
            <p className="text-xs font-medium text-[#7a8794]">Present</p>
            <p className="mt-1 text-2xl font-semibold tabular-nums text-[#18815a]">{counts.present}</p>
          </div>
          <div className="rounded-2xl border border-[#e5e9ed] bg-white px-4 py-4 shadow-[0_8px_24px_rgba(29,39,51,0.04)] sm:px-5">
            <p className="text-xs font-medium text-[#7a8794]">Absent</p>
            <p className="mt-1 text-2xl font-semibold tabular-nums text-[#c94848]">{counts.absent}</p>
          </div>
        </section>

        {reportOpen && (
          <section aria-label="Today's attendance report" className="mb-6 rounded-2xl border border-[#dfe5ee] bg-white p-5 shadow-[0_12px_32px_rgba(29,39,51,0.05)] sm:p-6">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              <div
                aria-label={`${counts.markedPercentage}% of attendance marked`}
                className="relative grid h-32 w-32 shrink-0 place-items-center rounded-full"
                role="img"
                style={{
                  background: `conic-gradient(#18815a 0 ${counts.presentPercentage}%, #c94848 ${counts.presentPercentage}% ${counts.presentPercentage + counts.absentPercentage}%, #e9edf1 ${counts.presentPercentage + counts.absentPercentage}% 100%)`,
                }}
              >
                <div className="grid h-24 w-24 place-items-center rounded-full bg-white text-center">
                  <span className="text-2xl font-semibold text-[#17212b]">{counts.markedPercentage}%</span>
                  <span className="-mt-1 text-[10px] font-medium uppercase tracking-wide text-[#7a8794]">marked</span>
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7a8794]">Today</p>
                    <h2 className="mt-1 text-xl font-semibold text-[#17212b]">Attendance report</h2>
                  </div>
                  <span className="rounded-full bg-[#f1f4f7] px-2.5 py-1 text-xs font-medium text-[#66727e]">{students.length} students</span>
                </div>
                <p className="text-sm leading-6 text-[#6d7884]">{reportDescription}</p>
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium">
                  <span className="text-[#18815a]">Present {counts.presentPercentage}%</span>
                  <span className="text-[#c94848]">Absent {counts.absentPercentage}%</span>
                  <span className="text-[#7a8794]">Unmarked {Math.round((counts.unmarked / students.length) * 100)}%</span>
                </div>
              </div>
            </div>
            {selectedStudent && (
              <div className="mt-5 rounded-xl border border-[#edf0f2] bg-[#fafbfc] px-4 py-3 text-sm">
                <span className="font-semibold text-[#303c48]">{selectedStudent}</span>
                <span className="ml-2 text-[#7a8794]">is currently </span>
                <span className={`font-semibold ${selectedStatus === "present" ? "text-[#18815a]" : selectedStatus === "absent" ? "text-[#c94848]" : "text-[#7a8794]"}`}>
                  {selectedStatus ?? "unmarked"}
                </span>
              </div>
            )}
          </section>
        )}

        <section aria-label="Student attendance list" className="overflow-hidden rounded-2xl border border-[#e5e9ed] bg-white shadow-[0_12px_32px_rgba(29,39,51,0.05)]">
          <div className="grid grid-cols-[1fr_auto] items-center border-b border-[#edf0f2] px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#8b96a1] sm:px-6">
            <span>Student</span>
            <span className="pr-1">Status</span>
          </div>

          <div>
            {students.map((student, index) => {
              const status = attendance[student];
              const isPresent = status === "present";
              const isAbsent = status === "absent";
              const isSelected = selectedStudent === student;

              return (
                <div
                  className={`grid grid-cols-[1fr_auto] items-center gap-3 px-4 py-3.5 transition-colors sm:px-6 ${
                    index < students.length - 1 ? "border-b border-[#f0f2f4]" : ""
                  } ${isSelected ? "bg-[#fafbfc]" : ""}`}
                  key={student}
                >
                  <button
                    aria-pressed={isSelected}
                    className={`min-w-0 truncate text-left text-sm font-medium underline-offset-4 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#526a9a]/30 ${
                      isPresent ? "text-[#18815a]" : isAbsent ? "text-[#c94848]" : "text-[#303c48]"
                    }`}
                    onClick={() => setSelectedStudent(student)}
                    type="button"
                  >
                    {student}
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      aria-pressed={isPresent}
                      className={`rounded-lg border px-3 py-2 text-xs font-semibold transition-all duration-150 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#18815a]/40 ${
                        isPresent
                          ? "border-[#18815a] bg-[#18815a] text-white shadow-sm"
                          : "border-[#dce3e8] bg-white text-[#66727e] hover:border-[#a9cbbd] hover:bg-[#f5fbf8] hover:text-[#18815a]"
                      }`}
                      onClick={() => setStatus(student, "present")}
                      type="button"
                    >
                      Present
                    </button>
                    <button
                      aria-pressed={isAbsent}
                      className={`rounded-lg border px-3 py-2 text-xs font-semibold transition-all duration-150 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c94848]/40 ${
                        isAbsent
                          ? "border-[#c94848] bg-[#c94848] text-white shadow-sm"
                          : "border-[#dce3e8] bg-white text-[#66727e] hover:border-[#e2b1b1] hover:bg-[#fff8f8] hover:text-[#c94848]"
                      }`}
                      onClick={() => setStatus(student, "absent")}
                      type="button"
                    >
                      Absent
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
