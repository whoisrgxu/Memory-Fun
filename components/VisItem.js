import NumCard from "@/components/NumCard";
import PokerCard from "@/components/PokerCard";
import React from 'react';

const VisItem = React.memo(({vis, num}) => {
    return (
    <>
      {vis? <NumCard num={num}/> : <PokerCard />}
    </>
    );
  });
  VisItem.displayName = 'VisItem';

export default VisItem;

