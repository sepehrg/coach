import { useDrag } from '@use-gesture/react';
import { useSpring, animated } from '@react-spring/web';
import React, { useEffect, useRef } from 'react';
import { TaskDto } from 'entities/Task';

interface DragProps {
  task: TaskDto;
  dropZonesRef: any;
  setHovering: (index: string, bool: boolean) => void;
  onDrop: (task: TaskDto, elementId: string) => void;
  onDropOutside: (task: TaskDto) => void;
  className?: string;
  children: React.ReactNode;
}

const animationCallback =
  (movement: any, setAnimation: any) =>
  (name: any, velocity = 1, pos?: number) => {
    const dragConfig = { mass: 1, tension: 1000 * velocity, friction: 70 };
    const cancelConfig = { mass: 1, tension: 1000, friction: 70 };
    const onAreaConfig = { mass: 1, tension: 1200, friction: 70 };
    const bounceInConfig = { mass: 3, tension: 2500, friction: 70 };
    const configs: any = {
      drag: {
        to: { xys: [...movement, 1] },
        config: dragConfig,
      },
      scroll: {
        to: { xys: [movement[0], pos, 1] },
        config: dragConfig,
      },
      returnToStart: {
        to: { xys: [0, 0, 1] },
        config: cancelConfig,
      },
      shrink: {
        to: { xys: [...movement, 0] },
        config: onAreaConfig,
      },
      teleportToStart: {
        to: { xys: [0, 0, 0] },
        config: onAreaConfig,
        immediate: true,
      },
      bounceIn: {
        immediate: false,
        to: { xys: [0, 0, 1] },
        config: bounceInConfig,
      },
    };
    return setAnimation(configs[name]);
  };

const inRange = (num: number, min: number, max: number) => Boolean(min < num && num < max);
const clamp = (n: number, min: number, max: number) => {
  if (n < min) return min;
  if (n > max) return max;
  else return n;
};

function Drag({
  task,
  dropZonesRef,
  setHovering,
  onDrop,
  onDropOutside,
  className,
  children,
}: DragProps) {
  // Initial state of the animation
  const [{ xys }, setAnimation] = useSpring(() => ({
    from: { xys: [0, 0, 0] },
    to: { xys: [0, 0, 1] },
  }));
  const dragRef = useRef<HTMLDivElement>(null);
  // Drag and drop logic and animation
  const bind = useDrag(
    ({ down: drag, movement, velocity, xy, event, lastOffset }) => {
      const handleAnimation = animationCallback(movement, setAnimation);
      let droppedOnArea = false;
      const drop = !drag;
      if (dropZonesRef?.current?.children?.length) {
        for (let i = 0; i < dropZonesRef.current.children.length; i++) {
          const element = dropZonesRef.current.children[i];
          const { left, top, right, bottom } = element.getBoundingClientRect();
          velocity[0] = clamp(velocity[0], 3, 20);
          velocity[1] = clamp(velocity[1], 3, 20);
          // Dragging and dropping
          if (drag) {
            event.preventDefault();
            const dragOverArea = inRange(xy[0], left, right) && inRange(xy[1], top, bottom);
            const previouslyOnArea =
              inRange(lastOffset[0], left, right) && inRange(lastOffset[1], top, bottom);
            if (!previouslyOnArea && dragOverArea) setHovering(element.id, true);
            else if (!dragOverArea && previouslyOnArea) setHovering(element.id, false);
            handleAnimation('drag', velocity[0]);
          } else if (drop) {
            droppedOnArea =
              inRange(lastOffset[0], left, right) && inRange(lastOffset[1], top, bottom);
            setHovering(element.id, false);
            handleAnimation('returnToStart');
            if (droppedOnArea) {
              if (element.children.length < 2) {
                handleAnimation('shrink');
                onDrop(task, element.id);
              }
              setTimeout(() => handleAnimation('teleportToStart'), 400);
              setTimeout(() => handleAnimation('bounceIn'), 600);
              return null;
            } else {
              const rect = dropZonesRef.current.getBoundingClientRect();
              const dropOutside =
                !inRange(xy[0], rect.left, rect.right) || !inRange(xy[1], rect.top, rect.bottom);
              if (dropOutside) {
                onDropOutside(task);
                return null;
              }
            }
          }
        }
      }
    },
    {
      filterTaps: true,
      domTarget: dragRef,
      eventOptions: { passive: false },
      rubberband: true,
    },
  );

  useEffect(() => {
    if (dragRef.current) bind(task.type);
  }, [bind, task]);

  return (
    <animated.div
      ref={dragRef}
      className={className}
      style={{
        transform: xys.interpolate((x, y, s) => `translate3d(${x}px,${y}px,0) scale(${s})`),
      }}
    >
      {children}
    </animated.div>
  );
}

export default Drag;
