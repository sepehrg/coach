import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext.js';
import React, { useEffect } from 'react';

interface InitilizePluginProps {
  value: string;
}

const InitializePlugin: React.FC<InitilizePluginProps> = ({ value }) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    setTimeout(() => {
      const initialEditorState = editor.parseEditorState(value);
      editor.setEditorState(initialEditorState);
    }, 100);
  }, [editor, value]);

  return <></>;
};

export default InitializePlugin;
