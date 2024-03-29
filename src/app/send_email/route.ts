
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { send } from 'process';
type ResponseData = {
  message: string,
status:number
}



export async function POST(req: NextRequest, res: NextResponse<ResponseData>) {

  if (req.method === "POST") {
    try {
      const body = await req.json();

      if (!body) {
        console.log("No body provided");
        return res.json(); 
      }

      const { to, subject, info } = body;


      const transporter = nodemailer.createTransport({
        service: "gmail", 
        auth: {
          user: "royr81860@gmail.com",
          pass: "nfeplqsyhpgjwggo",  
        },
      });
      const generateRandomCode = () => {
        let code = '';
        
        for (let i = 0; i < 6; i++) {
          code += Math.floor(Math.random() * 10);
        }
      
        return code;
      }
      
      const randomCode = generateRandomCode();

      const send_mail=await transporter.sendMail({
        from: "Smart Chat Team",
        to: to,
        subject: "Invitaion for joining in smart chat room",

      html: `
      <html>
  <head>

  </head>
  
  <body style="margin:1rem; padding:0.8rem; background-color:#161544; min-height:50vh; display: block; justify-content: center; align-items: center; border-radius: 10px;">
  
    <p style="color: yellow; font-size: 0.7rem; font-weight: 800;">
      ${to} has invited you to join the chat room
    </p>

    <p style="color: cyan; display:flex; justify-content:center; align-items:center; font-size: 0.7rem; font-weight: 600; padding: 1rem;">
      Please click below to join and enter the code 
      </p>

      <p style="width:100%; display:flex; justify-content:center; align-items:center;"> 
      <a href="http://localhost:3000/" 
      style=" padding-left:0.6rem; display:flex; justify-content:center; align-items:center; text-decoration: none; color: white; font-size: 1rem; font-weight: 600; width:70px; height:40px; border-radius: 10px;background-color: orange;">
      Join  
    </a>
 
    </p>

    <p style="color: green; font-size: 1.2rem; font-weight: 900;">
      Invitation Code: ${randomCode}  
    </p>
  </body>
</html>

    `,

    });
    console.log(send_mail.response)
    if(send_mail.response)
    {
      return NextResponse.json({ status:200 });

    }

    } catch (error) {

      return NextResponse.json({status: 404});
    } 
  } else {
    return NextResponse.json({status: 405});
  }
}





