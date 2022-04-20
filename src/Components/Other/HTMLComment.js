import React from 'react';

export const ReactComment = ({ text }) => {
    return <div dangerouslySetInnerHTML={{__html: `<!-- ${text} -->` }} />;
}
