import { Link } from "react-router-dom"
import { useEffect } from "react"
import gsap from "gsap"
import Button from "../components/Button"
import Input from "../components/Input"
import Label from "../components/Label"

export default function Register() {

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

  return (
    <div className="flex flex-col lg:flex-row h-screen w-full">
      {/* Form Section */}
      <div className="w-full lg:w-1/3 flex-1 lg:flex-none flex flex-col justify-center px-6 sm:px-10 py-10 lg:py-0 bg-slate-900 shadow-2xl z-10">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-white font-montserrat">Create Account</h1>
        <p className="text-slate-400 mb-8 font-montserrat text-sm">Join us and get started</p>
        <form className="flex flex-col gap-4 sm:gap-5">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-3">
            <div className="flex-1">
              <Label htmlFor="firstName">First Name</Label>
              <Input type="text" id="firstName" placeholder="John" />
            </div>
            <div className="flex-1">
              <Label htmlFor="lastName">Last Name</Label>
              <Input type="text" id="lastName" placeholder="Doe" />
            </div>
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="you@example.com" />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password" placeholder="••••••••" />
          </div>
          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input type="password" id="confirmPassword" placeholder="••••••••" />
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
