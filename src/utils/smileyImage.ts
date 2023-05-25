import * as Assets from 'pages/summary/assets';

export const chooseSmileImage = (value: number, isActive: boolean) => {
  switch (value) {
    case 1:
      return isActive ? Assets.NeutralActive : Assets.Neutral;
    case 2:
      return isActive ? Assets.GoodActive : Assets.Good;
    case 3:
      return isActive ? Assets.ExcellentActive : Assets.Excellent;
    default:
      return Assets.Excellent;
  }
};
