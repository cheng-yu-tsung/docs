# 畫面觀察者

[IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver)用來觀察元素是否可見

## API 用法

基本步驟

1. 建立觀察器[[]]
2. 設定要觀察的元素
3. 元素<mark>相交/離開</mark> 執行 callback function
4. 清除觀察器

## 建立觀察器

```ts
let observer: IntersectionObserver | null = null;
//callback:相交或離開時直接的函數
//option(選填):調整觀察器的設定
new IntersectionObserver(callback, [option]);

const option = {
  root: null, //觀察器所在的元素
  rootMargin: "0px 0px 0px 0px", //畫面偏移量 上/右/下/左
  threshold: [0], //目標與觀察器相交比例 0-1
};

function callback(entries: IntersectionObserverEntry[]) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      //元素相交時執行
    } else {
      //元素離開時執行
    }
  });
}

const observer = new IntersectionObserver(callback, option);
```

## 設定要觀察的元素

```ts
const el = document.getElementById("foo");
//將元素設定給觀察器
observer.observe(el);
//也可以循環設定
const elArray = document.querySelectorAll(".foo");
elArray.forEach((el) => {
  observer.observe(el);
});
```

## 常用情況

在需要元素出現時去直接想要的功能

1. 側欄提示
2. lazy load
3. 無限滾動

## 清除觀察器

```ts
const observer = new IntersectionObserver(callback, option);

const el = document.getElementById("foo");
//將元素取消觀察
observer.unobserve(el);
//不再觀察
observer.disconnect();
```

## 參考資料

- [MDN-IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver)

- [IntersectionObserver API 使用教程](https://www.ruanyifeng.com/blog/2016/11/intersectionobserver_api.html)
