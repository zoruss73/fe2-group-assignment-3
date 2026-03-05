import { forwardRef } from "react"

const Input = forwardRef(({ className = "", ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`w-full border border-slate-600 bg-slate-800/50 text-slate-100 placeholder-slate-400 p-3 rounded-xl font-poppins text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200 ${className}`}
      {...props}
    />
  )
})

Input.displayName = "Input"
export default Input
