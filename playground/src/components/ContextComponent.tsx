import { createContext, useState, useContext, useMemo, ChangeEvent } from "react";

/**
 * 1. Create Context
 */
type userContextType = { userName: string; setUserName: (userName: string) => void }
const UserContext = createContext({ userName: "", setUserName: () => { } } as userContextType)

export function ContextComponent() {
    const [count, setCount] = useState(0)
    const [userName, setUserName] = useState("John Smith")
    const valueFromInsideOfComp = useMemo(() => {
        return { userName, setUserName }
    }, [userName])

    return (
        <>
            <button onClick={() => setCount(count + 1)}>Increase {count}</button>
            {/* 2. Provide Context */}
            <UserContext.Provider value={valueFromInsideOfComp}>
                {useMemo(
                    () => (
                        <>
                            <UserNameInput />
                            <UserInfo />
                        </>
                    ),
                    []
                )}
            </UserContext.Provider>
        </>
    );
}

function UserNameInput() {
    /**
     * 3. Use Context
     */
    const { userName, setUserName } = useContext(UserContext);
    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => setUserName(e.target.value);
    return <input type="text" value={userName} onChange={changeHandler} />;
}

function UserInfo() {
    /**
     * 3. Use Context
     */
    const { userName } = useContext(UserContext);
    console.log("Render");
    return <span>{userName}</span>;
}
