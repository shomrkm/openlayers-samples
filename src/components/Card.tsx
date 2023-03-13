import Link from 'next/link';

export type CardProps = {
  title: string;
  description: string;
  link: string;
};

export const Card = ({ title, description, link }: CardProps) => {
  return (
    <Link href={link}>
      <div className="h-32 w-80 flex-col items-center justify-center overflow-hidden rounded-md border border-solid border-gray-200 bg-white p-2 shadow-sm hover:bg-gray-200 hover:shadow-lg">
        <div className="text-lg font-bold text-gray-600">{title}</div>
        <div className="text-sm text-gray-500">{description}</div>
      </div>
    </Link>
  );
};
