import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode:"class",
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes:{ 
        slide_right_left :{
        "0%":{
          transform: "translateX(0px)"
        },
        "50%":{
          transform: "translateX(-80px)"
        },"100%":{
          transform: "translateX(-160px)"
        }
      },
        slide_left :{
        "0%":{
          transform: "translateX(0px)"
        },
        "50%":{
          transform: "translateX(80px)"
        },"100%":{
          transform: "translateX(160px)"
        }
      },
      showLine:{
        "0%":{
          left:"0px"
        },
        "100%":{
          left:"120px"
        }
      }
    },
      animation:{
        slide_right_left:"slide_right_left 2s ease in",
        slide_left:"slide_left 2s ease out",
        showLine: " showLine 3s infinite ease-in"
      },
      backgroundImage: {
        'chatBg': "url('public/chatbg.jpg')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    screens:{
// 'tb':'1060px'

  'sm': '640px',
  // => @media (min-width: 640px) { ... }

  'md': '768px',
  // => @media (min-width: 768px) { ... }

  'lg': '1024px',
  // => @media (min-width: 1024px) { ... }

  'xl': '1280px',
  // => @media (min-width: 1280px) { ... }

  '2xl': '1536px',
    }
  },
  plugins: [],
}
export default config
