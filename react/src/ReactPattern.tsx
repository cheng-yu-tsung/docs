import { useContext, createContext, useState, Fragment } from "react";
import type { FC, ReactNode, PropsWithChildren } from "react";

type SubComponents = {
  CssComponent: typeof CssComponent;
  StateComponent: typeof CssComponent;
};

const StateContext = createContext({
  state: "",
});
const StateProvider = ({ children }: PropsWithChildren) => {
  const [state, setState] = useState(" StateProvider");
  return (
    <Fragment>
      <StateContext.Provider value={{ state }}>
        {children}
      </StateContext.Provider>
    </Fragment>
  );
};

const Compound: FC<PropsWithChildren> & SubComponents = ({ children }) => {
  // style.compound .css { font-size: 48px;}
  return (
    <StateProvider>
      <div className="compound">{children}</div>
    </StateProvider>
  );
};

const CssComponent = ({ children }: PropsWithChildren) => {
  return <div className="Css">{children}</div>;
};

const StateComponent = () => {
  const { state } = useContext(StateContext);
  return <div>{state}</div>;
};

Compound.CssComponent = CssComponent;
Compound.StateComponent = StateComponent;

const UseCompoundExample = () => {
  return (
    <Compound>
      <Compound.StateComponent />
      <Compound.CssComponent>Style Control</Compound.CssComponent>
    </Compound>
  );
};

type HOCPropsType = {
  HOCstate?: string;
};
type PropsType = {
  subState: string;
};
const withHoc = (Component: FC<PropsType & HOCPropsType>) => {
  return (props: PropsType) => {
    const [loading, setLoading] = useState(false);
    const [HOCstate, setHOCState] = useState<string>("HOCstate");
    //控制渲染
    if (loading) return <div>loading</div>;
    const newProps = { HOCstate, ...props }; //操作props
    return (
      //提早註冊provider
      <StateProvider>
        <Component {...newProps} />
      </StateProvider>
    );
  };
};

const Component = ({ subState, HOCstate }: PropsType & HOCPropsType) => {
  return (
    <div>
      {HOCstate}
      {subState}
    </div>
  );
};
const HocExample = withHoc(Component);

const UseHocExample = () => {
  return (
    <Fragment>
      <HocExample subState="subState" />
      <Component subState="subState" />
    </Fragment>
  );
};

const Slot = ({ children }: { children: (value: string) => ReactNode }) => {
  const [slotValue, setSlotValue] = useState("slotValue");
  console.log("Slot");
  return (
    <Fragment>
      {/* setSlotValue 改變時 UseSlotExample 不會重新渲染*/}
      <input value={slotValue} onChange={(e) => setSlotValue(e.target.value)} />
      {children(slotValue)}
    </Fragment>
  );
};

const UseSlotExample = () => {
  const [parentValue, setParentValue] = useState("UseSlot");
  console.log("UseSlotExample");
  return (
    <Fragment>
      {/* setParentValue 改變時 Slot 也會重新渲染*/}
      <input
        value={parentValue}
        onChange={(e) => setParentValue(e.target.value)}
      />
      <Slot>
        {(childrenValue) => (
          <Fragment>
            <div>{parentValue}</div>
            <div>{childrenValue}</div>
          </Fragment>
        )}
      </Slot>
    </Fragment>
  );
};

const ReactPattern = () => {
  return (
    <Fragment>
      <UseCompoundExample />
      <UseHocExample />
      <UseSlotExample />
    </Fragment>
  );
};

export default ReactPattern;
