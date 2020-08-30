import React from 'react';
import { Property, Value, Container } from './style';

interface Item {
  name: string;
  value: string | undefined | null;
}

export interface Items {
  items: Item[];
}

const InfoBlock: React.FC<Item> = ({ name, value }) => {
  return (
    <>
      <Property>{name}</Property>
      <Value>{value}</Value>
    </>
  );
};

const ListHeader: React.FC<Items> = ({ items }) => {
  return (
    <Container>
      {items.map((item) => (
        <InfoBlock key={item.name} name={item.name} value={item.value} />
      ))}
    </Container>
  );
};

export default ListHeader;
