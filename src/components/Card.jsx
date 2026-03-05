export default function Card({ children, className = "" }) {
  return (
    <div className={`bg-slate-800/50 border border-slate-700 rounded-xl p-4 ${className}`}>
      {children}
    </div>
  )
}
