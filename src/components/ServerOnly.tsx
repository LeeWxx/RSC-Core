import React from 'react'

export default function ServerOnly() {
  const nowIso = new Date().toISOString()

  return (
    <div style={{ marginTop: '16px', fontSize: '14px', color: '#555' }}>
      Server Time (ISO): {nowIso}
    </div>
  )
}
