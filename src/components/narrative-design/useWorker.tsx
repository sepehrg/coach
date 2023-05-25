import Cookies from 'universal-cookie';
import { createPortal } from 'react-dom';
import React, { useState } from 'react';

const myWorker = new Worker('worker.js');

function useWorker() {
  const [portalComponent, setPortalComponent] = useState<React.ReactElement | null>(null);

  const cookies = new Cookies();
  const token = cookies.get('token');

  // const onClose = () => {
  //   setPortalComponent(null);
  // };

  myWorker.onmessage = (e) => {
    console.log(e.data); // response from be
    console.log(e.data.data);
    // here should be all rendering logic + use additional helpers if needed
    const parentElement = document.getElementById('root');
    if (!parentElement) return;

    setPortalComponent(
      createPortal(
        null,
        // <IdoComponent
        //   toggleIdo={onClose}
        //   mimic={Mimic.HAPPY}
        //   name={e.data.data.label}
        //   message={e.data.data.value}
        //   background_state={Background.DARKENED}
        //   animation={AnimationEnum.GROW_CENTER}
        //   position={Position.CENTER_CENTER}
        // />,
        parentElement,
      ),
    );
  };

  const showIdo = (label: string, value?: any) => {
    myWorker.postMessage([token, label, value]);
    console.log(label, value);
  };

  return { showIdo, portalComponent };
}

export default useWorker;
