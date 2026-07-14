"use client"

import { useCompare } from "@/utils/compare"

interface CompareCheckboxProps {
  propertyId: number
}

export default function CompareCheckbox({ propertyId }: CompareCheckboxProps) {
  const { toggle, isSelected, canSelect } = useCompare()
  const selected = isSelected(propertyId)

  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggle(propertyId)
      }}
      className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${
        selected ? "text-teal-700" : "text-slate-400 hover:text-slate-600"
      } ${!canSelect && !selected ? "opacity-40" : ""}`}
      disabled={!canSelect && !selected}
      title="Comparar propiedad"
    >
      <span
        className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
          selected
            ? "bg-teal-700 border-teal-700"
            : "border-slate-300"
        }`}
      >
        {selected && (
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </span>
      Comparar
    </button>
  )
}
