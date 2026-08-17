"use client";

type DateTimeClockProps = {
  hours: number;
  minutes: number;
  onChange: (hours: number, minutes: number) => void;
};

const HOURS = Array.from({ length: 12 }, (_, i) => i + 1);
const MINUTES = [0, 15, 30, 45];

export function DateTimeClock({ hours, minutes, onChange }: DateTimeClockProps) {
  const hour12 = hours % 12 || 12;
  const period = hours >= 12 ? "PM" : "AM";

  function update(nextHour12: number, nextMinutes: number, nextPeriod: string) {
    const hour24 =
      nextPeriod === "AM"
        ? nextHour12 === 12 ? 0 : nextHour12
        : nextHour12 === 12 ? 12 : nextHour12 + 12;
    onChange(hour24, nextMinutes);
  }

  return (
    <div className="flex items-center gap-2 border-t border-zinc-200 pt-3">
      <select
        className="h-10 cursor-pointer rounded-md border border-zinc-300 bg-white px-2 text-sm"
        value={hour12}
        onChange={(event) =>
          update(Number(event.target.value), minutes, period)
        }
        aria-label="Hours"
      >
        {HOURS.map((hour) => (
          <option key={hour} value={hour}>
            {String(hour).padStart(2, "0")}
          </option>
        ))}
      </select>
      <span className="text-zinc-500">:</span>
      <select
        className="h-10 cursor-pointer rounded-md border border-zinc-300 bg-white px-2 text-sm"
        value={minutes - (minutes % 15)}
        onChange={(event) =>
          update(hour12, Number(event.target.value), period)
        }
        aria-label="Minutes"
      >
        {MINUTES.map((minute) => (
          <option key={minute} value={minute}>
            {String(minute).padStart(2, "0")}
          </option>
        ))}
      </select>
      <select
        className="h-10 cursor-pointer rounded-md border border-zinc-300 bg-white px-2 text-sm"
        value={period}
        onChange={(event) => update(hour12, minutes, event.target.value)}
        aria-label="AM or PM"
      >
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>
    </div>
  );
}
