import Header from "@/components/Header";
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

/**
 * Metadatos de la página.
 * 
 * Define el título y la descripción de la página.
 */
export const metadata: Metadata = {
  title: 'Crear aplicación Next',
  description: 'Generado por create next app',
};

type RootLayoutProps = {
  children: React.ReactNode;
};

/**
 * Layout raíz de la aplicación.
 * 
 * Este componente define el layout principal de la aplicación, incluyendo la estructura HTML básica,
 * la cabecera y el contenido principal.
 * 
 * @param {RootLayoutProps} props - Las propiedades del componente.
 * @param {React.ReactNode} props.children - Los componentes hijos que se renderizarán dentro del layout.
 * @returns {JSX.Element} - El layout principal de la aplicación.
 */
export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Header />
        <main className="p-8">
          {children}
        </main>
      </body>
    </html>
  );
}
