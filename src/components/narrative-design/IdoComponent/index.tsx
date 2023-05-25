// import React, { useCallback, useEffect, useState } from 'react';
// import { IdoNew } from 'assets/images';
// import useStyles from './IdoComponent.styles';
// import { IconButton, Typography } from '@mui/material';
// import { AnimationEnum, Background, Position } from 'entities/Ido';
// import { Cross } from 'assets/images/icons';
// import { useSelector } from 'react-redux';
// import { idoActionsSelector } from 'store/ido/ido.selectors';
// import { useIdoActions } from 'store/ido';

// interface IdoProps {}

// const IdoComponent: React.FC<IdoProps> = (props: IdoProps) => {
//   const { classes } = useStyles();

//   const { actions } = useSelector(idoActionsSelector);

//   const idoActions = useIdoActions();

//   const [mainClassname, setMainClassname] = useState<string>('');
//   const [msg, setMsg] = useState<string>('');

//   const background_state = Background.DARKENED;
//   const animation = AnimationEnum.GROW_CENTER;
//   const position = Position.CENTER_CENTER;

//   useEffect(() => {
//     if (actions.length > 0) {
//       actions[0].body.split(';').forEach((item, index) => {
//         setTimeout(() => {
//           setMsg(item);
//         }, 2000 * (index + 1));
//       });
//     }
//   }, [actions]);

//   const onClose = () => {
//     outroAnimation();
//     idoActions.removeMessage();
//     const timeoutForAnimation = setTimeout(() => {
//       //      toggleIdo()
//     }, 3000);

//     // toggleIdo();

//     return () => clearTimeout(timeoutForAnimation);
//   };

//   const positionMapper = [
//     {
//       position: Position.CENTER_CENTER,
//       className: `${classes.wrapper} ${classes.positionCenter}`,
//     },
//     {
//       position: Position.CENTER_LEFT,
//       className: `${classes.wrapper} ${classes.positionCenterLeft}`,
//     },
//     {
//       position: Position.BOTTOM_LEFT,
//       className: `${classes.wrapper} ${classes.positionBottomLeft}`,
//     },
//     {
//       position: Position.BOTTOM_RIGHT,
//       className: `${classes.wrapper} ${classes.positionBottomRight}`,
//     },
//   ];

//   const introAnimationMapper = [
//     {
//       animation: AnimationEnum.SLIDE_BOTTOM_LEFT,
//       className: `${classes.slideInBottomLeft}`,
//     },
//     {
//       animation: AnimationEnum.SLIDE_BOTTOM_RIGHT,
//       className: `${classes.slideInBottomRight}`,
//     },
//     {
//       animation: AnimationEnum.SLIDE_CENTER_LEFT,
//       className: `${classes.slideInCenterLeft}`,
//     },
//     {
//       animation: AnimationEnum.FADE_CENTER,
//       className: `${classes.fadeInCenter}`,
//     },
//     {
//       animation: AnimationEnum.GROW_CENTER,
//       className: `${classes.growInCenter}`,
//     },
//   ];

//   const outroAnimationMapper = [
//     {
//       animation: AnimationEnum.SLIDE_BOTTOM_LEFT,
//       className: `${classes.slideOutBottomLeft}`,
//     },
//     {
//       animation: AnimationEnum.SLIDE_BOTTOM_RIGHT,
//       className: `${classes.slideOutBottomRight}`,
//     },
//     {
//       animation: AnimationEnum.SLIDE_CENTER_LEFT,
//       className: `${classes.slideOutCenterLeft}`,
//     },
//     {
//       animation: AnimationEnum.FADE_CENTER,
//       className: `${classes.fadeOutCenter}`,
//     },
//     {
//       animation: AnimationEnum.GROW_CENTER,
//       className: `${classes.growOutCenter}`,
//     },
//   ];

//   const chooseClassname = useCallback(() => {
//     const positionObject:
//       | { position: Position; className: string }
//       | undefined = positionMapper.find((object) => object.position === position);
//     const animationObject:
//       | { animation: AnimationEnum; className: string }
//       | undefined = introAnimationMapper.find((object) => object.animation === animation);
//     setMainClassname(`${positionObject!.className} ${animationObject?.className}`);
//   }, [animation, introAnimationMapper, position, positionMapper]);

//   const outroAnimation = () => {
//     const animationObject:
//       | { animation: AnimationEnum; className: string }
//       | undefined = outroAnimationMapper.find((object) => object.animation === animation);
//     const newClassName = mainClassname.concat(animationObject!.className);
//     setMainClassname(newClassName);
//   };

//   const backgroundClassname =
//     background_state === Background.DARKENED ? classes.darkened : undefined;

//   useEffect(() => {
//     chooseClassname();
//   }, [chooseClassname]);

//   return (
//     <>
//       {actions && actions.length > 0 && (
//         <div className={backgroundClassname}>
//           <div className={mainClassname}>
//             <div className={classes.messageBox}>
//               <Typography variant={'h3'}>{msg}</Typography>
//             </div>
//             <img className={classes.idoImage} src={IdoNew} alt={'ido robot'} />
//             <IconButton className={classes.closeBtn} onClick={onClose}>
//               <img src={Cross} alt={'close'} />
//             </IconButton>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default IdoComponent;
export default {};
