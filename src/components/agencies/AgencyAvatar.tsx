"use client"

import { useState } from "react"

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

  const [broken, setBroken] = useState(false)

  if (logoUrl && !broken) {
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
          onError={() => setBroken(true)}
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
