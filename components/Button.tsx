import React, { ReactElement } from 'react';

interface Props {
  text: string;
  fontSize: string;
  color: string;
  fontWeight: string;
  variant: 'medium' | 'large' | 'small';
}

export default function Button({
  variant = 'medium',
  text = 'Button',
  color = 'white',
  fontSize = '15px',
}: Props | any): ReactElement {
  let paddingX = '16px';

  if (variant === 'large') {
    paddingX = '32px';
  } else if (variant === 'small') {
    paddingX = '8px';
  }

  return (
    <div
      className={`flex items-center justify-center px-[16px] px-[${paddingX}]`}
    >
      <span className={`text-[${fontSize}] text-white font-bold`}>{text}</span>
    </div>
  );
}
