import React from 'react';
import useStyles from './NotesList.style';
import { Button } from '@mui/material';
import moment from 'moment';
import { StudyNote } from 'entities/StudyNote';
import { FixedSizeList, FixedSizeListProps, ListChildComponentProps } from 'react-window';

interface NotesListProps {
  notes: StudyNote[];
  height: number;
  onNoteSelect: (date: Date) => void;
}

const NotesList: React.FC<NotesListProps> = ({ notes, height, onNoteSelect }) => {
  const { classes } = useStyles();

  const rowRenderer = ({ index }: ListChildComponentProps) => {
    if (!notes?.length) return <div key={index}>empty</div>;

    return (
      <Button
        key={index}
        onClick={() => onNoteSelect(moment(notes[index].date).toDate())}
        disableElevation
        disableRipple
        className={classes.noteItem}
      >
        {notes[index].title.length < 26
          ? notes[index].title
          : notes[index].title.substring(0, 26) + '...'}{' '}
        ({moment(notes[index].date).format('DD.MM.YYYY')})
      </Button>
    );
  };

  const listProps: FixedSizeListProps = {
    itemCount: notes?.length ? notes.length : 0,
    itemSize: 48,
    width: 391,
    height,
    overscanCount: 0,
    children: rowRenderer,
    className: classes.list,
  };

  return <FixedSizeList {...listProps} />;
};

export default NotesList;
