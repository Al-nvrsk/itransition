export const colorSelector = (int: number) => {
    if (int===0) {
        return ("rgb(255,255,255)")
    } else if (int===1) {
        return ("rgb(255,0,0)")
    } else if (int===-1) {
        return ("rgb(0,0,255)")
    }
}
