import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient(
    { cookies: () => cookieStore },
    {supabaseKey:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlnc2N2aGtxbmtyeWFjYW51d3FiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM1OTc2OTAsImV4cCI6MjAxOTE3MzY5MH0.1eKpXS6sRy2GWnZ_IaJ_RR3qLTfDwO3xcpwLGzG4AZE',
    supabaseUrl:'https://igscvhkqnkryacanuwqb.supabase.co'
    }
  
  
  )

  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    await supabase.auth.signOut()
  }

  return NextResponse.redirect(new URL('/', req.url), {
    status: 302,
  })
}