"use client"

"use client"

import { useToast } from "@/components/ui/ToastProvider"

interface ShareButtonsProps {
  shareUrl: string
  shareText: string
}

export default function ShareButtons({ shareUrl, shareText }: ShareButtonsProps) {
  const { toast } = useToast()

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <a
        href={`https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-pill flex items-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="currentColor">
          <path d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z" />
        </svg>
        Compartir
      </a>
      <button
        onClick={() => {
          navigator.clipboard.writeText(shareUrl)
          toast("Enlace copiado al portapapeles", "success")
        }}
        className="btn-pill"
      >
        Copiar enlace
      </button>
    </div>
  )
}
