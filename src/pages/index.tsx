import Head from 'next/head';
import { Card, CardProps } from '@/components/Card';

const pages: CardProps[] = [
  {
    title: 'Render Basemap (OSM)',
    description: 'Show a background map view like Open Street View.',
    link: '/samples/DisplayBasemap',
  },
  {
    title: 'Draw Shapes',
    description: 'Drawing a shape on the basemap.',
    link: '/samples/DrawShape',
  },
  {
    title: 'Modify Shapes',
    description: 'Modify a shape on the basemap.',
    link: '/samples/ModifyShape',
  },
  {
    title: 'Draw Circle Type Shapes',
    description: 'Drawing a circle type shape on the basemap.',
    link: '/samples/DrawCircleTypeShape',
  },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>Openlayers Examples with React + TypeScript</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="m-2 h-screen w-screen flex-col bg-gray-100">
        <div className="p-4 text-3xl font-bold text-gray-600">Openlayers Examples with React + TypeScript</div>
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
