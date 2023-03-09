import Head from 'next/head';
import { Card, CardProps } from '@/components/Card';

const pages: CardProps[] = [
  {
    title: 'Show a Basemap',
    description: 'Show a background map view like Open Street View.',
    link: '/samples/DisplayBasemap',
  },
  {
    title: 'Draw Shape',
    description: 'Drawing a shape on the basemap.',
    link: '/samples/DrawShape',
  },
  {
    title: 'Modify Shape',
    description: 'Modify a shape on the basemap.',
    link: '/samples/ModifyShape',
  },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>Openlayers Samples with React</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="m-2 h-screen w-screen flex-col bg-gray-100">
        <div className="p-4 text-3xl font-bold text-gray-600">Openlayers Samples</div>
        <div className="m-2 flex flex-wrap justify-start gap-2">
          {pages.map((page) => (
            <Card
              key={page.title}
              title={page.title}
              description={page.description}
              link={page.link}
            />
          ))}
        </div>
      </div>
    </>
  );
}
