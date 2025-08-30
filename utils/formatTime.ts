    export function formatTime(sec){
        let hour = Math.floor(sec/3600);
        let minute = Math.floor((sec%3600)/60);
        let second = sec%60;
        const paddedHours = String(hour).padStart(2,'0')
        const paddedMinutes = String(minute).padStart(2,'0')
        const paddedSeconds = String(second).padStart(2,'0')
  return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
    }
  // utils/formatDisplayDate.ts

// This function formats a date to show the time in 12-hour AM/PM format (e.g., "2:30 PM")
export function formatTime12Hour(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date);
}

// This function formats a date to show the day and date (e.g., "Sat, Aug 30")
export function formatDateWithDay(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).format(date);
}