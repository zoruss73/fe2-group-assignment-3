
export default function Button({ children, ...props }) {
  return (
    <button className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white py-2.5 rounded-xl font-semibold font-montserrat tracking-wide hover:from-violet-700 hover:to-fuchsia-600 transition-all duration-300 shadow-lg shadow-violet-500/30 cursor-pointer" {...props}>
      {children}
    </button>
  )
}
