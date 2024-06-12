import { AnyNode } from "postcss";

export interface Message {
    mail:string
    content: string
    room_name:string
    time:string

}

export interface Message2 {
 info: {
    mail:string
    content: string;
    room_name:string

  }

  }
  export interface Namespace{
    chat_message:string
  }
  export interface AppContextProps {
    userName: string | undefined;
    email: string|undefined;
    id: AnyNode|undefined;
    title: string;
    avatar: string|undefined;
    isSession: boolean;
    isLoading:boolean;
    isNotify:boolean;
    isLogin:boolean;
    f_chat:string;
    room:string;
    rmsg:any;
    isThemeMenu:boolean;
    isInvite:boolean;
    chatTheme:string;
    setUserName: (userName: string|undefined) => void;
    setEmail: (email: string|undefined) => void;
    setId: (id: any|undefined) => void;
    setTitle: (title: string) => void;
    setAvatar: (avatar: string|undefined) => void;
    setIsSession: (isSession: boolean) => void;
    setIsLoading: (isLoading: boolean) => void;
    setIsNotify: (isNotify: boolean) => void;
    setIsLogin: (isLogin: boolean) => void;
    setF_chat: (f_chat: string) => void;
    setRoom: (room: string) => void;
    setRmsg: (rmsg: any) => void;
    setIsThemeMenu: (isThemeMenu: boolean) => void;
    setIsInvite: (isInvite: boolean) => void;
    setChatTheme: (chatTheme: string) => void;

    
  }
  // test.res246@gmail.com
  //Rest@2468