import React from 'react';
import * as Styled from './style';

interface Item {
  name: string;
  value: string | undefined | null;
  hide?: boolean;
  grayed?: boolean;
}

export interface Items {
  items: Item[];
  hiddenItems?: Item[];
}
export const ListHeaderBlock: React.FC<Item> = ({
  name,
  value,
  hide,
  grayed,
}) => {
  return (
    <>
      <Styled.Property hide={hide}>{name}</Styled.Property>
      <Styled.Value hide={hide} grayed={grayed}>
        {value}
      </Styled.Value>
    </>
  );
};
