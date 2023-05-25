import React from 'react';
import SubjectCard, { SubjectCardProps } from 'components/ui/SubjectCard';
import { StudyCardsSubject } from 'entities/Subject';
import useStyles from './SubjectCardWithLabel.styles';

interface Props extends SubjectCardProps {
  labelCount: number;
  isActive: boolean;
  subject: StudyCardsSubject;
}

const SubjectCardWithLabel = (props: Props) => {
  const { subject, labelCount, onChoose, isActive } = props;
  const { classes } = useStyles();

  return (
    <div className={classes.subjectWrapper}>
      <div
        className={`${
          isActive ? `${classes.countLabel} ${classes.activeLabel}` : classes.countLabel
        }`}
      >
        {labelCount}
      </div>
      <SubjectCard
        subject={subject}
        onChoose={onChoose}
        isActive={isActive}
        cardStyles={classes.subjectCard}
      />
    </div>
  );
};

export default SubjectCardWithLabel;
