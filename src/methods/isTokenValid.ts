import { jwtDecode } from "jwt-decode";
import JwtPayload from "../types/JwtPayload";

export default function isTokenValid(token: string): boolean {
    try
    {
        const decoded = jwtDecode<JwtPayload>(token);
        console.log(decoded);
        const currTime = Date.now() / 1000;
        return decoded.exp > currTime;
    }
    catch (err)
    {
        console.error("Invalid token", err);
        return false;
    }
}