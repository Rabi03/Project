/* eslint-disable react/jsx-no-target-blank */
import React from "react";

import CardMedia from "@material-ui/core/CardMedia";

export default function CardImage({ image }) {
  return (
    <div className='project-container'>
      <CardMedia image={image} className='project-img' />
      <p className='overlay'></p>
      <a href='https://chatter-app.webflow.io/' target='_blank'>
        <button className='btn btn-primary project-button'>View Project</button>
      </a>
    </div>
  );
}
