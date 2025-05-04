import Layout from '../components/common/layout';
import Link from 'next/link';

export default function Home() {
  return (
    <Layout title="Home">
      <h1>Welcome to Color Database</h1>
      <p>Manage your color codes and fundamental colors with ease.</p>
      
      <div className="links">
        <Link href="/color-codes" className="btn-primary">
          View Color Codes
        </Link>
        <Link href="/fundamental-colors" className="btn-primary">
          View Fundamental Colors
        </Link>
      </div>
    </Layout>
  );
}