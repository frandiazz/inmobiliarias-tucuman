import Image from "next/image"

interface AgencyAvatarProps {
  name: string
  logoUrl?: string | null
  size?: number
  className?: string
}

export default function AgencyAvatar({ name, logoUrl, size = 80, className = "" }: AgencyAvatarProps) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()

  if (logoUrl) {
    return (
      <div
        className={`relative overflow-hidden rounded-full bg-teal-100 ${className}`}
        style={{ width: size, height: size }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoUrl}
          alt={`Logo de ${name}`}
          className="w-full h-full object-cover"
          onError={(e) => {
            const el = e.currentTarget
            el.style.display = "none"
            const parent = el.parentElement
            if (parent && !parent.querySelector("span")) {
              const span = document.createElement("span")
              span.className = "absolute inset-0 flex items-center justify-center text-2xl font-bold text-teal-800"
              span.textContent = initials
              parent.appendChild(span)
            }
          }}
        />
      </div>
    )
  }

  return (
    <div
      className={`flex items-center justify-center rounded-full bg-teal-100 ${className}`}
      style={{ width: size, height: size }}
    >
      <span className="text-2xl font-bold text-teal-800">{initials}</span>
    </div>
  )
}
