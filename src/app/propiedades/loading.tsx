export default function LoadingSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="h-6 w-48 bg-slate-200 rounded-lg animate-pulse mb-8" />
      <div className="h-10 w-72 bg-slate-200 rounded-lg animate-pulse mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-md">
            <div className="h-56 bg-slate-200 animate-pulse" />
            <div className="p-5 space-y-3">
              <div className="h-4 w-16 bg-slate-200 rounded animate-pulse" />
              <div className="h-8 w-32 bg-slate-200 rounded animate-pulse" />
              <div className="h-5 w-full bg-slate-200 rounded animate-pulse" />
              <div className="flex gap-4">
                <div className="h-4 w-16 bg-slate-200 rounded animate-pulse" />
                <div className="h-4 w-16 bg-slate-200 rounded animate-pulse" />
                <div className="h-4 w-16 bg-slate-200 rounded animate-pulse" />
              </div>
              <div className="pt-4">
                <div className="h-px bg-slate-100 mb-4" />
                <div className="h-4 w-40 bg-slate-200 rounded animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
