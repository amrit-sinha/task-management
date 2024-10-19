import "./globals.css";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Task Management</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
