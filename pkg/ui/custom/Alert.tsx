import React from 'react';

export interface AlertStyles {
  severity?: 'error' | 'info';
}

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    AlertStyles {}

const Alert = ({ severity, ...props }: AlertProps) => <div {...props} />;

export default Alert;
