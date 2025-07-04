import { jwtDecode } from "jwt-decode";
import JwtPayload from "../types/JwtPayload";

export default async function refreshToken(token: string) {
    const decoded = jwtDecode<JwtPayload>(token);
    const response = await fetch("http://localhost:5122/api/account/refresh/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(decoded.nameid)
    });

    const result = await response.json();

    if(result.succeeded) {
        console.log("Successfully refreshed the token!");
        localStorage.setItem("token", result.token);
    }
    else {
        console.error("sth went wrong...", result);
    }                
}