import Head from 'next/head';
import Navbar from './Navbar';

export default function Layout({ children, title = '' }) {
  return (
    <>
      <Head>
        <title>{title ? `${title} | Color Database` : 'Color Database'}</title>
        <meta name="description" content="Color database management system" />
      </Head>
      
      <div className="layout">
        <Navbar />
        <main>{children}</main>
      </div>
    </>
  );
}