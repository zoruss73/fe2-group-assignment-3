import { data, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import gsap from "gsap"
import Button from "../components/Button"
import Input from "../components/Input"
import Label from "../components/Label"

export default function Login() {
    const { 
        register, 
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm()
    const [showPassword, setShowPassword] = useState(false)
    const onSubmit = ( data ) => {
        const users = JSON.parse(localStorage.getItem("users")) || []

        const user = users.find(
            (u) => u.email === data.email && u.password === data.password
        );

        if(!user) {
            setError("password", { type: "manual", message: "Invalid email or password" });
            toast.error("Invalid email or password");
            return;
        }
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        toast.success("Login successful! Welcome back, " + user.firstName + "!");
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Floating circles continuous animation
            gsap.to(".login-float", {
                y: -12,
                duration: 2.5,
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1,
                stagger: 0.4,
            })
        })

        return () => ctx.revert()
    }, [])

    return (
        <div className="flex flex-col lg:flex-row h-screen w-full">
            {/* Form Section */}
            <div className="w-full lg:w-1/3 flex-1 lg:flex-none flex flex-col justify-center px-6 sm:px-10 py-10 lg:py-0 bg-slate-900 shadow-2xl z-10">
                <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-white font-montserrat">Welcome Back</h1>
                <p className="text-slate-400 mb-8 font-montserrat text-sm">Sign in to your account</p>
                <form className="flex flex-col gap-4 sm:gap-5" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input type="email" id="email" placeholder="you@example.com" {...register("email", { required: true })} />
                    </div>
                    <div>
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                            <Input type={showPassword ? "text" : "password"} id="password" placeholder="••••••••" className="pr-10" {...register("password", { required: true })} />
                            <button type="button" onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors">
                                {showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12c1.292 4.338 5.31 7.5 10.066 7.5.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                        {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
                    </div>
                    <Button type="submit">Sign In</Button>
                </form>
                <div className="mt-6 text-center">
                    <p className="text-slate-400 text-sm font-montserrat">Don't have an account? <Link to="/register" className="text-fuchsia-400 font-semibold hover:text-fuchsia-300 hover:underline transition-colors">Register</Link></p>
                </div>
            </div>

            {/* Illustration Section */}
            <div className="hidden lg:flex w-full lg:w-2/3 bg-gradient-to-br from-slate-800 via-violet-950 to-fuchsia-950 items-center justify-center relative overflow-hidden">
                {/* Background decorative circles */}
                <div className="absolute top-10 right-20 w-72 h-72 bg-violet-600/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 left-10 w-96 h-96 bg-fuchsia-600/10 rounded-full blur-3xl"></div>

                <svg viewBox="0 0 500 400" className="w-[70%] max-w-xl drop-shadow-2xl" xmlns="http://www.w3.org/2000/svg">
                    {/* Background card */}
                    <rect x="80" y="50" width="340" height="300" rx="24" fill="#1e1b4b" opacity="0.6" />
                    <rect x="80" y="50" width="340" height="300" rx="24" stroke="url(#borderGrad)" strokeWidth="1" fill="none" />

                    {/* Profile avatar circle */}
                    <circle cx="250" cy="140" r="45" fill="url(#avatarGrad)" />
                    <circle cx="250" cy="125" r="16" fill="#e2e8f0" />
                    <ellipse cx="250" cy="155" rx="22" ry="14" fill="#e2e8f0" />

                    {/* Input field placeholders */}
                    <rect x="150" y="200" width="200" height="14" rx="7" fill="#334155" />
                    <rect x="150" y="200" width="80" height="14" rx="7" fill="url(#inputGrad)" opacity="0.5" />

                    <rect x="150" y="230" width="200" height="14" rx="7" fill="#334155" />
                    <rect x="150" y="230" width="120" height="14" rx="7" fill="url(#inputGrad)" opacity="0.4" />

                    {/* Button */}
                    <rect x="150" y="268" width="200" height="36" rx="12" fill="url(#btnGrad)" />
                    <text x="250" y="291" textAnchor="middle" fill="white" fontSize="13" fontWeight="600" fontFamily="Montserrat">Sign In</text>

                    {/* Floating elements */}
                    <circle className="login-float" cx="120" cy="90" r="8" fill="#a78bfa" opacity="0.6" />
                    <circle className="login-float" cx="390" cy="120" r="6" fill="#f0abfc" opacity="0.5" />
                    <circle className="login-float" cx="370" cy="320" r="10" fill="#7c3aed" opacity="0.4" />
                    <circle className="login-float" cx="110" cy="280" r="5" fill="#e879f9" opacity="0.5" />

                    {/* Lock icon */}
                    <g transform="translate(430, 60)">
                        <rect x="-12" y="0" width="24" height="18" rx="4" fill="#7c3aed" />
                        <path d="M-6,-2 L-6,-8 A6,6 0 0,1 6,-8 L6,-2" stroke="#a78bfa" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                        <circle cx="0" cy="9" r="2.5" fill="#e2e8f0" />
                    </g>

                    {/* Shield icon */}
                    <g transform="translate(70, 340)">
                        <path d="M0,-15 L12,-8 L12,5 C12,12 0,18 0,18 C0,18 -12,12 -12,5 L-12,-8 Z" fill="#7c3aed" opacity="0.6" />
                        <polyline points="-4,2 -1,6 6,-3" stroke="#e2e8f0" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </g>

                    {/* Gradients */}
                    <defs>
                        <linearGradient id="avatarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#7c3aed" />
                            <stop offset="100%" stopColor="#d946ef" />
                        </linearGradient>
                        <linearGradient id="btnGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#7c3aed" />
                            <stop offset="100%" stopColor="#d946ef" />
                        </linearGradient>
                        <linearGradient id="inputGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#7c3aed" />
                            <stop offset="100%" stopColor="#a78bfa" />
                        </linearGradient>
                        <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.4" />
                            <stop offset="50%" stopColor="#d946ef" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.4" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        </div>
    )
}
