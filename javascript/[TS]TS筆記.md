# Typescript  筆記

## 常用語法

### U  聯合類型 

### in U  聯合類型內查詢 

### keyof T  物件鍵查詢，返回聯合類型U 

### T[K] 物件值查詢 

### extends 物件繼承

## 內置函數

### Exclude<T, U> 在T與U差集的類型

```ts
type Excludek<T, U> = T extends U ? never : T;

```

### Extract<T, U> 在T與U的交集的類型

```ts
type Extract<T, U> = T extends U ? T : never;

```

### Partial<T> 将T的所有屬性變成可選的。

```ts
type Partial<T> = {
  [P in keyof T]?: T[P];
};
```

### Pick<T, K> 屬性內選一組屬性組成新類型

```ts
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
```

### Omit<T> 屬性內排除一組屬性組成新類型

```ts
type Omit<T, K extends any> = {
  [P in Exclude<keyof T,K>]: T[P];
};
```

### Record<K, T> 選一組屬性與 T 合成新類型

```ts
type Record<K extends any, T> = {
  [P in K]: T;
};
```
