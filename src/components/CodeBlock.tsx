import React, { FC } from 'react';
import 'prismjs';
import 'prismjs/components/prism-typescript';
// import 'prismjs/themes/prism-darcula.css';


type Props = {
  code: string;
  language?: string;
}

export const CodeBlock: FC<Props> = ({code, language = 'typescript'}: Props) => {
  return (
    <pre>
      {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
      <code className={`language-${language} prose`}>
        {code}
      </code>
    </pre>
  );
};