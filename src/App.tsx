import React from 'react'
import ServerOnly from './components/ServerOnly'
import ClientButton from '../server/components/ClientButton'
import AnotherClient from '../server/components/AnotherClient'

export default function App() {
  return (
    <div style={{ padding: '24px', fontFamily: 'sans-serif' }}>
      <h1>RSC Demo Without Next.js</h1>

      <ServerOnly />

      <div style={{ marginTop: '24px' }}>
        <ClientButton clientId="ClientButton.tsx" />
        <AnotherClient clientId="AnotherClient.tsx" />
      </div>
    </div>
  )
}
