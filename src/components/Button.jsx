
export default function Button({ children, className = "", ...props }) {
  return (
    <button className={`bg-violet-600 text-white py-2.5 px-5 rounded-xl font-semibold font-montserrat tracking-wide hover:bg-violet-700 transition-all duration-300 shadow-lg shadow-violet-500/30 cursor-pointer ${className}`} {...props}>
      {children}
    </button>
  )
}
