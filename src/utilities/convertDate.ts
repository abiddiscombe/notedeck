// https://stackoverflow.com/questions/24170933/convert-unix-timestamp-to-date-time-javascript

export function convertDate(ts?: number) {
    const date = ts ? new Date(ts) : new Date();
    let YYYY = date.getFullYear();
    let MM = ("0" + (date.getMonth() + 1)).slice(-2);
    let DD = ("0" + date.getDate()).slice(-2);
    let hh = ("0" + date.getHours()).slice(-2);
    let mm = ("0" + date.getMinutes()).slice(-2);

    return {
        hh: hh,
        mm: mm,
        date: `${YYYY}-${MM}-${DD}`,
    };
}
