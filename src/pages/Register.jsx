import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import gsap from "gsap"
import Button from "../components/Button"
import Card from "../components/Card"
import Input from "../components/Input"
import Label from "../components/Label"

export default function Register() {
    const { register, handleSubmit, watch, setError, formState: { errors, touchedFields } } = useForm({ mode: "onChange" })
    const navigate = useNavigate()

    const password = watch("password", "")
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    const passwordRules = [
        { label: "At least 8 characters", test: (v) => v.length >= 8 },
        { label: "One uppercase letter", test: (v) => /[A-Z]/.test(v) },
        { label: "One number", test: (v) => /[0-9]/.test(v) },
        { label: "One special character (!@#$%^&*...)", test: (v) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/.test(v) },
    ]

    const onSubmit = (data) => {
        const users = JSON.parse(localStorage.getItem("users")) || []

        const existingUser = users.find((u) => u.email === data.email)
        if (existingUser) {
            setError("email", { type: "manual", message: "Email is already registered" })
            toast.error("Email is already registered")
            return
        }

        const { confirmPassword, ...userData } = data
        users.push({
            id: Date.now(),
            ...userData,
        })

        localStorage.setItem("users", JSON.stringify(users))
        toast.success("Registration successful! Please login.")
        navigate("/")
    }

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Floating circles continuous animation
            gsap.to(".register-float", {
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

    const errorInput = "!border-red-500 focus:!ring-red-500/30"

    return (
        <div className="flex flex-col lg:flex-row h-screen w-full overflow-hidden">
            {/* Form Section */}
            <div className="w-full lg:w-1/3 flex-1 lg:flex-none flex flex-col justify-start px-6 sm:px-10 py-10 bg-slate-900 shadow-2xl z-10 overflow-y-auto">
                <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-white font-montserrat">Create Account</h1>
                <p className="text-slate-400 mb-8 font-montserrat text-sm">Join us and get started</p>
                <form className="flex flex-col gap-4 sm:gap-5" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-3">
                        <div className="flex-1">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input type="text" id="firstName" placeholder="John"
                                className={errors.firstName ? errorInput : ""}
                                {...register("firstName", { required: "First name is required" })} />
                            {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName.message}</p>}
                        </div>
                        <div className="flex-1">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input type="text" id="lastName" placeholder="Doe"
                                className={errors.lastName ? errorInput : ""}
                                {...register("lastName", { required: "Last name is required" })} />
                            {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName.message}</p>}
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input type="email" id="email" placeholder="you@example.com"
                            className={errors.email ? errorInput : ""}
                            {...register("email", {
                                required: "Email is required",
                                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email" },
                            })} />
                        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                    <div>
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                            <Input type={showPassword ? "text" : "password"} id="password" placeholder="••••••••"
                                className={`pr-10 ${errors.password ? errorInput : ""}`}
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 8, message: "At least 8 characters" },
                                    validate: {
                                        hasUpper: (v) => /[A-Z]/.test(v) || "Must contain an uppercase letter",                                    hasNumber: (v) => /[0-9]/.test(v) || "Must contain a number",                                        hasSpecial: (v) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/.test(v) || "Must contain a special character",
                                    },
                                })} />
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
                        {/* Live password checklist */}
                        <Card className="mt-2">
                            <ul className="space-y-1">
                                {passwordRules.map((rule, i) => {
                                    const passed = password.length > 0 && rule.test(password)
                                    return (
                                        <li key={i} className={`flex items-center gap-2 text-xs transition-colors ${passed ? "text-emerald-400" : "text-slate-500"}`}>
                                            {passed ? (
                                                <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                            ) : (
                                                <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                    <circle cx="12" cy="12" r="9" />
                                                </svg>
                                            )}
                                            {rule.label}
                                        </li>
                                    )
                                })}
                            </ul>
                        </Card>
                    </div>
                    <div>
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <div className="relative">
                            <Input type={showConfirm ? "text" : "password"} id="confirmPassword" placeholder="••••••••"
                                className={`pr-10 ${errors.confirmPassword ? errorInput : ""}`}
                                {...register("confirmPassword", {
                                    required: "Please confirm your password",
                                    validate: (v) => v === password || "Passwords do not match",
                                })} />
                            <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors">
                                {showConfirm ? (
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
                        {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword.message}</p>}
                    </div>
                    <Button type="submit">Sign Up</Button>
                </form>
                <div className="mt-6 text-center">
                    <p className="text-slate-400 text-sm font-montserrat">Already have an account? <Link to="/" className="text-fuchsia-400 font-semibold hover:text-fuchsia-300 hover:underline transition-colors">Login</Link></p>
                </div>
            </div>

            {/* Illustration Section */}
            <div className="hidden lg:flex w-full lg:w-2/3 bg-gradient-to-br from-slate-800 via-violet-950 to-fuchsia-950 items-center justify-center relative overflow-hidden">
                {/* Background decorative circles */}
                <div className="absolute top-20 left-20 w-80 h-80 bg-fuchsia-600/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-72 h-72 bg-violet-600/10 rounded-full blur-3xl"></div>

                <svg viewBox="0 0 500 400" className="w-[70%] max-w-xl drop-shadow-2xl" xmlns="http://www.w3.org/2000/svg">
                    {/* Background card */}
                    <rect x="80" y="40" width="340" height="320" rx="24" fill="#1e1b4b" opacity="0.6" />
                    <rect x="80" y="40" width="340" height="320" rx="24" stroke="url(#borderGradR)" strokeWidth="1" fill="none" />

                    {/* Person with plus icon */}
                    <circle cx="230" cy="120" r="35" fill="url(#avatarGradR)" />
                    <circle cx="230" cy="108" r="13" fill="#e2e8f0" />
                    <ellipse cx="230" cy="133" rx="18" ry="11" fill="#e2e8f0" />

                    {/* Plus badge */}
                    <circle cx="268" cy="100" r="14" fill="#10b981" />
                    <line x1="268" y1="94" x2="268" y2="106" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="262" y1="100" x2="274" y2="100" stroke="white" strokeWidth="2.5" strokeLinecap="round" />

                    {/* Input field placeholders */}
                    <rect x="140" y="180" width="220" height="14" rx="7" fill="#334155" />
                    <rect x="140" y="180" width="100" height="14" rx="7" fill="url(#inputGradR)" opacity="0.5" />

                    <rect x="140" y="210" width="220" height="14" rx="7" fill="#334155" />
                    <rect x="140" y="210" width="140" height="14" rx="7" fill="url(#inputGradR)" opacity="0.4" />

                    <rect x="140" y="240" width="220" height="14" rx="7" fill="#334155" />
                    <rect x="140" y="240" width="60" height="14" rx="7" fill="url(#inputGradR)" opacity="0.35" />

                    {/* Button */}
                    <rect x="140" y="275" width="220" height="36" rx="12" fill="url(#btnGradR)" />
                    <text x="250" y="298" textAnchor="middle" fill="white" fontSize="13" fontWeight="600" fontFamily="Montserrat">Sign Up</text>

                    {/* Floating elements */}
                    <circle className="register-float" cx="100" cy="80" r="6" fill="#a78bfa" opacity="0.6" />
                    <circle className="register-float" cx="400" cy="100" r="9" fill="#f0abfc" opacity="0.4" />
                    <circle className="register-float" cx="380" cy="330" r="7" fill="#7c3aed" opacity="0.5" />
                    <circle className="register-float" cx="100" cy="310" r="8" fill="#e879f9" opacity="0.4" />

                    {/* Star icon */}
                    <g transform="translate(420, 55)">
                        <polygon points="0,-14 4,-5 14,-5 6,2 9,12 0,6 -9,12 -6,2 -14,-5 -4,-5" fill="#fbbf24" opacity="0.7" />
                    </g>

                    {/* Checkmark badge */}
                    <g transform="translate(85, 350)">
                        <circle r="12" fill="#7c3aed" opacity="0.6" />
                        <polyline points="-5,1 -1,5 6,-4" stroke="#e2e8f0" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </g>

                    {/* Gradients */}
                    <defs>
                        <linearGradient id="avatarGradR" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#7c3aed" />
                            <stop offset="100%" stopColor="#d946ef" />
                        </linearGradient>
                        <linearGradient id="btnGradR" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#7c3aed" />
                            <stop offset="100%" stopColor="#d946ef" />
                        </linearGradient>
                        <linearGradient id="inputGradR" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#7c3aed" />
                            <stop offset="100%" stopColor="#a78bfa" />
                        </linearGradient>
                        <linearGradient id="borderGradR" x1="0%" y1="0%" x2="100%" y2="100%">
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
