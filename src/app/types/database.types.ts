export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  auth:{
    Tables:{
  user: {

  Row: {
    // Data expected from.select()
    id: string;
    
  
}

}
    }

}
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
sender:string,
receiver:string,
sender_name:string,
isDone:boolean,
created_at: Date | string;
        },
        Insert:{
sender:string,
receiver:string,
sender_name:string,
isDone:boolean,
created_at: Date | string;
        },
        Update:{
sender:string,
receiver:string,
sender_name:string,
isDone:boolean,
created_at: Date | string;
        },
        Delete:{
sender:string,
receiver:string,
sender_name:string,
isDone:boolean,
created_at: Date | string;
        },
      },
      Chat_room: {
        Row: {
          // Data expected from .select()
          id: string; // UUID type represented as string
          room_name:string
          info:Json|null
        },
        Insert: {
          // Data to be passed to .insert()
          id?: never;
          room_name:string
          info:Json|null
        },
        Update: {
          id?: never;
          room_name:string
          info:Json|null
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