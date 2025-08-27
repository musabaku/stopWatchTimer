    export default function formatTime(sec){
        let hour = Math.floor(sec/3600);
        let minute = Math.floor((sec%3600)/60);
        let second = sec%60;
        const paddedHours = String(hour).padStart(2,'0')
        const paddedMinutes = String(minute).padStart(2,'0')
        const paddedSeconds = String(second).padStart(2,'0')
  return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
    }