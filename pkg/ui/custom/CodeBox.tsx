import React from 'react';

export interface CodeBoxProps extends React.HTMLAttributes<HTMLPreElement> {
  code: string;
}

const CodeBox = ({ children, code, ...props }: CodeBoxProps) => (
  <pre {...props}>
    <code dangerouslySetInnerHTML={{ __html: code }} />
  </pre>
);

export default CodeBox;
