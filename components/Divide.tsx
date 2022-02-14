import React, { ReactElement } from 'react';
import { classNames } from '../utils';

interface Props {
  className?: string;
}

export default function Divide({ className }: Props): ReactElement {
  return (
    <div className={classNames('w-full h-px my-1 bg-divide', className)}></div>
  );
}
