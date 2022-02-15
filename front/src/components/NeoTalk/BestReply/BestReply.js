import React from 'react';

import Reply from './Reply/Reply';
import NoReply from './NoReply/NoReply';

function BestReply(props) {
  if (Object.keys(props).length === 0) {
    return <NoReply />;
  }
  return <Reply {...props} />;
}

export default BestReply;
