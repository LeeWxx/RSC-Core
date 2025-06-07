import { createRoot } from 'react-dom/client'
import { createFromFetch } from 'react-server-dom-webpack/client'
import React from 'react'
import clientManifest from '../dist/client-manifest.json'
import ClientButton from '../src/components/ClientButton'
import AnotherClient from '../src/components/AnotherClient'

const ClientComponents: Record<string, React.ComponentType<any>> = {
  'ClientButton.tsx': ClientButton,
  'AnotherClient.tsx': AnotherClient
};

let idCounter = 0;

function wrapServerElement(element: React.ReactNode): React.ReactNode {
  if (!React.isValidElement(element)) {
    return element;
  }

  const props = element.props as Record<string, any>;

  if (
    element.type === 'div' && 
    props['data-client-component'] && 
    props['data-rsc-placeholder'] === 'true'
  ) {
    const clientId = props['data-client-component'];
    
    if (ClientComponents[clientId]) {
      const ClientComp = ClientComponents[clientId];
      return <ClientComp key={`client-${idCounter++}`} clientId={clientId} />;
    }
  }
  
  if (props.clientId && ClientComponents[props.clientId]) { 
    const ClientComp = ClientComponents[props.clientId];
    return <ClientComp key={`client-${idCounter++}`} {...props} />;
  }

  if (props.children) {
    if (Array.isArray(props.children)) {
      const newChildren = props.children.map((child: React.ReactNode) => 
        wrapServerElement(child)
      );
      
      return React.cloneElement(element, {
        ...props,
        key: props.key || `element-${idCounter++}`,
        children: newChildren
      } as any);
    }
    
    const newChild = wrapServerElement(props.children);
    
    return React.cloneElement(element, {
      ...props,
      key: props.key || `element-${idCounter++}`,
      children: newChild
    } as any);
  }

  return element;
}

async function checkDynamicImport() {
  try {
    await import('react-server-dom-webpack/client');
  } catch (err) {
    console.error('dynamic import 실패:', err);
  }
}

async function main() {
  await checkDynamicImport();

  const responsePromise = fetch('/rsc');
  
  let streamElement = await createFromFetch(responsePromise, {
    clientModuleMap: clientManifest
  });
  
  streamElement = wrapServerElement(streamElement);
  
  const container = document.getElementById('root')
  if (!container) return
  const root = createRoot(container)
  root.render(streamElement)
}

main().catch((err) => console.error(err))