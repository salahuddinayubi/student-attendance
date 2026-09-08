import { useMemo, useState } from "react";

const students = [
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
  const [attendance, setAttendance] = useState<Attendance>({});

  const counts = useMemo(() => {
    const statuses = Object.values(attendance);
    return {
      present: statuses.filter((status) => status === "present").length,
      absent: statuses.filter((status) => status === "absent").length,
    };
  }, [attendance]);

  const setStatus = (student: string, status: AttendanceStatus) => {
    setAttendance((current) => ({ ...current, [student]: status }));
  };

  return (
    <main className="min-h-screen bg-[#f7f8fa] px-4 py-10 text-[#1d2733] sm:px-6 lg:py-16">
      <div className="mx-auto w-full max-w-3xl">
        <header className="mb-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#7a8794]">
            Classroom overview
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-[#17212b] sm:text-4xl">
            Student attendance
          </h1>
          <p className="mt-2 text-sm text-[#6d7884]">
            Mark each student as present or absent.
          </p>
        </header>

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

              return (
                <div
                  className={`grid grid-cols-[1fr_auto] items-center gap-3 px-4 py-3.5 transition-colors sm:px-6 ${
                    index < students.length - 1 ? "border-b border-[#f0f2f4]" : ""
                  }`}
                  key={student}
                >
                  <span
                    className={`min-w-0 truncate text-sm font-medium transition-colors ${
                      isPresent ? "text-[#18815a]" : isAbsent ? "text-[#c94848]" : "text-[#303c48]"
                    }`}
                  >
                    {student}
                  </span>

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
