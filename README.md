1. useLocalStorage

- hook 만들기

2. react-router-dom

- createBrowser, routerprovider
- outlet

4. forwardRef

```ts
export const RefTest = forwardRef<HTMLDivElement, RefTestProps>(
  (props, forwardedRef) => {
    return <div ref={forwardedRef}>{props.disabled ? "응" : "아니"}</div>;
  }
);
```

5. useImperative

```ts
export interface ImperativeHandleHandlers {
  open: VoidFunction;
  close: VoidFunction;
}

export interface ImperativeHandleProps {
  disabled: boolean;
}
export const ImperativeHandle = forwardRef<
  ImperativeHandleHandlers,
  ImperativeHandleProps
>((props, forwardedRef) => {
  useImperativeHandle(forwardedRef, () => ({
    open: () => console.log("open"),
    close: () => console.log("close"),
  }));
  return <>{props.disabled ? "응" : "아니"}</>;
});
```

6. html,body 레이아웃

```css
html {
  height: 100%;
  width: 600px;
}

body {
  margin: 0;
  width: 100%;
  height: 100%;
  border: 1px solid black;
}
```
