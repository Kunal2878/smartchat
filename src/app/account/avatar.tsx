'use client'
import React, { useEffect, useState } from 'react'
import { Database } from '../types/database.types'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Image from 'next/image'
type Profiles = Database['public']['Tables']['profiles']['Row']

export default function Avatar({
  uid,
  url,
  size,
  onUpload,
}: {
  uid: string
  url: Profiles['avatar_url']
  size: number
  onUpload: (url: string) => void
}): React.JSX.Element {
  const supabase = createClientComponentClient<Database>(
    {supabaseKey:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlnc2N2aGtxbmtyeWFjYW51d3FiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM1OTc2OTAsImV4cCI6MjAxOTE3MzY5MH0.1eKpXS6sRy2GWnZ_IaJ_RR3qLTfDwO3xcpwLGzG4AZE',
    supabaseUrl:'https://igscvhkqnkryacanuwqb.supabase.co'
    }
  )
  const [avatarUrl, setAvatarUrl] = useState<Profiles['avatar_url']>(url)
  const [uploading, setUploading] = useState(false)
  console.log("Avatar url changed\t", avatarUrl,"\n")
//   useEffect(() => {
//   async function downLoadImage(url: string): Promise<ArrayBuffer> {
   
//     setAvatarUrl(url)
//     console.log(avatarUrl)
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error(`Failed to download image. Status: ${response.status}`);
//     }
  
//     return await response.arrayBuffer();
//   }
  
//   async function uploadImageToSupabase(googleCloudImageUrl: string, storagePath: string) {
//     try {
     
//       const imageData = await downLoadImage(googleCloudImageUrl);
  

//       const { data, error } = await supabase.storage.from('avatars').upload(storagePath, imageData);
  
//       if (error) {
//         throw error;
//       }
  
//       console.log('Image uploaded successfully:', data);
  
//       return data;
//     } catch (error) {
//       console.error('Error uploading image:', error);
//       throw error;
//     }
//   }

//       if (url) {
     
//       const storagePath = `avatars/${uid}.jpg`; // Specify the desired storage path in Supabase
//       uploadImageToSupabase(url, storagePath);
//     }
// }, [url, supabase])





  useEffect(() => {
    async function downloadImage(path: string) {
      try {
        // const { data, error } = await supabase.storage.from('avatars').download(path)
        const { data, error } = await supabase.storage
        .from('avatars')
        .createSignedUrl(path, 60000);

        if (error) {
          throw error
        }
        console.log("this is data",data)
        // const url = URL.createObjectURL(data)
        const url = data.signedUrl
        console.log("changed url\t",url)
        setAvatarUrl((prevUrl) => data.signedUrl || prevUrl);
        console.log("avatarUrl after change\t", avatarUrl)
      } catch (error) {
        console.log('Error downloading image: ', error)
      }
    }

    if (url) 

    { if(url.includes(('lh3.googleusercontent.com')) || url.includes(('igscvhkqnkryacanuwqb.supabase.co')))
      {
        setAvatarUrl(url)
        console.log(avatarUrl)
        return
      }
      else{
        downloadImage(url)

      }

    
    }
  }, [url, supabase])

  const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const filePath = `${uid}-${Math.random()}.${fileExt}`

      const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      onUpload(filePath)
    } catch (error) {
      alert('Error uploading avatar!')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      {avatarUrl ? (
        <Image
        width={80} 
        height={80} 
      
        tw="sm:w-80 sm:h-80 md:w-100 md:h-100 lg:w-120 lg:h-120"
         src= {avatarUrl}
          alt="Avatar"
          className="avatar image rounded-full sm:w-80 sm:h-80 md:w-100 md:h-100"
          
        />

      ) : (
        <div className="avatar no-image" style={{ height:  size, width:  size }} />
      )}
      <div style={{ width: size }}>
       
        <label className="button primary block" htmlFor="single">
          {uploading ? 'Uploading ...' : 'Upload'}
        </label>
        <input
          style={{
            visibility: 'hidden',
            position: 'absolute',
          }}
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </div>

    </div>
  )
}