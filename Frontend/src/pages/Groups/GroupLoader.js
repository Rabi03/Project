import React from 'react';
import ContentLoader from 'react-content-loader';

export default function GroupLoader(props) {
  return (
    <ContentLoader
      style={{
        border: '0px',
        boxShadow: '4px 4px 4px 4px rgba(2,2,2,0.2)',
        display: 'block',
        marginBottom: '20px',
        padding: '20px',
        width: '20rem',
        borderRadius:'10px'
      }}
      // width={560}
      speed={1}
      height={180}
      viewBox='0 0 400 160'
      backgroundColor='#f3f3f3'
      foregroundColor='cyan'
      {...props}
    >
      <rect x='48' y='8' rx='3' ry='3' width='88' height='6' />
      <rect x='48' y='26' rx='3' ry='3' width='52' height='6' />
      <rect x='0' y='56' rx='3' ry='3' width='410' height='6' />
      <rect x='0' y='72' rx='3' ry='3' width='380' height='6' />
      <rect x='0' y='88' rx='3' ry='3' width='178' height='6' />
      <rect x='50' y='150' rx='3' ry='3' width='50' height='6' />
      <rect x='280' y='150' rx='3' ry='3' width='50' height='6' />
      <circle cx='20' cy='20' r='20' />
    </ContentLoader>
  );
}
