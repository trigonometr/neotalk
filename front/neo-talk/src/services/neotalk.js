export const setParagraphs = (text) => {
  let lines = text.split('\n');
  return lines.map((line) => <p>{line}</p>);
};

const getTimeAgo = (num, singularStr) => {
  return `${num} ${singularStr}${num === 1 ? '' : 's'} ago`;
};

export const timeAgo = (utcTimeStr) => {
  let msTimeDelta = Date.now() - new Date(utcTimeStr);

  let minutesAgo = Math.round(msTimeDelta / (60 * 1000));
  let hoursAgo = Math.round(minutesAgo / 60);
  if (hoursAgo === 0) {
    if (minutesAgo < 5) {
      return 'recently';
    }
    return `${minutesAgo} minutes ago`;
  }
  let daysAgo = Math.round(hoursAgo / 24);
  if (daysAgo === 0) {
    return getTimeAgo(hoursAgo, 'hour');
  }

  let weeksAgo = Math.round(daysAgo / 7);
  if (weeksAgo === 0) {
    return getTimeAgo(daysAgo, 'day');
  }

  let monthsAgo = Math.round(weeksAgo / 4);
  if (monthsAgo === 0) {
    return getTimeAgo(weeksAgo, 'week');
  }

  let yearsAgo = Math.round(monthsAgo / 12);
  if (yearsAgo === 0) {
    return getTimeAgo(monthsAgo, 'month');
  }

  return getTimeAgo(yearsAgo, 'year');
};

export function profileURL(userID) {
  return `/profile/${userID}`;
}

export function neotalkURL(neotalkID) {
  return `/neotalk/${neotalkID}`;
}
