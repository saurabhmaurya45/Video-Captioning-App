
export const convertTimeToSeconds = (timeString) => {
  const timeParts = timeString.split(':').map(Number);

  let seconds = 0;
  if (timeParts.length === 1) {
    // Format: SS
    seconds = timeParts[0];
  } else if (timeParts.length === 2) {
    // Format: MM:SS
    seconds = timeParts[0] * 60 + timeParts[1];
  } else if (timeParts.length === 3) {
    // Format: HH:MM:SS
    seconds = timeParts[0] * 3600 + timeParts[1] * 60 + timeParts[2];
  }

  return seconds;
};

export const convertSecondsToTime = (seconds) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return `${hrs > 0 ? hrs + ':' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
};