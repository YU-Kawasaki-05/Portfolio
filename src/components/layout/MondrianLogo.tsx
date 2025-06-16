'use client';

import MondrianBlock from '../design/MondrianBlock';

export function MondrianLogo() {
  return (
    <div className="relative w-8 h-8">
      {/* Red */}
      <MondrianBlock 
        width="50%" 
        height="50%" 
        color="red"
        position="absolute"
        top={0}
        left={0}
        borderWidth={1}
      />
      {/* Blue */}
      <MondrianBlock 
        width="40%" 
        height="30%" 
        color="blue"
        position="absolute"
        top="55%"
        right={0}
        borderWidth={1}
      />
      {/* Yellow */}
      <MondrianBlock 
        width="30%" 
        height="40%" 
        color="yellow"
        position="absolute"
        bottom={0}
        left="55%"
        borderWidth={1}
      />
       {/* White */}
       <MondrianBlock 
        width="45%" 
        height="45%" 
        color="white"
        position="absolute"
        top="50%"
        left={0}
        borderWidth={1}
      />
      <MondrianBlock 
        width="45%" 
        height="45%" 
        color="white"
        position="absolute"
        top={0}
        right={0}
        borderWidth={1}
      />
    </div>
  );
} 