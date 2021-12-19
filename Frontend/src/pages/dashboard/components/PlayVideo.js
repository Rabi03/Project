import React from 'react';

export default function PlayVideo({src}) {
  return (
    <video className='player-video' controls>
        <source src={src} type="video/mp4" />
      </video>
  );
}
