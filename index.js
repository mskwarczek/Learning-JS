const formatDate = (timeInSeconds) => {
    if (!timeInSeconds) return `0s`;

    const seconds = Math.floor(timeInSeconds) % 60;
    let time = seconds === 0 ? `` : `${seconds}s`;

    const minutes = Math.floor(timeInSeconds / 60) % 60;
    time = minutes === 0 ? time : `${minutes}m ` + time;

    const hours =  Math.floor(timeInSeconds / 3600) % 60
    time = hours === 0 ? time : `${hours}h ` + time;
    
    return time.trim();
}
  
module.exports = formatDate;