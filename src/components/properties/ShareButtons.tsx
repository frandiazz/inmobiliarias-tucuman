"use client"

import { useState } from "react"
import { Share2, Check } from "lucide-react"

interface ShareButtonsProps {
  shareUrl: string
  shareText: string
}

export default function ShareButtons({ shareUrl, shareText }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  return (
    <div className="flex items-center gap-3">
      <a
        href={`https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-sm text-slate-600 hover:bg-gray-50 transition-colors"
      >
        <Share2 className="w-4 h-4" />
        Compartir
      </a>
      <button
        onClick={() => {
          navigator.clipboard.writeText(shareUrl)
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        }}
        className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-sm text-slate-600 hover:bg-gray-50 transition-colors"
      >
        <Check className="w-4 h-4" />
        {copied ? "Copiado" : "Copiar enlace"}
      </button>
    </div>
  )
}
