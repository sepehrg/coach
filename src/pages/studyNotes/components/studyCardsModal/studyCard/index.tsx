import React, { useState } from 'react';
import useStyles from './StudyCard.style';
import { IconButton } from '@mui/material';
import { withTranslation, WithTranslation } from 'react-i18next';
import MathTextArea from 'components/ui/MathTextArea';
import { Calculator, Fingerprint } from 'assets/images/icons';
import { StudyCard as StudyCardEntity } from 'entities/StudyCard';
import DrawingCanvas from '../../drawingCanvas';

interface StudyCardProps {
  type: 'question' | 'answer';
  value: Partial<StudyCardEntity>;
  onValueChange: (value: Partial<StudyCardEntity>) => void;
  currentCard: number;
}

const StudyCard: React.FC<StudyCardProps & WithTranslation> = ({
  t,
  type,
  value,
  onValueChange,
  currentCard,
}) => {
  const { classes } = useStyles();

  const [showMathPanel, toggleMathPanel] = useState('');
  const [showCanvas, setShowCanvas] = useState(false);

  return (
    <>
      {showCanvas ? (
        <DrawingCanvas value={value} onValueChange={onValueChange} canvasId={type} />
      ) : (
        <MathTextArea
          currentCard={currentCard}
          content={value[type] || ''}
          placeholder={t(`Study Cards.Create.Write ${type}`)}
          onContentChange={(content) => onValueChange({ ...value, [type]: content })}
          showMathPanel={showMathPanel === type}
        />
      )}
      {!(showCanvas || value[`${type}IsDrawing` as keyof StudyCardEntity] || false) && (
        <IconButton
          className={classes.calculatorBtn}
          onClick={() => toggleMathPanel((prevState) => (prevState.length ? '' : type))}
          size="large"
        >
          <img src={Calculator} alt={'math keyboard'} />
        </IconButton>
      )}
      <IconButton
        className={classes.drawBtn}
        onClick={() => {
          toggleMathPanel('');
          setShowCanvas(!showCanvas);
          onValueChange({ ...value, [`${type}IsDrawing` as keyof StudyCardEntity]: !showCanvas });
        }}
        size="large"
      >
        <img src={Fingerprint} alt={'draw'} />
      </IconButton>
    </>
  );
};

export default withTranslation()(StudyCard);
