export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]
export interface Friend_list{
  frnd:{
    f_mail:string
    f_name:string
    f_avatar:string
  }

}
export interface Room_names{
Rooms:{

  room_name:string
}


}
export interface Database {
//   auth:{
//     Tables:{
//   user: {

//   Row: {
//     // Data expected from.select()
//     id: string;
    
  
// }

// }
//     }

// }
  public: {
    Tables: {
      Userinfo: {
        Row: {
          // the data expected from .select()
          id: number
          username: string
          email:string
          data: Json | null
        }
        Insert: {
          // the data to be passed to .insert()
          id?: never 
          username: string
          email:string
          password:string
          first_name:string
          last_name:string
          data?: Json | null // nullable columns can be omitted
        }
        Update: {
          // the data to be passed to .update()
          id?: never 
          username: string
          email:string
          password:string
          first_name:string
          last_name:string
          data?: Json | null
        }
      },
      profiles: {
        Row: {
          // Data expected from .select()
          id: string; // UUID type represented as string
          updated_at: Date;
          username: string;
          full_name: string;
          avatar_url: string | null;
          email:string|null;
       
        },
        Insert: {
          // Data to be passed to .insert()
          id?: never;
          updated_at?: Date; // Can be omitted for auto-generated timestamps
          username: string;
          full_name: string;
          avatar_url?: string; // Nullable
          email:string|null;   
        },
        Update: {
          // Data to be passed to .update()
          id?: never;
          updated_at?: Date;
          username?: string;
          full_name?: string;
          avatar_url?: string;
          email:string;
        },
      },
      Invite:{
        Row:{
id:string
sender:string,
receiver:string,
sender_name:string,
isDone:boolean,
isnew:boolean,
created_at: Date | string;
avatar_url:string,
rec_avatar:string,
rec_username:string
        },
        Insert:{
       id:string
sender:string,
receiver:string,
sender_name:string,
isDone:boolean,
isnew:boolean,
created_at: Date | string;
avatar_url:string,
rec_avatar:string,
rec_username:string
        },
        Update:{
      id:string
sender:string,
receiver:string,
sender_name:string,
isDone:boolean,
isnew:boolean,
created_at: Date | string;
avatar_url:string,
rec_avatar:string,
rec_username:string
        },
        Delete:{
id:string
sender:string,
receiver:string,
sender_name:string,
isDone:boolean,
isnew:boolean,
created_at: Date | string;
avatar_url:string,
rec_avatar:string,
rec_username:string
        },
      },
Friends:{
Row:{
  id:string,
  f_name:string,
  f_avatar:string,
  f_email:string,
  user:string,
  isexist:string,
  isChat:boolean


},
Insert:{
  id:string,
  f_name:string,
  f_avatar:string,
  f_email:string,
  user:string,
  isexist:string
  isChat:boolean


},
Update:{
  id:string,
  f_name:string,
  f_avatar:string,
  f_email:string,
  user:string,
  isexist:string,
  isChat:boolean


},
Delete:{
  id:string,
  f_name:string,
  f_avatar:string,
  f_email:string,
  user:string,
  isexist:string,
  isChat:boolean


},
},
      Chat_room: {
        Row: {
          // Data expected from .select()
          id: string
        room_name:string,
          info:{mail:string,content:string,room_name:string}|null
        },
        Insert: {
          // Data to be passed to .insert()
          id: string
          room_name:string,
          info:{mail:string,content:string,room_name:string}|null
        },
        Update: {
          id: string
          room_name:string,
          info:{mail:string,content:string,room_name:string}|null
        },
        Delete: {
          id: string
          room_name:string,
          info:{mail:string,content:string,room_name:string}|null
        },
      },
      Code_check: {
        Row: {
          // Data expected from .select()
          code: string; // UUID type represented as string
          info:Json|null
        },
        Insert: {
          // Data to be passed to .insert()
          code: string; // UUID type represented as string
          info:Json|null
        },
        Update: {
          code: string; // UUID type represented as string
          info:Json|null
        },
      },
    }
  }
}