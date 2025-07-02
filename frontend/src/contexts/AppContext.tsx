import React, { useContext, useState } from "react";
import Toast from "../components/Toast";

type ToastMessage = {
    message:string;
    type:"SUCCESS" | "ERROR"
}



type AppContextType = {
    showToast:(toastMessage: ToastMessage)=>void
}

const AppContext = React.createContext<AppContextType | undefined>(undefined)

export const AppContextProvider = ({children}:{children:React.ReactNode})=>{
    

    const [toast,setToast] = useState<ToastMessage|undefined>(undefined)
    return(
        <AppContext.Provider value={
            {showToast:(toslike)=>{
                console.log(toslike);
                
            }}
        }>
            
            {children}
        </AppContext.Provider> 
    )
}

export const useAppContext = ()=>{
   const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppContextProvider');
    }
    return context;
}