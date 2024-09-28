function optimizeBookings(bookings: number[][]): number[][] {
    if (bookings.length === 0) return []; 'if no INPUT is given just return empty array'
    'sorting the Bookings as given in the HINT'  
    //console.log(bookings);
    bookings.sort((a, b) => a[0] - b[0]);
    //console.log(bookings);
    const res: number[][] = [bookings[0]];
    for (let i = 1; i < bookings.length; i++) {
        let last = res[res.length - 1];
        //console.log(res.length -1);
        //console.log(last);
        let curr = bookings[i];
        //console.log(curr);
        'If the current booking overlaps or coincides the last merged booking, merge them'
        if (curr[0] <= last[1]) {
            last[1] = Math.max(last[1], curr[1]);
        } else {
          res.push(curr);
        }
    }
    return res;
}
const input = [[9, 12], [11, 13], [14, 17], [16, 18]];
const output = optimizeBookings(input);
console.log("original:",input);
console.log("optimized:",output);