'use client'
import { useState, useRef, ChangeEvent } from 'react';
export default function Signup(){

  const s1Ref = useRef(null);
  const s2Ref = useRef(null);
  const s3Ref = useRef(null);
  const signRef = useRef(null);
  const logRef = useRef(null);


  const [activeSection, setActiveSection] = useState('s1');
  const [sinlog, setSinLog] = useState('signup');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setlastName] = useState('');

  const [mobileNumber, setMobileNumber] = useState('');

  const handleSignup = async () => {

console.log("entry");
    // Make a request to the signup endpoint with the collected data (email and password)
    const response = await fetch('/api/registration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Signup successful:', data.user);
    } else {
      console.error('Signup failed:', data.error);
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);

    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if the email matches the pattern
    setIsValidEmail(emailRegex.test(inputEmail));
  };

  const scrollToSection = (id:string) => {
    if (id === 's1' && s2Ref.current) {
      (s2Ref.current as HTMLElement).scrollIntoView({ behavior: 'smooth' });
      setActiveSection('s2');
    }
    if (id === 's2' && s3Ref.current) {
      (s3Ref.current as HTMLElement).scrollIntoView({ behavior: 'smooth' });
      setActiveSection('s3');
    }
    if (id === 'signup' && logRef.current) {
      (logRef.current as HTMLElement).scrollIntoView({ behavior: 'smooth' });
      setSinLog('login');
         }
  };

  const goBack = (id:string) => {
    if (id === 's2' && s1Ref.current) {
 (s1Ref.current as HTMLElement).scrollIntoView({ behavior: 'smooth' });
      setActiveSection('s1');
    }
    if (id === 's3' && s2Ref.current) {
 (s2Ref.current as HTMLElement).scrollIntoView({ behavior: 'smooth' });
      setActiveSection('s2');
    }
    if (id === 'login' && signRef.current) {
 (signRef.current as HTMLElement).scrollIntoView({ behavior: 'smooth' });
 setSinLog('signup');
    }

  };




return(
    <div className="w-full h-screen block tb:flex  tb:flex-row p-1 tb:p-4 justify-center items-center">
<div className='w-full h-1/2 tb:mr-6 tb:mt-10 mt-6 tb:w-1/2 tb:h-screen flex flex-row'>

<div className="w-full h-full tb:h-3/4 skew-y-12 tb:skew-y-12 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-green-700 via-gray-900 to-black"
style={{
  backgroundImage: 'url("signupbg1.png")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
}}
>

</div>
<div className="w-full h-full tb:h-3/4 -skew-y-12 tb:-skew-y-12 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black"
style={{
  backgroundImage: 'url("signupbg2.png")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
}}
>
</div>

</div>
<div className='w-full tb:w-2/5 tb:ml-4  shadow-md shadow-slate-400 flex overflow-x-hidden pt-2 pb-2 m-1 rounded-md'>

<div className="min-w-full  block  bg-transparent p-2 rounded-lg" id='signup' ref={signRef}>
<h2 className="text-3xl font-bold mb-4 text-white">Sign Up</h2>
<div className="w-full flex  flex-nowrap overflow-x-hidden">
<div className="min-w-full block mb-2 p-2" id="s1" ref={s1Ref}>
    <div className="w-full mb-4">
            <label className="w-full block text-sm font-medium text-white">First Name</label>
            <input type="text" className=" bg-transparent mt-1 p-2 w-3/4 border-b outline-none border-cyan-500" placeholder="Enter your first name" 
            value={firstName} 
            onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="w-full mb-6">
            <label className="block text-sm font-medium text-white">Last Name</label>
            <input type="text" className="bg-transparent mt-1 p-2 w-3/4 border-b border-cyan-500 outline-none" placeholder="Enter your last name" 
            value={lastName} />
          </div>
          <div className="w-full mb-2 flex justify-center items-center">

<button className="w-1/5 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-pink-500 via-red-500 to-yellow-500 flex justify-center items-center text-white rounded-md"  onClick={() => scrollToSection('s1')}>Next</button>

          </div>

          </div>

         <div className="min-w-full block mb-6" id="s2" ref={s2Ref}>
         <div className="w-full mb-4">
        <label className="block text-sm font-medium text-white">Email</label>
        <input
          type="email"
          className={`bg-transparent mt-1 p-2 w-3/4 border-b ${
            isValidEmail ? 'border-cyan-500' : 'border-red-500'
          } outline-none`}
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
          required  />
        {!isValidEmail && (
          <p className="text-red-500 text-sm mt-1">Invalid email address</p>
        )}
      </div>

          <div className="w-full mb-6">
            <label className="block text-sm font-medium text-white">Mobile Number</label>
            <input type="text" className="bg-transparent mt-1 p-2 w-3/4 border-b border-cyan-500 outline-none" placeholder="Enter your mobile number" required />
          </div>
          <div className="w-full mb-2 flex justify-between items-center">

<button className="w-1/5 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-pink-500 via-red-500 to-yellow-500 flex justify-center items-center text-white rounded-md" onClick={()=>goBack('s2')}>Back</button>
<button className="w-1/5 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-pink-500 via-red-500 to-yellow-500 flex justify-center items-center text-white rounded-md"  onClick={() => scrollToSection('s2')}>Next</button>
</div>
</div>
         <div className="min-w-full block mb-4" id="s3" ref={s3Ref}>
          <div className="w-full mb-4">
            <label className="block text-sm font-medium text-white">Password</label>
            <input type="email" className="bg-transparent mt-1 p-2 w-3/4 border-b border-cyan-500 outline-none " placeholder="Enter your password" required />
          </div>

          <div className="w-full mb-6">
            <label className="block text-sm font-medium text-white">Confirm Password</label>
            <input type="password" className="bg-transparent mt-1 p-2 w-3/4 border-b border-cyan-500 outline-none" placeholder="Reenter your password" required />
          </div>
          
          <div className="w-full mb-2 flex justify-between items-center">

<button className="w-1/5 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-pink-500 via-red-500 to-yellow-500 flex justify-center items-center text-white rounded-md" onClick={()=>goBack('s3')}>Back</button>
<button className="w-1/5 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-pink-500 via-red-500 to-yellow-500 flex justify-center items-center text-white rounded-md" onClick={() => handleSignup()}>Submit</button>
</div>
</div>

</div>
<div><h4 className='text-white flex justify-center items-center'>Already have an account? <button onClick={()=>scrollToSection('signup')}>Login</button></h4></div>
</div>

<div className="min-w-full  block  bg-transparent p-2 rounded-lg" id='login' ref={logRef}>
<h2 className="text-3xl font-bold mb-4 text-white">Login</h2>

<div className=' w-full block  bg-transparent p-2 rounded-lg'>
<div className="w-full mb-4">
            <label className="w-full block text-sm font-medium text-white">Email</label>
            <input type="email" className=" bg-transparent mt-1 p-2 w-3/4 border-b outline-none border-cyan-500" placeholder="Enter your registered email" />
          </div>

          <div className="w-full mb-6">
            <label className="block text-sm font-medium text-white">Password</label>
            <input type="password" className="bg-transparent mt-1 p-2 w-3/4 border-b border-cyan-500 outline-none" placeholder="Enter your registered password" />
          </div>

          <div className="w-full mb-6 flex justify-center items-center">
          <button className="w-1/5 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-pink-500 via-red-500 to-yellow-500 flex justify-center items-center text-white rounded-md" >Login</button>
          </div>

          <div><h4 className='text-white flex justify-center items-center'>Donot have an account? <button onClick={()=>goBack('login')}>Sign up</button></h4></div>

</div>



</div>

</div>

</div>


)

}

