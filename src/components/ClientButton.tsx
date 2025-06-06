'use client'

import React, { useState } from 'react'

export default function ClientButton() {
  const [count, setCount] = useState(0)

  return (
    <button
      style={{
        padding: '8px 16px',
        backgroundColor: '#0070f3',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
      }}
      onClick={() => setCount((c) => c + 1)}
    >
      Clicked: {count}
    </button>
  )
}
