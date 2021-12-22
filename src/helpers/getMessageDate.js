function isSameDay(date, today) {
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth()
  );
}

export default function getMessageDateService(comment) {
  const today = new Date();
  const commentCreatedAt = new Date(comment.createdAt);

  let daysByMonth;
  switch (commentCreatedAt.getMonth()) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      daysByMonth = 31;
      break;
    case 4:
    case 6:
    case 9:
    case 11:
      daysByMonth = 30;
      break;
    case 2:
      if (today.getFullYear() % 4 === 0) {
        daysByMonth = 29;
      } else {
        daysByMonth = 28;
      }
      break;
    default:
      daysByMonth = 0;
  }

  let message = '';
  if (isSameDay(commentCreatedAt, today)) {
    if (commentCreatedAt.getHours() === today.getHours()) {
      const minutes = today.getMinutes() - commentCreatedAt.getMinutes();
      if (minutes === 0) {
        message = 'now';
      } else if (minutes === 1) {
        message = 'a minute ago';
      } else {
        message = `${minutes} minutes ago`;
      }
    } else if (
      commentCreatedAt.getHours() === today.getHours() - 1 &&
      commentCreatedAt.getMinutes() > today.getMinutes()
    ) {
      const minutes = today.getMinutes() + 60 - commentCreatedAt.getMinutes();
      if (minutes === 1) {
        message = 'a minute ago';
      } else {
        message = `${minutes} minutes ago`;
      }
    } else {
      const hours = today.getHours() - commentCreatedAt.getHours();
      if (hours === 1) {
        message = 'an hour ago';
      } else {
        message = `${hours} hours ago`;
      }
    }
  } else if (commentCreatedAt.getFullYear() !== today.getFullYear()) {
    message = commentCreatedAt.toString().slice(0, 21);
  } else if (
    commentCreatedAt.getMonth() === today.getMonth() &&
    commentCreatedAt.getDate() > today.getDate() - 7
  ) {
    const days = today.getDate() - commentCreatedAt.getDate();
    if (days === 1) {
      message = 'yesterday';
    } else {
      message = `${days} days ago`;
    }
  } else if (
    commentCreatedAt.getMonth() === today.getMonth() - 1 &&
    commentCreatedAt.getDate() > today.getDate() + daysByMonth - 7
  ) {
    const days = today.getDate() + daysByMonth - commentCreatedAt.getDate();
    if (days === 1) {
      message = 'yesterday';
    } else {
      message = `${days} days ago`;
    }
  } else {
    message = commentCreatedAt.toString().slice(0, 21);
  }

  return message;
}
