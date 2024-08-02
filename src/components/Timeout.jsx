import React, { useEffect, useState } from "react";

function Timeout({ timeInSec }) {
  const [currTime, setCurrentTime] = useState(timeInSec);

  useEffect(() => {
    if (currTime > 0) {
      setTimeout(() => {
        setCurrentTime(currTime - 1);
      }, [1000]);
    }
  }, [currTime]);
  return <div>{currTime}s</div>;
}

// penpaldev@gmail.com
// qasimmehmod73@gmail.com
// qm789586@gmail.com
export default Timeout;
