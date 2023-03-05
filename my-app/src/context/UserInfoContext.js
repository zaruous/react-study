import {createContext } from "react";

const UserInfo = {
    email : "",
    nickName : "",
    profileImage : ""
}

export const UserInfoContext = createContext(UserInfo);
export {UserInfo}