import './globals.css';

export const metadata = {
  title: 'Tournament Playz',
  description: 'Manage your esport tournaments easily',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-900 text-white antialiased">
        {children}
      </body>
    </html>
  );
}
