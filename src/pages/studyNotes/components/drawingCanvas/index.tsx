import React, { useCallback, useEffect, useState } from 'react';
import useStyles from './DrawingCanvas.styles';
import { IconButton } from '@mui/material';
import { fabric } from 'fabric';
import { DeleteOutlined } from '@mui/icons-material';
import { StudyCard } from 'entities/StudyCard';

interface DrawingCanvasProps {
  value: Partial<StudyCard>;
  onValueChange: (value: Partial<StudyCard>) => void;
  canvasId: string;
}

const DrawingCanvas: React.FC<DrawingCanvasProps> = (props) => {
  const { classes } = useStyles();
  const { value, onValueChange, canvasId } = props;
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);

  const initilizeCanvas = useCallback(() => {
    if (value.question)
      fabric.loadSVGFromString(value.question, (objects) => {
        const obj = fabric.util.groupSVGElements(objects);
        canvas?.add(obj).renderAll();
      });
  }, [canvas, value.question]);

  const clearCanvas = useCallback(() => {
    if (canvas) {
      canvas.clear();
      canvas.backgroundColor = '#E4EFFA';
    }
  }, [canvas]);

  useEffect(() => {
    clearCanvas();
    initilizeCanvas();
  }, [clearCanvas, initilizeCanvas]);

  const pathCreated = useCallback(
    (event: any) => {
      if (canvasId === 'question') {
        onValueChange({ ...value, question: event.path.canvas.toSVG(), questionIsDrawing: true });
      } else {
        onValueChange({ ...value, answer: event.path.canvas.toSVG(), answerIsDrawing: true });
      }
    },
    [canvasId, onValueChange, value],
  );

  useEffect(() => {
    const initCanvas = new fabric.Canvas(canvasId, {
      isDrawingMode: true,
      width: 435,
      height: 347,
      backgroundColor: '#E4EFFA',
    });
    initCanvas.on('path:created', pathCreated);
    setCanvas(initCanvas);
  }, [canvasId, pathCreated]);

  return (
    <>
      <div className={classes.canvas}>
        <canvas style={{ borderRadius: 15 }} id={canvasId} />
        <IconButton onClick={clearCanvas} className={classes.clearButton} size="large">
          <DeleteOutlined />
        </IconButton>
      </div>
    </>
  );
};

export default DrawingCanvas;
