import { createContext } from "react";
import { LoggedUserInfo } from "./type";

export const UserContext = createContext<LoggedUserInfo>(
    {id: "", profileImage: "", badge: []}
)