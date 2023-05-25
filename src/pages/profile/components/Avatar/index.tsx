import React, { useState, useCallback } from 'react';
import useStyles from './Avatar.styles';
import { Grid, Dialog, DialogContent, Box } from '@mui/material';
import Button from '@mui/material/Button';
import AvatarMUI from '@mui/material/Avatar';
import Cropper, { Area } from 'react-easy-crop';
import Slider from '@mui/material/Slider';
import { WithTranslation, withTranslation } from 'react-i18next';
import { Edit } from 'assets/images/icons';
import { arrayBufferToBase64 } from 'utils/imageConvertor';

interface AvatarProps {
  img: { data: number[] } | null;
  changeImg: (img: File) => void;
}

const Avatar: React.FC<AvatarProps & WithTranslation> = ({ img, changeImg, t }) => {
  const { classes } = useStyles();

  const [cropped, setCropped] = useState<{ src: string; alt: string }>({ src: '', alt: '' });
  const [icon, setIcon] = useState<File>();
  const [pic, setPic] = useState<{ src: string; alt: string }>();
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number | number[]>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{
    width: number;
    height: number;
    x: number;
    y: number;
  } | null>(null);

  const onCropChange = (crop: { x: number; y: number }) => {
    setCrop(crop);
  };

  const onCropComplete = useCallback((_croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const ofFileChange: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setIcon(file);
      setPic({
        src: URL.createObjectURL(file),
        alt: file.name,
      });
    }
  };

  const createCroppedImg = async () => {
    if (!pic) {
      return;
    }
    const originalImg: HTMLImageElement = await new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', (error) => reject(error));
      image.setAttribute('crossOrigin', 'anonymous'); // needed to avoid cross-origin issues on CodeSandbox
      image.src = pic.src;
    });
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const maxSize = Math.max(originalImg.width, originalImg.height);
    const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));
    canvas.width = safeArea;
    canvas.height = safeArea;
    if (ctx) {
      if (croppedAreaPixels !== null) {
        ctx.translate(safeArea / 2, safeArea / 2);
        ctx.translate(-safeArea / 2, -safeArea / 2);
        ctx.drawImage(
          originalImg,
          safeArea / 2 - originalImg.width * 0.5,
          safeArea / 2 - originalImg.height * 0.5,
        );
        const data = ctx.getImageData(0, 0, safeArea, safeArea);
        canvas.width = croppedAreaPixels.width;
        canvas.height = croppedAreaPixels.height;
        ctx.putImageData(
          data,
          Math.round(0 - safeArea / 2 + originalImg.width * 0.5 - croppedAreaPixels.x),
          Math.round(0 - safeArea / 2 + originalImg.height * 0.5 - croppedAreaPixels.y),
        );
        await new Promise<void>((resolve) => {
          canvas.toBlob((file) => {
            if (file) {
              const imgFile = new File([file], 'avatar', { type: 'image/jpeg' });
              setCropped({
                src: URL.createObjectURL(imgFile),
                alt: imgFile.name,
              });
              setIcon(undefined);
              changeImg(imgFile);
            }
            resolve();
          }, 'image/jpeg');
        });
      }
    }
  };

  return (
    <Grid item className={classes.root}>
      <Box className={classes.avatarWrapper}>
        {cropped.src ? (
          <AvatarMUI src={cropped.src} className={classes.avatarIcon} />
        ) : (
          <AvatarMUI
            src={`data:image/jpg;base64,${arrayBufferToBase64(img?.data || [])}`}
            className={classes.avatarIcon}
          />
        )}
        <Button className={classes.uploadButton} variant={'contained'} component="label">
          <img src={Edit} alt="edit" />
          <input
            hidden={true}
            accept={'image/jpeg, image/png'}
            type={'file'}
            onChange={ofFileChange}
          />
        </Button>
      </Box>
      <Dialog
        open={!!icon}
        onClose={() => {
          setIcon(undefined);
        }}
      >
        <DialogContent>
          <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Box style={{ width: 450, height: 470 }}>
              <Cropper
                image={pic?.src}
                crop={crop}
                zoom={zoom as number}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={onCropChange}
                onCropComplete={onCropComplete}
                onZoomChange={(zoom) => setZoom(zoom)}
                style={{ containerStyle: { width: '100%', height: 450 } }}
              />
            </Box>
            <Box>
              <Slider
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby="Zoom"
                onChange={(e, zoom) => setZoom(zoom)}
              />
            </Box>
            <Button variant={'contained'} onClick={createCroppedImg}>
              {t('Common.Submit')}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Grid>
  );
};

export default withTranslation()(Avatar);
