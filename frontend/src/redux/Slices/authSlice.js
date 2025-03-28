import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

let logoutTimer = null;

// Function to get persistent user data from localStorage
const getPersistentUserData = () => {
    try {
        const token = localStorage.getItem("Token");
        const storedUserData = localStorage.getItem("UserData");
        
        if (token && storedUserData) {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            
            // Check if token is still valid
            if (decodedToken.exp > currentTime) {
                return {
                    isUserLoggedIn: true,
                    user: JSON.parse(storedUserData),
                    accessToken: token
                };
            }
        }
        
        // Clear storage if token is invalid
        localStorage.removeItem("Token");
        localStorage.removeItem("UserData");
        return null;
    } catch (error) {
        console.error("Error retrieving user data", error);
        localStorage.removeItem("Token");
        localStorage.removeItem("UserData");
        return null;
    }
};

// Get persistent data or set initial state
const persistedData = getPersistentUserData();

const initialState = persistedData || {
    isUserLoggedIn: false,
    user: null,
    accessToken: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            try {
                const { accessToken, user } = action.payload;
                const decodedToken = jwtDecode(accessToken);
                const currentTime = Date.now() / 1000;

                if (decodedToken.exp > currentTime) {
                    // Update state
                    state.isUserLoggedIn = true;
                    state.accessToken = accessToken;
                    state.user = {
                        bio: user.bio,
                        email: user.email,
                        name: user.name,
                        profileImage: user.profileImage,
                        role: user.role,
                        username: user.username,
                        _id: user._id
                    };

                    // Persist to localStorage
                    localStorage.setItem("Token", accessToken);
                    localStorage.setItem("UserData", JSON.stringify(state.user));
                    
                    // Start auto-logout timer
                    startAutoLogout((decodedToken.exp - currentTime) * 1000);
                } else {
                    console.warn("Token received but already expired");
                }
            } catch (error) {
                console.error("Invalid token", error);
            }
        },
        logout: (state) => {
            // Clear state
            state.isUserLoggedIn = false;
            state.user = null;
            state.accessToken = null;

            // Clear localStorage
            localStorage.removeItem("Token");
            localStorage.removeItem("UserData");

            // Clear logout timer
            if (logoutTimer) {
                clearTimeout(logoutTimer);
            }
        },
        updateUserProfile: (state, action) => {
            if (state.user) {
                state.user = { ...state.user, ...action.payload };
                console.log("updated user profile",state.user)
                localStorage.setItem("UserData", JSON.stringify(state.user));
            }
        }
    },
});

export const { setUser, logout, updateUserProfile } = authSlice.actions;
export default authSlice.reducer;

function startAutoLogout(timeUntilExpiry) {
    if (logoutTimer) {
        clearTimeout(logoutTimer);
    }

    logoutTimer = setTimeout(() => {
        console.warn("Token expired! Automatically logging out...");
        // Dispatch logout action or reload
        window.location.reload();
    }, timeUntilExpiry);
}