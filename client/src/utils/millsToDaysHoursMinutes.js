/**
 * function millsToDaysHoursMinutes
 * @param ms (milliseconds)
 * returns days, hours, minutes, and seconds based on time lapsed in milliseconds
 */
const millsToDaysHoursMinutes = ms => {
    //total time lapsed in days, hours, minutes, seconds
    const t_seconds = Math.floor(ms / 1000)
    const t_minutes = Math.floor(t_seconds / 60)
    const t_hours = Math.floor(t_minutes / 60)
    const days = Math.floor(t_hours / 24)
    //actual hours, minutes, seconds 
    const hours = parseInt(t_hours % 60)
    const minutes = parseInt(t_minutes % 60)
    const seconds = parseInt(t_seconds % 60)

    //days
    if (days > 0) {
        if (days === 1) {
            return days + "d ago"
        }
    return days + "ds ago" 
    }
    //hours
    if (hours > 0) {
        if (hours === 1) {
            return hours + "h ago"
        }
        return hours + "hs ago"
    }
    //minutes
    if (minutes > 0) {
        if (minutes === 1) {
            return minutes + "min ago"
        }
        return minutes + "mins ago"
    }
    //seconds
    if (seconds > 0) {
        if (seconds < 15) {
            return "Just now!"
        }
        return seconds + "s ago"
    }
}

/*export*/
export default millsToDaysHoursMinutes