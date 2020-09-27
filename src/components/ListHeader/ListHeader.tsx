import React, { useState } from 'react';
import { Items, ListHeaderBlock } from '../ListHeaderBlock/ListHeaderBlock';
import * as Styled from './style';
import { ReactComponent as ExpandIcon } from '../../images/chevron-down-solid_modified.svg';
import { ReactComponent as CollapseIcon } from '../../images/chevron-up-solid_modified.svg';

const ListHeader: React.FC<Items> = ({ items, hiddenItems }) => {
  const [hide, setHide] = useState(true);

  return (
    <Styled.Container>
      {items.map(item => (
        <ListHeaderBlock
          key={item.name}
          name={item.name}
          value={item.value}
          grayed={item.grayed}
        />
      ))}
      {hiddenItems && (
        <>
          {hiddenItems.map(item => (
            <ListHeaderBlock
              hide={hide}
              key={item.name}
              name={item.name}
              value={item.value}
              grayed={item.grayed}
            />
          ))}
          <Styled.Expand>
            {hide ? (
              <ExpandIcon onClick={() => setHide(false)} />
            ) : (
              <CollapseIcon onClick={() => setHide(true)} />
            )}
          </Styled.Expand>
        </>
      )}
    </Styled.Container>
  );
};

export default ListHeader;
