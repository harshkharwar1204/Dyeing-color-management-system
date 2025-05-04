import Link from 'next/link';

export default function Navbar() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/color-codes">Color Codes</Link>
      <Link href="/fundamental-colors">Fundamental Colors</Link>
    </nav>
  );
}