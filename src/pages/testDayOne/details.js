import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { observer } from 'mobx-react';
import './details.less';

const TestDayOneDetails = () => {
  const [num, setNum] = useState(0);
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log('元素进入可视区域');
        // 在这里执行你的逻辑
      }
    });
  });
  const boxItemRef = useRef(null);
  useEffect(() => {
    observer.observe(boxItemRef.current);
  }, [boxItemRef]);
  useLayoutEffect(() => {
    // 这里的代码会在 DOM 更新后立即执行
    console.log('DOM 已更新', boxItemRef.current);
  });

  function setNumFunc() {
    setNum((prevNum) => prevNum + 1);
  }
  return (
    <div className="details-container">
      <div onClick={setNumFunc}>{num}</div>
      <div className="box_item" ref={boxItemRef}></div>
    </div>
  );
};

export default observer(TestDayOneDetails);
