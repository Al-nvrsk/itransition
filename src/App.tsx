import { createContext } from "react"
import UserStore from "./task4/client/store/UserStore"
import { AppRouter } from "./utils/AppRouter"
interface ContextSchema {
    userContext: UserStore,
}

export const Context = createContext<ContextSchema|null>(null);

export const App = () => {

    return (
        <>
            <Context.Provider value={
                {
                    userContext: new UserStore(),
                }
            }>
                <AppRouter />
            </Context.Provider>
        </>
    )
}
