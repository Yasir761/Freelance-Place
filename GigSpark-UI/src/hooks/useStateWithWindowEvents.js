import { useEffect, useState } from "react";

const useStateWithWindowEvents = (initialValue, ...allTypeOfEvents) => {
  const [item, setItem] = useState(initialValue);

  useEffect(() => {
    const cb = () => setItem(initialValue);

    setTimeout(() => {
      if (item) {
        allTypeOfEvents.forEach((e) => {
          window.addEventListener(e, cb);
        });
      } else {
        allTypeOfEvents.forEach((e) => {
          window.removeEventListener(e, cb);
        });
      }
    }, 10);

    return () => {
      allTypeOfEvents.forEach((e) => {
        window.removeEventListener(e, cb);
      });
    };
  }, [item]);

  return [item, setItem];
};

export default useStateWithWindowEvents;
