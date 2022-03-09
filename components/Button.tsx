import React, { ReactElement } from 'react';
import { classNames } from '../utils';

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
  let paddingX = { padding: '16px 0' };

  if (variant === 'large') {
    paddingX = { padding: '32px 0' };
  } else if (variant === 'small') {
    paddingX = { padding: '8px 0' };
  }

  return (
    <div
      className={classNames(`flex items-center justify-center px-[16px] `)}
      style={paddingX}
    >
      <span className={`text-white font-bold`} style={{ fontSize: fontSize }}>
        {text}
      </span>
    </div>
  );
}
