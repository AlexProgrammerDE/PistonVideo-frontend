import React, { ReactNode } from 'react';

export interface StyledTextInputProps {
  help?: boolean;
  state?: 'success' | 'error' | 'disabled';
}

export interface TextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    StyledTextInputProps {
  textClassName?: string;
  titleClassName?: string;
  subtitle?: ReactNode;
  helper?: ReactNode;
}

const TextInput = ({
  className,
  textClassName,
  titleClassName,
  title,
  subtitle,
  disabled,
  type = 'text',
  ...props
}: TextInputProps) => {
  let state = props.state;
  if (disabled) {
    state = 'disabled';
  }

  return (
    <div className={className}>
      {title && <div className={titleClassName}>{title}</div>}
      <input {...props} type={type} className={textClassName} />
      {subtitle && <div className={className}>{subtitle}</div>}
    </div>
  );
};

export default TextInput;
