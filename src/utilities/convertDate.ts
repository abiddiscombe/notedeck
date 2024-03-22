// https://stackoverflow.com/questions/24170933/convert-unix-timestamp-to-date-time-javascript

export function convertDate(ts?: number) {
    const date = ts ? new Date(ts) : new Date();
    const YYYY = date.getFullYear();
    const MM = ("0" + (date.getMonth() + 1)).slice(-2);
    const DD = ("0" + date.getDate()).slice(-2);
    const hh = ("0" + date.getHours()).slice(-2);
    const mm = ("0" + date.getMinutes()).slice(-2);

    return {
        hh: hh,
        mm: mm,
        date: `${YYYY}-${MM}-${DD}`,
    };
}
