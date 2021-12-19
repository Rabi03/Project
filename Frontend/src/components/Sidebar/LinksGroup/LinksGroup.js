/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import { useHistory } from 'react-router-dom'

import s from './LinksGroup.module.scss';


export default function LinksGroup(props) {
  let history = useHistory();
  
  
  
  
  const handleClick = e=> {
     history.push(props.link)
  }
  return (
    <li
      className={classnames(
        { [s.headerLink]: props.isHeader },
        props.className
      )}
      onClick={handleClick}
    >
      <a
        className={classnames(
          s.accordionToggle,
          'd-flex'
        )}
        style={{
          paddingLeft: `${
            props.deep === 0 ? 10 : 35 + 10 * (props.deep - 1)
          }px`,
        }}
        //href={props.link}
        
      >
        {props.isHeader ? (
          <span className={s.icon}>{props.iconName}</span>
        ) : null}
        {props.header}{' '}
        {props.label && (
          <sup
            className={`${s.headerLabel} text-${
              props.labelColor || 'warning'
            } ml-1`}
          >
            {props.label}
          </sup>
        )}
      </a>
    </li>
  );
}

