import React from 'react'

interface AnotherClientProps {
  clientId: string
}

export default function AnotherClient({ clientId }: AnotherClientProps) {
  return (
    <div data-client-component={clientId} data-rsc-placeholder="true">
      <p style={{ padding: '8px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
        클라이언트 컴포넌트 로딩 중...
      </p>
    </div>
  )
}
