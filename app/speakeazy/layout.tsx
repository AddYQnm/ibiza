// app/speakeazy/layout.tsx
export default function SpeakeazyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="bg-black text-[#F6F4FA] antialiased">
        {children}
      </body>
    </html>
  );
}
