import { Button } from '_tosslib/components/Button';
import { on } from 'events';
import {
  memo,
  forwardRef,
  useImperativeHandle,
  useState,
  ComponentProps,
  Fragment,
  useEffect,
  useCallback,
  useMemo,
} from 'react';

export interface KeyPadProps
  extends Omit<ComponentProps<'div'>, 'onInput'>,
    Pick<KeyPadCoordProps, 'onBackSpace' | 'onRemoveAll'> {
  onInput: (value: string) => void;
}

export interface KeyPadHandle {
  open: VoidFunction;
  close: VoidFunction;
}

export const KeyPad = memo(
  forwardRef<KeyPadHandle, KeyPadProps>(function KeyPad(
    { style, onBackSpace, onRemoveAll, onInput, ...props },
    forwardedRef
  ) {
    const [open, setOpen] = useState(false);

    useImperativeHandle(forwardedRef, () => ({ open: () => setOpen(true), close: () => setOpen(false) }));

    if (!open) {
      return null;
    }

    return (
      <div {...props} style={{ position: 'absolute', width: '100%', background: 'white', ...style }}>
        <KeyPadCoord
          onConfirm={() => setOpen(false)}
          onBackSpace={onBackSpace}
          onRemoveAll={onRemoveAll}
          onInput={onInput}
        />
      </div>
    );
  })
);

interface KeyPadCoordProps {
  onConfirm: VoidFunction;
  onBackSpace: VoidFunction;
  onRemoveAll: VoidFunction;
  onInput: (value: string) => void;
}

const KeyPadCoord = ({ onConfirm, onBackSpace, onRemoveAll, onInput }: KeyPadCoordProps) => {
  const [johab, setJohab] = useState(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'R', ' ']);

  const ret = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 3; i++) {
      const temp = [];
      for (let j = 0; j < 4; j++) {
        temp.push(johab[i * 4 + j]);
      }
      if (i === 0) {
        temp.push('B');
      }
      if (i === 1) {
        temp.push('A');
      }
      if (i === 2) {
        temp.push('C');
      }
      arr.push(temp);
    }
    return arr;
  }, [johab]);

  const shuffle = useCallback(() => {
    const temp: string[] = [];
    for (let i = 0; i < johab.length; i++) {
      const number = Math.floor(Math.random() * 10);
      temp.splice(number, 0, johab[i]);
    }
    setJohab(temp);
  }, [johab]);

  useEffect(() => {
    shuffle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClickButton = (children: string) => {
    switch (children) {
      case 'R':
        shuffle();
        return;
      case 'A':
        onRemoveAll();
        return;
      case 'B':
        onBackSpace();
        return;
      case 'C':
        onConfirm();
        return;
      default:
        onInput(children);
        return;
    }
  };

  return ret.map(row =>
    row.map(col => {
      return (
        <Fragment key={col}>
          <Button style={{ width: '20%', height: '40px' }} variant="secondary" onClick={() => onClickButton(col)}>
            {col}
          </Button>
          {['A', 'B', 'C'].includes(col) && <br />}
        </Fragment>
      );
    })
  );
};
