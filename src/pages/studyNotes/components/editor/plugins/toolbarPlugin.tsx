import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext.js';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  SELECTION_CHANGE_COMMAND,
  FORMAT_TEXT_COMMAND,
  $getSelection,
  $isRangeSelection,
  $getNodeByKey,
  RangeSelection,
  LexicalEditor,
} from 'lexical';
import { $patchStyleText, $getSelectionStyleValueForProperty } from '@lexical/selection';
import { $getNearestNodeOfType, mergeRegister } from '@lexical/utils';
import { $isListNode, ListNode } from '@lexical/list';
import { $isHeadingNode } from '@lexical/rich-text';
import { $isCodeNode, getDefaultCodeLanguage, getCodeLanguages } from '@lexical/code';
import DropDown, { DropDownItem } from '../components/dropDown';
import ColorPicker from '../components/colorPicker';
import { func, string, arrayOf, object, bool } from 'prop-types';

const LowPriority = 1;

const FONT_FAMILY_OPTIONS = [
  ['Arial', 'Arial'],
  ['Courier New', 'Courier New'],
  ['Georgia', 'Georgia'],
  ['Times New Roman', 'Times New Roman'],
  ['Trebuchet MS', 'Trebuchet MS'],
  ['Verdana', 'Verdana'],
];

const FONT_SIZE_OPTIONS = [
  ['10px', '10px'],
  ['11px', '11px'],
  ['12px', '12px'],
  ['14px', '14px'],
  ['16px', '16px'],
  ['18px', '18px'],
  ['20px', '20px'],
  ['22px', '22px'],
  ['24px', '24px'],
  ['26px', '26px'],
  ['28px', '28px'],
  ['36px', '36px'],
  ['48px', '48px'],
];

function dropDownActiveClass(active: boolean) {
  if (active) return 'active dropdown-item-active';
  else return '';
}

Select.propTypes = {
  onChange: func.isRequired,
  className: string,
  options: arrayOf(string).isRequired,
  value: string,
};

