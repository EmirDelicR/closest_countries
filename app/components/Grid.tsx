'use client';
import { ActionIcon, Box, Flex, Group, Text } from '@mantine/core';
import { CSSProperties, PropsWithChildren, ReactNode, useState } from 'react';

import classes from './Grid.module.scss';
import IpWidget from './IpWidget';
import CountryWidget from './CountryWidget';

type Item = {
  active: boolean;
  template: string;
  gridArea: string;
  data: ReactNode;
};

const ITEM_DATA: Item[] = [
  {
    active: false,
    template: "'a a b' 'a a c'",
    gridArea: 'a',
    data: <Box>Show loaded data</Box>,
  },
  {
    active: false,
    template: "'a b b' 'c b b'",
    gridArea: 'b',
    data: <Box>Show items</Box>,
  },
  {
    active: false,
    template: "'b c c' 'a c c'",
    gridArea: 'c',
    data: <Box>Empty slot</Box>,
  },
];

export default function MyGrid() {
  const [gridTemplate, setGridTemplate] = useState("'a b c'");
  const [gridItemData, setGridItemData] = useState(ITEM_DATA);

  const setGrid = (template: string) => {
    const clickedItemIndex = gridItemData.findIndex((item) => item.template === template);

    if (gridItemData[clickedItemIndex].active) {
      const data = [...gridItemData];
      data[clickedItemIndex].active = false;
      setGridItemData(data);

      setTimeout(() => {
        setGridTemplate("'a b c'");
      }, 450);
      return;
    }

    const data = gridItemData.map((item) => ({ ...item, active: false }));
    data[clickedItemIndex].active = true;
    setGridItemData(data);
    setGridTemplate(template);
  };

  return (
    <div className={classes.grid} style={{ '--grid-area': `${gridTemplate}` } as CSSProperties}>
      {gridItemData.map((item) => (
        <div className={classes.item} style={{ gridArea: item.gridArea }} key={item.template}>
          <InnerElement setGrid={setGrid} item={item} />
        </div>
      ))}
    </div>
  );
}

interface InnerElementProps {
  setGrid: (template: string) => void;
  item: Item;
}

function InnerElement({ setGrid, item }: InnerElementProps) {
  const onClickHandler = () => {
    setGrid(item.template);
  };

  return (
    <Box className={`${classes.inner} ${item.active ? classes.active : ''}`}>
      <Flex justify="space-between" p="md" className={classes.nav}>
        <Text>Name: {item.template}</Text>
        <ActionIcon className={classes.action} onClick={onClickHandler}>
          #
        </ActionIcon>
      </Flex>
      <Box p="md" className={classes.content}>
        {item.data}
      </Box>
    </Box>
  );
}
