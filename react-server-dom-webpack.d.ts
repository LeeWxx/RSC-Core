declare module 'react-server-dom-webpack/client' {
  export function createFromFetch(response: Response): Promise<React.ReactNode>;
} 