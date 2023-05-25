import React, { useState } from 'react';
import { Box, Button, ButtonGroup } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import useStyles from '../MathTextArea.styles';
import TwoVariablesInput from '../TwoVariablesInput';
import OneVariableInput from '../OneVariableInput';

interface MathButtonsPanelProps {
  onClick: (value: string) => void;
}

const markdownProps = {
  remarkPlugins: [remarkMath],
  rehypePlugins: [rehypeKatex],
};

const buttonGroup1 = ['$+$', '$-$', '$=$', '$\\div$', '$\\LARGE \\cdot$', '$\\%$'];
const buttonGroup2 = ['$($', '$)$', '$\\pi$', '$e$'];
const buttonGroup3 = [
  { title: 'fraction', formula: '$\\frac{x}{n}$' },
  { title: 'logarithm', formula: '$\\footnotesize\\log_xn$' },
];
const buttonGroup4 = [
  { title: 'squareRoot', formula: '$\\sqrt{x}$' },
  { title: 'powerTwo', formula: '$x^2$' },
  { title: 'powerN', formula: '$x^n$' },
  { title: 'tenToPower', formula: '$10^n$' },
  { title: 'eToPower', formula: '$e^n$' },
];

const MathButtonsPanel: React.FC<MathButtonsPanelProps> = (props) => {
  const { onClick } = props;
  const { classes } = useStyles();
  const [chosenFormula, setChosenFormula] = useState<string>('');

  const renderSimpleButton = (symbol: string) => {
    return (
      <Button key={symbol} className={classes.symbolButton} onClick={() => onClick(symbol)}>
        <ReactMarkdown {...markdownProps} children={symbol} />
      </Button>
    );
  };

  const renderComplexButton = (title: string, formula: string) => {
    return (
      <Button key={title} className={classes.symbolButton} onClick={() => setChosenFormula(title)}>
        <ReactMarkdown {...markdownProps} children={formula} />
      </Button>
    );
  };

  return (
    <Box className={classes.buttonGroupWrapper}>
      <ButtonGroup size="small">
        {buttonGroup1.map((symbol: string) => {
          return renderSimpleButton(symbol);
        })}
      </ButtonGroup>
      <ButtonGroup size="small">
        {buttonGroup2.map((symbol: string) => {
          return renderSimpleButton(symbol);
        })}
        {buttonGroup3.map((item: { title: string; formula: string }) => {
          return renderComplexButton(item.title, item.formula);
        })}
      </ButtonGroup>
      <ButtonGroup size="small">
        {buttonGroup4.map((item: { title: string; formula: string }) => {
          return renderComplexButton(item.title, item.formula);
        })}
      </ButtonGroup>

      <TwoVariablesInput
        isOpen={chosenFormula === 'fraction'}
        onSubmit={(a: string, b: string) => {
          onClick(`$\\frac{${a}}{${b}}$`);
          setChosenFormula('');
        }}
      />
      <TwoVariablesInput
        isOpen={chosenFormula === 'powerN'}
        onSubmit={(x: string, n: string) => {
          onClick(`$${x}^${n}$`);
          setChosenFormula('');
        }}
      />
      <TwoVariablesInput
        isOpen={chosenFormula === 'logarithm'}
        onSubmit={(x: string, n: string) => {
          onClick(`$log_${x} ${n}$`);
          setChosenFormula('');
        }}
      />

      <OneVariableInput
        isOpen={chosenFormula === 'squareRoot'}
        onSubmit={(a: string) => {
          onClick(`$\\sqrt{${a}}$`);
          setChosenFormula('');
        }}
        variableName={'x'}
      />
      <OneVariableInput
        isOpen={chosenFormula === 'powerTwo'}
        onSubmit={(a: string) => {
          onClick(`$${a}^2$`);
          setChosenFormula('');
        }}
        variableName={'x'}
      />
      <OneVariableInput
        isOpen={chosenFormula === 'tenToPower'}
        onSubmit={(n: string) => {
          onClick(`$10^${n}$`);
          setChosenFormula('');
        }}
        variableName={'n'}
      />
      <OneVariableInput
        isOpen={chosenFormula === 'eToPower'}
        onSubmit={(n: string) => {
          onClick(`$e^${n}$`);
          setChosenFormula('');
        }}
        variableName={'n'}
      />
    </Box>
  );
};

export default MathButtonsPanel;
