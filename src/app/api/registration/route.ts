// // pages/api/signup.ts
// import { NextApiRequest, NextApiResponse } from 'next';
// import supabase from '@/app/supabase'; // Adjust the path accordingly

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     const { email, password } = req.body;

//     try {
//       const { data, error } = await supabase.auth.signUp({ email, password });

//       if (error) {
//         return res.status(400).json({ error: error.message });
//       }

//       // Assuming you want to send back user information on successful signup
//       return res.status(200).json({ data });
//     } catch (error:any) {
//       console.error('Error during signup:', error.message);
//       return res.status(500).json({ error: 'Internal Server Error' });
//     }
//   }

//   return res.status(405).json({ error: 'Method Not Allowed' });
// }
