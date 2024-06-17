import Head from 'next/head'
import { Inter } from 'next/font/google'
import './globals.css'
import { AppWrapper } from './index'
const inter = Inter({ subsets: ['latin'] })
import { PagesProgressBar as ProgressBar } from 'next-nprogress-bar';
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'SmartChat-Home🏡',

    description: 'SmartChat',

}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en" suppressHydrationWarning={true} className="dark">
    
    <Head> <link rel="icon" href="/brand_fav.ico" /></Head>
      <body className={inter.className + "w-screen overflow-x-hidden "}>
        <AppWrapper>
        {children}
        {/* <ProgressBar
        height="4px"
        color="#fffd00"
        options={{ showSpinner: true }}
        shallowRouting
      /> */}
        </AppWrapper>
      </body>
    </html>
  );
}
