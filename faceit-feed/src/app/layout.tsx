import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { ToastContainer } from 'react-toastify';
import StoreProvider from './storeProvider';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'FACEIT Feed App',
  description: 'Feed App',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>{children}</StoreProvider>
        <ToastContainer limit={1} />
      </body>
    </html>
  );
}
