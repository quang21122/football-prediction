import { createContext, useState} from "react";

export const UserContext = createContext();
export const UserProvider = ({ children }) => {
    const [userName, setUserName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null)
    return (
        <UserContext.Provider value = {{ userName, setUserName, email, setEmail, password, setPassword}}>
            {children}
        </UserContext.Provider>
    )
}