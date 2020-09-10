import React, { useState } from 'react';
import { Property, Value, Container, Expand } from './style';
import { ReactComponent as ExpandIcon } from '../../images/expand.svg';
import { ReactComponent as CollapseIcon } from '../../images/collapse.svg';

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

const InfoBlock: React.FC<Item> = ({ name, value, hide, grayed }) => {
  return (
    <>
      <Property hide={hide}>{name}</Property>
      <Value hide={hide} grayed={grayed}>
        {value}
      </Value>
    </>
  );
};

const ListHeader: React.FC<Items> = ({ items, hiddenItems }) => {
  const [hide, setHide] = useState(true);

  return (
    <Container>
      {items.map(item => (
        <InfoBlock
          key={item.name}
          name={item.name}
          value={item.value}
          grayed={item.grayed}
        />
      ))}
      {hiddenItems && (
        <>
          {hiddenItems.map(item => (
            <InfoBlock
              hide={hide}
              key={item.name}
              name={item.name}
              value={item.value}
              grayed={item.grayed}
            />
          ))}
          <Expand>
            {hide ? (
              <ExpandIcon onClick={() => setHide(false)} />
            ) : (
              <CollapseIcon onClick={() => setHide(true)} />
            )}
          </Expand>
        </>
      )}
    </Container>
  );
};

export default ListHeader;
