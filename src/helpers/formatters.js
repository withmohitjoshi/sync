export function formatDateTime(isoString) {
  const date = new Date(isoString);
  const now = new Date();

  const timeDifference = now - date;
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  if (daysDifference === 0) {
    const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutesAgo = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    return `${hoursAgo}h ago`;
  } else if (daysDifference === 1) {
    return `Yesterday ${date.toLocaleTimeString("en-US", {
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
      second: undefined,
    })}`;
  } else if (daysDifference < 7) {
    return `${date.toLocaleString("en-US", {
      weekday: "short",
    })}, ${date.toLocaleTimeString("en-US", {
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
      second: undefined,
    })}`;
  } else if (daysDifference < 365) {
    return `${date.toLocaleString("en-US", {
      day: "numeric",
    })} ${date.toLocaleString("en-US", {
      month: "short",
    })}`;
  } else {
    return `${date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })}`;
  }
}