function Select({
  onChange,
  className,
  options,
  value,
}: {
  onChange: (e: any) => void;
  className: string;
  options: string[];
  value: string;
}) {
  return (
    <select className={className} onChange={onChange} value={value}>
      <option hidden={true} value="" />
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  // const [canUndo, setCanUndo] = useState(false);
  // const [canRedo, setCanRedo] = useState(false);
  const [blockType, setBlockType] = useState('paragraph');
  const [selectedElementKey, setSelectedElementKey] = useState<string | null>(null);
  const [codeLanguage, setCodeLanguage] = useState('');
  // const [isRTL, setIsRTL] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [fontSize, setFontSize] = useState('16px');
  const [fontColor, setFontColor] = useState('#000');
  const [bgColor, setBgColor] = useState('#fff');
  const [fontFamily, setFontFamily] = useState('Arial');

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      const element =
        anchorNode.getKey() === 'root' ? anchorNode : anchorNode.getTopLevelElementOrThrow();
      const elementKey = element.getKey();
      const elementDOM = editor.getElementByKey(elementKey);
      if (elementDOM !== null) {
        setSelectedElementKey(elementKey);
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType(anchorNode, ListNode);
          const type = parentList ? parentList.getTag() : element.getTag();
          setBlockType(type);
        } else {
          const type = $isHeadingNode(element) ? element.getTag() : element.getType();
          setBlockType(type);
          if ($isCodeNode(element)) {
            setCodeLanguage(element.getLanguage() || getDefaultCodeLanguage());
          }
        }
      }
      // Update text format
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
      // setIsRTL($isParentElementRTL(selection));

      setFontSize($getSelectionStyleValueForProperty(selection, 'font-size', '16px'));
      setFontColor($getSelectionStyleValueForProperty(selection, 'color', '#000'));
      setBgColor($getSelectionStyleValueForProperty(selection, 'background-color', '#fff'));
      setFontFamily($getSelectionStyleValueForProperty(selection, 'font-family', 'Arial'));
    }
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateToolbar();
          return false;
        },
        LowPriority,
      ),
      // editor.registerCommand(
      //   CAN_UNDO_COMMAND,
      //   (payload) => {
      //     setCanUndo(payload);
      //     return false;
      //   },
      //   LowPriority,
      // ),
      // editor.registerCommand(
      //   CAN_REDO_COMMAND,
      //   (payload) => {
      //     setCanRedo(payload);
      //     return false;
      //   },
      //   LowPriority,
      // ),
    );
  }, [editor, updateToolbar]);

  const codeLanguges = useMemo(() => getCodeLanguages(), []);
  const onCodeLanguageSelect = useCallback(
    (e: any) => {
      editor.update(() => {
        if (selectedElementKey !== null) {
          const node = $getNodeByKey(selectedElementKey);
          if ($isCodeNode(node)) {
            node.setLanguage(e.target.value);
          }
        }
      });
    },
    [editor, selectedElementKey],
  );

  const applyStyleText = useCallback(
    (styles: Record<string, string | null>) => {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $patchStyleText(selection, styles);
        }
      });
    },
    [editor],
  );

  const onFontColorSelect = useCallback(
    (value: string | null) => {
      applyStyleText({ color: value });
    },
    [applyStyleText],
  );

  const onBgColorSelect = useCallback(
    (value: string | null) => {
      applyStyleText({ 'background-color': value });
    },
    [applyStyleText],
  );

  FontDropDown.propTypes = {
    editor: object.isRequired,
    value: string.isRequired,
    type: string.isRequired,
    disabled: bool,
  };

  function FontDropDown({
    editor,
    value,
    type,
    disabled = false,
  }: {
    editor: LexicalEditor;
    value: string;
    type: string;
    disabled?: boolean;
  }) {
    const handleClick = useCallback(
      (option: string) => {
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            $patchStyleText(selection, {
              [type]: option,
            });
          }
        });
      },
      [editor, type],
    );

    const buttonAriaLabel =
      type === 'font-family'
        ? 'Formatting options for font family'
        : 'Formatting options for font size';

    return (
      <DropDown
        disabled={disabled}
        buttonClassName={'toolbar-item ' + type}
        buttonLabel={value}
        buttonIconClassName={type === 'font-family' ? 'icon block-type font-family' : ''}
        buttonAriaLabel={buttonAriaLabel}
      >
        {(type === 'font-family' ? FONT_FAMILY_OPTIONS : FONT_SIZE_OPTIONS).map(
          ([option, text]) => (
            <DropDownItem
              className={`item ${dropDownActiveClass(value === option)} ${
                type === 'font-size' ? 'fontsize-item' : ''
              }`}
              onClick={() => handleClick(option)}
              key={option}
            >
              <span className="text">{text}</span>
            </DropDownItem>
          ),
        )}
      </DropDown>
    );
  }

  const getNextFontSize = (selection: RangeSelection, increase: any) => {
    const fontSizes = FONT_SIZE_OPTIONS.map(([option]) => option);
    const currentFontSize = $getSelectionStyleValueForProperty(selection, 'font-size', '16px');
    const currentIndex = fontSizes.indexOf(currentFontSize);
    const newFontSize = fontSizes[currentIndex + (increase ? 1 : -1)];
    return newFontSize ? newFontSize : currentFontSize;
  };

  const changeFontSize = (increase: any) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $patchStyleText(selection, {
          'font-size': getNextFontSize(selection, increase),
        });
      }
    });
  };

  return (
    <div className="toolbar" ref={toolbarRef}>
      {blockType === 'code' ? (
        <>
          <Select
            className="toolbar-item code-language"
            onChange={onCodeLanguageSelect}
            options={codeLanguges}
            value={codeLanguage}
          />
          <i className="chevron-down inside" />
        </>
      ) : (
        <>
          <FontDropDown type={'font-family'} value={fontFamily} editor={editor} />
          <FontDropDown type={'font-size'} value={fontSize} editor={editor} />
          <button
            onClick={() => changeFontSize(true)}
            className={'toolbar-item spaced '}
            aria-label="Format Increase"
          >
            <i className="format increase" />
          </button>
          <button
            onClick={() => changeFontSize(false)}
            className={'toolbar-item spaced '}
            aria-label="Format Decrease"
          >
            <i className="format decrease" />
          </button>
          <button
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
            }}
            className={'toolbar-item spaced ' + (isBold ? 'active' : '')}
            aria-label="Format Bold"
          >
            <i className="format bold" />
          </button>
          <button
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
            }}
            className={'toolbar-item spaced ' + (isItalic ? 'active' : '')}
            aria-label="Format Italics"
          >
            <i className="format italic" />
          </button>
          <button
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
            }}
            className={'toolbar-item spaced ' + (isUnderline ? 'active' : '')}
            aria-label="Format Underline"
          >
            <i className="format underline" />
          </button>
          <ColorPicker
            buttonClassName="toolbar-item color-picker"
            buttonAriaLabel="Formatting text color"
            buttonIconClassName="icon font-color"
            color={fontColor}
            onChange={onFontColorSelect}
            title="text color"
          />
          <ColorPicker
            buttonClassName="toolbar-item color-picker"
            buttonAriaLabel="Formatting background color"
            buttonIconClassName="icon bg-color"
            color={bgColor}
            onChange={onBgColorSelect}
            title="bg color"
          />
        </>
      )}

      {/* <button
        disabled={!canUndo}
        onClick={() => {
          editor.dispatchCommand(UNDO_COMMAND);
        }}
        className="toolbar-item spaced"
        aria-label="Undo"
      >
        <i className="format undo" />
      </button>
      <button
        disabled={!canRedo}
        onClick={() => {
          editor.dispatchCommand(REDO_COMMAND);
        }}
        className="toolbar-item"
        aria-label="Redo"
      >
        <i className="format redo" />
      </button> */}
    </div>
  );
}
