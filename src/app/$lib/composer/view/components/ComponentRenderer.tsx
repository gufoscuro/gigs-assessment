import React, { PropsWithChildren } from 'react'

const Renderer: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="text-sm font-bold">{children}</div>
    );
};

export default Renderer