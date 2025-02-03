import {
  ReactNode,
  useEffect,
  useState,
  Fragment,
  useCallback,
  ReactElement,
} from "react";

type ValueProps<T> = {
  value: T;
  onChange: (arg: T) => void;
};

type PropsType<T> = {
  children: (props: ValueProps<T>) => ReactElement<ValueProps<T>>;
  childrenProps: ValueProps<T>;
  wait?: number;
  action?: (value: T) => void;
};

const DebounceSlot = <T,>({
  children,
  childrenProps,
  action,
  wait = 1000,
}: PropsType<T>) => {
  const { value, onChange } = childrenProps;
  const [debounceValue, setDebounceValue] = useState<T>(value);

  useEffect(() => {
    setDebounceValue(value);
  }, [value]);

  useEffect(() => {
    if (value === debounceValue) return;
    const handler = setTimeout(() => {
      onChange(debounceValue);
      if (!action) return;
      action(debounceValue);
    }, wait);
    return () => clearTimeout(handler);
  }, [debounceValue]);

  if (!children || typeof children !== "function") {
    throw Error("DebounceSlot must have children");
  }
  return children({ value: debounceValue, onChange: setDebounceValue });
};

export default DebounceSlot;

/* How to use */
export const Example = () => {
  const [value, setValue] = useState<string>("");

  function onChange(newValue: string) {
    setValue(newValue);
  }
  function action(newValue: string) {
    console.log("DebounceHOC Example", newValue);
  }
  return (
    <Fragment>
      <div>value: {value}</div>
      <DebounceSlot<string> childrenProps={{ value, onChange }} action={action}>
        {({ value, onChange }) => (
          <input value={value} onChange={(e) => onChange(e.target.value)} />
        )}
      </DebounceSlot>
    </Fragment>
  );
};
