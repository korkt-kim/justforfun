2. react-router-dom
```jsx
<React.StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</React.StrictMode>

<Routes>
  <Route path="/" element={<Layout />}>
    <Route path="search" element={<Search />} />
    <Route path="favorite" element={<Favorite />} />
  </Route>
</Routes>
  const location = useLocation();
  const navigate = useNavigate();
```
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
