export default function StudioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="fixed inset-0 h-[100dvh] overflow-hidden">
      {children}
    </div>
  );
}
