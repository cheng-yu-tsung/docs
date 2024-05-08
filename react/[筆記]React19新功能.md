# [React 19 的新功能](https://react.dev/blog/2024/04/25/react-19)

---

# 增加三個 HOOK 來完成 Action

> ## useActionState

<mark>[useActionState](https://react.dev/reference/react/useActionState)讓 Action 實行起來更加容易</mark>

Action 優化，自動管理數據提交的過程，數據提交需要經過以下過程

1.  pending 等待狀態
1.  errors 錯誤處理
1.  updates 資料更新

```ts
import { useActionState } from "react";

function ActionForm(){
    // state:當前狀態，第一次渲染時為初始值 initialState
    // action:執行操作，會觸發fn(oldValue,newValue)實行
    // pending:表示是否正在執行
    const [state, action， pending] = useActionState(fn, initialState, permalink?);

    const [error, submitAction, isPending] = useActionState(
    //previousState:更新前狀態
    //newValue:新值
    async (previousState, newValue) => {
        const error = await updateAction(newValue);
        if (!error) return error; //錯誤處理
        return null;//成功處理
        },
    null//初始值
    );
    //使用
    return (
        <form action={submitAction}>
             <button type='submit' disabled={isPending}>
                更新
             </button>
            {error && <p>{error}</p>}
        </form>
        )
}
```

> ## useFormStatus

<mark>[useFormStatus](https://react.dev/reference/react-dom/hooks/useFormStatus) 讓表單就像 Context 一樣</mark>

會讀取所在\<from>的狀態，不需要將 props 傳遞到組件，可以透過 Context 完成

```ts
import { useFormStatus } from "react-dom";
function SubmitButton() {
    //pending:等待狀態 預設false
    //data:父層form的資料 預設null
    //method:form的請求方式 預設false
    //action:form的提交 預設false
    constaction{ pending, data, method, action } = useFormStatus();

    return <button type="submit" disabled={pending} />;
}
```

> ## useOptimistic

<mark>[useOptimistic](https://react.dev/reference/react/useOptimistic)產生結果，先更新畫面</mark>

在等待異部結果時，可以先將化用樂觀更新，有結果後再根據結果更新狀態

```ts
import { useOptimistic } from "react";

function OptimisticUpdate() {
    // state:當前狀態，第一次渲染時為初始值 initialState
    // action:執行操作，會觸發fn(oldValue,newValue)實行
    const [state, action] = useOptimistic(initialState, fn);

    const [optimistic, OptimisticFn] = useOptimistic(
        state,
        //previousState:更新前狀態
        //optimisticValue:樂觀更新的值
        (previousState, optimisticValue) => {
            //執行動作
        }
    );
}
```

# 新的 API

> ## use

<mark>[use](https://react.dev/reference/react/use) 讀取資料更容易</mark>

use 可以用來讀取資源(promise 或 context)得到值

```ts
import { use } from "react";

function Use({ promise }) {
    //value:值
    //resource:可以為 promise 或是 context
    const value = use(resource);

    const comments = use(promise); //讀取promise
    const theme = use(ThemeContext); //讀取context
    return (
        <div style={{ color: theme.color }}>
            {comments.map((comment) => (
                <p key={comment.id}>{comment}</p>
            ))}
        </div>
    );
}
function Page({ promise }) {
    //use 尚未支援渲染中創建的promise 所以需要Suspense來緩存
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Use promise={promise} />
        </Suspense>
    );
}
```

# 優化

> ## ref as a prop

```ts
//過去用法 forwardRef
function MyInput({ placeholder, ref }) {
    return <input placeholder={placeholder} ref={ref} />;
}
//ref 可當成 prop 傳遞
<MyInput ref={ref} />;
```

> ## Context as a provider

```ts
//過去用法 ThemeContext.Provider
const ThemeContext = createContext("");
function App({ children }) {
    //Context 可以直接當成provider使用
    return <ThemeContext value="dark">{children}</ThemeContext>;
}
```

> ## Cleanup functions for refs

```ts
//過去當卸載ref 時會設為null
<input
    ref={(ref) => {
        //新增一個清理函數
        return () => {
            // ref清理
        };
    }}
/>
```

# 更多新的支援

> ## 新的支援

1. Support for Document Metadata
1. Support for stylesheets
1. Support for async scripts
1. Better error reporting
1. Support for preloading resources
1. Support for Custom Elements
