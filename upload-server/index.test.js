
const filename = "test.jpg";
const regex = /^[a-zA-Z0-9_-]+.[a-zA-Z]{3,4}$/; // 파일명이 알파벳, 숫자, 하이픈, 언더스코어로만 이루어진 파일명일 경우
if (!regex.test(filename)) {
    console.log("불일치");
}
else
{
    console.log("일치");
}