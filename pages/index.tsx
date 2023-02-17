import React from 'react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className={"h-screen text-2xl bg-green-200 text-center pt-20"}>
      <Link href="/plants">
        floradex
      </Link>
    </div>
  )
}
