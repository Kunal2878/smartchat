"use client"
import { useState, createContext, useContext } from "react"
import { ThemeProvider } from "next-themes"
import {AppContextProps} from './types/basic_types'
import { PagesProgressBar as ProgressBar } from 'next-nprogress-bar';
const AppContext = createContext<AppContextProps|null>(null);

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [id, setId] = useState<any|undefined>("");
  const [email, setEmail] = useState<string|undefined>("");
  const [userName, setUserName] = useState<string|undefined>("");
  const [title, setTitle] = useState<string>("");
  const [avatar, setAvatar] = useState<string|undefined>("solid_user.svg");
  const [isSession, setIsSession] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // const supaUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  // const supaKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

  return (
    <ThemeProvider attribute="class">
      <AppContext.Provider
        value={{
          userName,
          email,
          id,
          title,
          avatar,
          isSession,
          isLoading,
        
          setId,
          setEmail,
          setUserName,
          setTitle,
          setAvatar,
          setIsSession,
          setIsLoading

        }}
      >
        {children}
        <ProgressBar
        height="4px"
        color="#fffd00"
        options={{ showSpinner: false }}
        shallowRouting
      />
      </AppContext.Provider>
    </ThemeProvider>
  );
}



    
export  function UseAppContext():AppContextProps | null {
    return (useContext(AppContext));
}