/**
 *  시퀀스 번호를 생성하기 위한값.
 */
let IdgenUti_generate_sequence = 0;

/**
 *
 */
export function generateTimestamp() : string{
    const date = new Date();
    const year = date.getFullYear();
    const month =
        date.getMonth() + 1 < 10
            ? '0' + (date.getMonth() + 1)
            : date.getMonth() + 1;
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    const minute =
        date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    const second =
        date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    const millisecond = date.getMilliseconds();

    IdgenUti_generate_sequence += 1;
    if(IdgenUti_generate_sequence >= 100) {
        IdgenUti_generate_sequence = 0;
    }

    return `${year}${month}${day}${hour}${minute}${second}${millisecond}${formatNumber(IdgenUti_generate_sequence)}`;

}

/**
 *
 * @param num
 */
function formatNumber(num : number) : string {
    return num.toString().padStart(3, '0');
}