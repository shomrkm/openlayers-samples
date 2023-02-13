import Head from 'next/head';
import { Inter } from '@next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Openlayers Samples</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="text-3xl font bold bg-red-100 p-4 round-sm">Openlayers Samples</div>
      </main>
    </>
  );
}
