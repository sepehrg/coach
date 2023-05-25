import React, { useCallback, useEffect, useState } from 'react';
import useStyles from './DrawingCanvas.styles';
import { IconButton } from '@mui/material';
import { fabric } from 'fabric';
import { DeleteOutlined } from '@mui/icons-material';

interface DrawingCanvasProps {
  currentCard: number;
  content: string;
  onContentChange: (content: string) => void;
  toggleDrawing: () => void;
  canvasId: string;
}

const DrawingCanvas: React.FC<DrawingCanvasProps> = (props) => {
  const { classes } = useStyles();
  const { content, onContentChange, currentCard, canvasId, toggleDrawing } = props;
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);

  const initilizeCanvas = useCallback(() => {
    fabric.loadSVGFromString(content, (objects) => {
      const obj = fabric.util.groupSVGElements(objects);
      canvas?.add(obj).renderAll();
    });
  }, [canvas, content]);

  const clearCanvas = useCallback(() => {
    if (canvas) {
      canvas.clear();
      canvas.backgroundColor = '#E4EFFA';
    }
  }, [canvas]);

  useEffect(() => {
    clearCanvas();
    initilizeCanvas();
  }, [currentCard, clearCanvas, initilizeCanvas]);

  const pathCreated = useCallback(
    (event: any) => {
      onContentChange(event.path.canvas.toSVG());
      toggleDrawing();
      // newValue[currentCard].questionIsDrawing = true;
    },
    [onContentChange, toggleDrawing],
  );

  useEffect(() => {
    const initCanvas = new fabric.Canvas(canvasId + currentCard, {
      isDrawingMode: true,
      width: 435,
      height: 400,
      backgroundColor: '#E4EFFA',
    });
    initCanvas.on('path:created', pathCreated);
    setCanvas(initCanvas);
  }, [canvasId, currentCard, pathCreated]);

  return (
    <>
      <div className={classes.canvas}>
        <canvas style={{ borderRadius: 15 }} id={canvasId + currentCard} />
        <IconButton onClick={clearCanvas} className={classes.clearButton} size="large">
          <DeleteOutlined />
        </IconButton>
      </div>
    </>
  );
};

export default DrawingCanvas;
