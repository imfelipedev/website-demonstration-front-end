import { createContext, useCallback, useContext, useEffect, useState } from "react";

const UserContext = createContext({
    user: null,
    isLoading: true,
    login: () => {},
    logout: () => {},
});

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isFetching, setIsFetching] = useState(false);

    const login = useCallback(async () => {
        const request = await fetch("https://website-demonstration-back-end.vercel.app/api/v1/auth");
        const response = await request.json();
        if (request.status === 200) {
            localStorage.setItem("user", JSON.stringify(response.user));
            setUser(response.user);
        } else {
            localStorage.removeItem("user");
            setUser(false);
        }
    }, []);

    const logout = useCallback(async () => {
        const response = await fetch("https://website-demonstration-back-end.vercel.app/api/v1/auth/logout", {
            method: "DELETE",
        });

        if (response.status === 200) {
            localStorage.removeItem("user");
            setUser(null);
        }
    }, []);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const fetchAPI = async () => {
            if (storedUser) {
                if (isLoading && !isFetching) {
                    if (storedUser) {
                        const json = JSON.parse(storedUser);
                        setUser(json);
                    }

                    setIsFetching(true);
                    await login();
                    setIsFetching(false);
                }
            }

            setIsLoading(false);
        };

        fetchAPI();
    }, [login, isFetching, isLoading]);

    const userContextValue = {
        user,
        isLoading,
        login,
        logout,
    };

    return <UserContext.Provider value={userContextValue}>{children}</UserContext.Provider>;
}

export default function useUser() {
    return useContext(UserContext);
}
