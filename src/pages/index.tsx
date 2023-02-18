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
        <div className="rounded-sm bg-red-100 p-4 text-3xl font-bold">Openlayers Samples</div>
      </main>
    </>
  );
}
