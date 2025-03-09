import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

let logoutTimer = null;

const token = localStorage.getItem("Token");
let decodedUser = null;
let isTokenValid = false;

if (token) {
    try {
        decodedUser = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        console.log(decodedUser)
        if (decodedUser.exp > currentTime) {
            isTokenValid = true;
            startAutoLogout((decodedUser.exp - currentTime) * 1000); // Start auto-logout timer
        } else {

            localStorage.removeItem("Token");
        }
    } catch (error) {
        console.error("Invalid token", error);
        localStorage.removeItem("Token");
    }
}

const initialState = {
    isUserLoggedIn: isTokenValid,
    user: isTokenValid ? decodedUser : null,
    accessToken: isTokenValid ? token : null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            try {
                const decodedToken = jwtDecode(action.payload.accessToken);
                const currentTime = Date.now() / 1000;

                if (decodedToken.exp > currentTime) {
                    state.isUserLoggedIn = true;
                    console.log(action.payload.accessToken)
                    state.accessToken = action.payload.accessToken;
                    localStorage.setItem("Token", action.payload.accessToken); // Store token in localStorage
                    state.user = decodedToken;
                    console.log(decodedToken)
                    console.log(state.user)
                    startAutoLogout((decodedToken.exp - currentTime) * 1000); // Start logout timer

                } else {
                    console.warn("Token received but already expired");
                }
            } catch (error) {
                console.error("Invalid token", error);
            }
        },
        logout: (state) => {
            state.isUserLoggedIn = false;
            state.user = null;
            state.accessToken = null;
            localStorage.removeItem("Token"); // Remove token on logout

            if (logoutTimer) {
                clearTimeout(logoutTimer);
            }
        },
    },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;


function startAutoLogout(timeUntilExpiry) {
    if (logoutTimer) {
        clearTimeout(logoutTimer);
    }

    logoutTimer = setTimeout(() => {
        console.warn("Token expired! Automatically logging out...");
        window.location.reload();
    }, timeUntilExpiry);
}
