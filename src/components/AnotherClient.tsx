'use client'

import React, { useEffect, useState } from 'react'

export default function AnotherClient() {
  const [now, setNow] = useState<string>('')

  useEffect(() => {
    const id = setInterval(() => {
      setNow(new Date().toLocaleTimeString())
    }, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{ marginTop: '12px', fontSize: '14px' }}>
      Client Clock: {now || 'Loading...'}
    </div>
  )
}
