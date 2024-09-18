import { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser } from '../lib/appwrite'

/**
 * GlobalContext provides a global state management context for the application.
 */
const GlobalContext = createContext();

/**
 * Custom hook to use the GlobalContext.
 * 
 * @returns {Object} The context value including:
 * - `isLoggedIn`: Boolean representing if a user is logged in.
 * - `setIsLoggedIn`: Function to update the `isLoggedIn` state.
 * - `user`: The currently logged-in user's data.
 * - `setUser`: Function to update the `user` state.
 * - `isLoading`: Boolean representing if the authentication check is still loading.
 */
export const useGlobalContext = () => useContext(GlobalContext);

/**
 * GlobalProvider component that wraps the application in a global state context.
 * 
 * This provider manages the global state for user authentication, including
 * whether a user is logged in, the current user data, and the loading state
 * of the authentication process.
 * 
 * @component
 * @param {Object} props - The component's props.
 * @param {React.ReactNode} props.children - The child components that will have access to the global context.
 * @returns {JSX.Element} The GlobalProvider component.
 */
const GlobalProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getCurrentUser()
            .then((res) => {
                if(res) {
                    setIsLoggedIn(true);
                    setUser(res)
                } else {
                    setIsLoggedIn(null);
                    setUser(null);
                }
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, []);

    return (
        <GlobalContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                user,
                setUser,
                isLoading
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider