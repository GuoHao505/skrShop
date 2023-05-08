import { throttle } from 'lodash';
import { useEffect } from 'react';

const isTouchBottom = (handler: any) => {
  // 文档显示区域高度
  const showHeight = window.innerHeight;
  // 网页卷曲高度
  const scrollTopHeight = document.body.scrollTop || document.documentElement.scrollTop;
  // 所有内容高度
  const allHeight = document.body.scrollHeight;
  // 导航条高度
  const headerHeight = document.querySelector(".ant-layout-header")?.clientHeight || 0;
  // (所有内容高度 = 文档显示区域高度 + 网页卷曲高度) 时即为触底
  if (allHeight <= showHeight + scrollTopHeight + headerHeight) {
    handler();
  }
};

const useTouchBottom = (fn: any) => {
  const useFn = throttle(() => {
    if (typeof fn === 'function') {
      isTouchBottom(fn);
    }
  }, 500);

  useEffect(() => {
    window.addEventListener('scroll', useFn);
    return () => {
      window.removeEventListener('scroll', useFn);
    };
  }, []);
};

export default useTouchBottom;
