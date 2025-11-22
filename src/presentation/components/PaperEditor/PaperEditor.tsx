import * as S from './PaperEditor.Styles';
import { useEffect, useRef, useState, useCallback } from 'react';

interface PaperEditorProps {
  content: string;
  onChange: (newContent: string) => void;
}

const MAX_HISTORY = 60;

export function PaperEditor({ content, onChange }: PaperEditorProps) {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const [history, setHistory] = useState<string[]>([content]);
  const [historyIndex, setHistoryIndex] = useState(0);

  useEffect(() => {
    if (editorRef.current) editorRef.current.innerText = content;
    setHistory([content]);
    setHistoryIndex(0);
  }, [content]);

  const pushHistory = useCallback(
    (value: string) => {
      setHistory((prev) => {
        const trimmed = prev.slice(0, historyIndex + 1);
        trimmed.push(value);
        while (trimmed.length > MAX_HISTORY) trimmed.shift();
        return trimmed;
      });
      setHistoryIndex((prev) => Math.min(prev + 1, MAX_HISTORY - 1));
    },
    [historyIndex]
  );

  const setContent = useCallback(
    (newContent: string, updateHistory = true) => {
      if (editorRef.current) {
        editorRef.current.innerText = newContent;
      }
      onChange(newContent);
      if (updateHistory) pushHistory(newContent);
    },
    [onChange, pushHistory]
  );

  const undo = useCallback(() => {
    setHistoryIndex((currentIndex) => {
      const newIndex = Math.max(0, currentIndex - 1);
      const value = history[newIndex] ?? '';
      setContent(value, false);
      return newIndex;
    });
  }, [history, setContent]);

  const redo = useCallback(() => {
    setHistoryIndex((currentIndex) => {
      const newIndex = Math.min(history.length - 1, currentIndex + 1);
      const value = history[newIndex] ?? '';
      setContent(value, false);
      return newIndex;
    });
  }, [history, setContent]);

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const v = (e.target as HTMLDivElement).innerText;
    onChange(v);
    pushHistory(v);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Undo/Redo keyboard combos
    const isUndo = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z';
    const isRedoAlt = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y';
    const isRedoShift =
      (e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'z';

    if (isUndo) {
      e.preventDefault();
      undo();
    }
    if (isRedoAlt || isRedoShift) {
      e.preventDefault();
      redo();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    // sanitize paste: only plain text
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    // insert text at cursor
    // Using execCommand for simplicity; fallback to inserting node
    document.execCommand('insertText', false, text);
  };

  return (
    <S.PaperWrapper>
      <S.Toolbar>
        <S.IconButton onClick={undo} disabled={historyIndex <= 0}>
          Undo
        </S.IconButton>
        <S.IconButton
          onClick={redo}
          disabled={historyIndex >= history.length - 1 || history.length === 0}
        >
          Redo
        </S.IconButton>
      </S.Toolbar>
      <S.EditorArea
        contentEditable
        ref={editorRef}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        suppressContentEditableWarning
      />
    </S.PaperWrapper>
  );
}
