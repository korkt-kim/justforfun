import { Button } from '_tosslib/components/Button';
import { Input } from '_tosslib/components/Input';
import { Spacing } from '_tosslib/components/Spacing';
import { Txt } from '_tosslib/components/Txt';
import colors from '_tosslib/constants/colors';
import { useOutsideClick } from '_tosslib/hooks/useOutsideClick';
import { KeyPad, KeyPadHandle } from 'components/KeyPad';
import { useRef, useState } from 'react';

export function KeypadPage() {
  const passwordKeyPad = useRef<KeyPadHandle | null>(null);
  const confirmPasswordKeyPad = useRef<KeyPadHandle | null>(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const passwordRef = useRef<HTMLDivElement>(null);
  const confirmPasswordRef = useRef<HTMLDivElement>(null);
  useOutsideClick({ ref: passwordRef, handler: () => passwordKeyPad.current?.close() });
  useOutsideClick({ ref: confirmPasswordRef, handler: () => confirmPasswordKeyPad.current?.close() });

  return (
    <section>
      <Txt typography="h1" color={colors.black}>
        토스 보안키패드 기술과제
      </Txt>
      <div
        ref={passwordRef}
        onFocus={() => {
          passwordKeyPad.current?.open();
        }}
      >
        <Input label="비밀번호">
          <Input.TextField type="password" value={password} onInput={e => e.preventDefault()} />
        </Input>

        <div style={{ position: 'relative', width: '100%' }}>
          <KeyPad
            ref={passwordKeyPad}
            onInput={value => setPassword(prev => prev + value)}
            onBackSpace={() => {
              if (!password) {
                return;
              }
              setPassword(prev => prev.slice(0, prev.length - 1));
            }}
            onRemoveAll={() => setPassword('')}
          />
        </div>
      </div>
      <Spacing size={24} />
      <div ref={confirmPasswordRef} onFocus={() => confirmPasswordKeyPad.current?.open()}>
        <Input label="비밀번호 확인">
          <Input.TextField type="password" value={confirmPassword} />
        </Input>
        <div style={{ position: 'relative', width: '100%' }}>
          <KeyPad
            ref={confirmPasswordKeyPad}
            onInput={value => {
              console.log(value);
              setConfirmPassword(prev => prev + value);
            }}
            onBackSpace={() => {
              if (!password) {
                return;
              }
              setConfirmPassword(prev => prev.slice(0, prev.length - 1));
            }}
            onRemoveAll={() => setConfirmPassword('')}
          />
        </div>
      </div>
      <Spacing size={24} />
      <Button css={{ width: '100%' }}>완료</Button>
    </section>
  );
}
