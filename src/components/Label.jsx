export default function Label({ children, ...props }) {
  return (
    <label className="block text-sm font-semibold text-slate-300 mb-2 font-montserrat tracking-wide" {...props}>
      {children}
    </label>
  )
}
