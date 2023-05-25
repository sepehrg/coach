import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import useStyles from './MathTextArea.styles';
import 'katex/dist/katex.min.css';
import { Box } from '@mui/material';
import { renderToString } from 'react-dom/server';
import MathButtonsPanel from './MathButtonsPanel';

const markdownProps = {
  remarkPlugins: [remarkMath],
  rehypePlugins: [rehypeKatex],
};

interface MathTextAreaProps {
  showMathPanel: boolean;
  content: string;
  currentCard: number;
  onContentChange: (content: string) => void;
  placeholder: string;
}

const MathTextArea: React.FC<MathTextAreaProps> = (props) => {
  const { classes } = useStyles();
  const { showMathPanel, content, onContentChange, currentCard, placeholder } = props;
  const editableDivRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!editableDivRef?.current) return;
    editableDivRef.current.innerHTML = content;
  }, [content, currentCard]);

  return (
    <>
      <div
        contentEditable={true}
        placeholder={placeholder}
        ref={editableDivRef}
        className={classes.inputEditable}
        onInput={(e: any) => {
          e.stopPropagation();
          onContentChange(e.currentTarget.innerHTML);
        }}
      ></div>
      {showMathPanel && (
        <MathButtonsPanel
          onClick={(value: string) => {
            if (!editableDivRef.current) return;
            const contentCopy = editableDivRef.current.innerHTML;
            const newValue = contentCopy.concat(
              renderToString(
                <>
                  <Box datatype="formula" className={classes.font} contentEditable={false}>
                    <ReactMarkdown {...markdownProps} children={value} />
                  </Box>{' '}
                </>,
              ),
            );
            editableDivRef.current.innerHTML = newValue;
            onContentChange(newValue);
          }}
        />
      )}
    </>
  );
};

export default MathTextArea;
