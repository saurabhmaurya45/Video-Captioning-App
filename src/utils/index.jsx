import { toast,Bounce } from "react-toastify";

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

export function showError(message) {
  toast.error(message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce
  })
}
export function showSuccess(message) {
  toast.success(message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce
  })
}

export function validateInputs( captionText, timestampStart, timestampEnd) {
  const errors = {};

  // Validate Caption Text
  if (!captionText.trim()) {
    errors.captionText = 'Caption text cannot be empty.';
  }

  // Validate Timestamps
  if (!isValidTimestamp(timestampStart)) {
    errors.timestampStart = 'Invalid start time. Please enter a valid timestamp.';
  }
  if (!isValidTimestamp(timestampEnd)) {
    errors.timestampEnd = 'Invalid end time. Please enter a valid timestamp.';
  }
  if (convertTimeToSeconds(timestampStart) >= convertTimeToSeconds(timestampEnd)) {
    errors.timestampEnd = 'End time must be greater than start time.';
  }

  return errors;
}


function isValidTimestamp(timestamp) {
  const timestampPattern = /^(\d{1,2}:)?\d{1,2}:\d{2}$/;
  return timestampPattern.test(timestamp);
}
