import { Box } from '@mui/system';
import { CSVLink } from 'react-csv';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import {
  Button,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';

interface NumberListProps {
  numsList: number[];
  method: string
}

const NumberList = (props: NumberListProps) => {
  const rowHeight = 30;

  const singleRow = (rowProps: ListChildComponentProps) => {
    const { index, style } = rowProps;

    return (
      <ListItem style={style} key={index} component='div' disablePadding>
        <ListItemButton
          style={{ height: `${rowHeight}px` }}
          onClick={() => {
            navigator.clipboard.writeText(String(props.numsList[index]));
          }}
        >
          <ListItemText primary={props.numsList[index]} />
        </ListItemButton>
      </ListItem>
    );
  };

  return (
    <div className="numberListDiv">
      <Box className="numberListBox">
        <FixedSizeList
          height={Math.min(300, props.numsList.length * 30)}
          width='100%'
          itemSize={rowHeight}
          itemCount={props.numsList.length}
          overscanCount={10}
        >
          {singleRow}
        </FixedSizeList>
      </Box>

      <CSVLink
        data={[[props.method], ...props.numsList.map((random) => [random])]}
        filename='randoms.csv'
        style={{ textDecoration: 'none' }}
      >
        <Button variant='outlined' fullWidth>
          Exportar a CSV
        </Button>
      </CSVLink>
    </div>
  );
};

export default NumberList;
