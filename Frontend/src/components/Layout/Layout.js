import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import img from '../../assets/shareEnd.png';

import s from './Layout.module.scss';

export default function Layout({ children }) {
  return (
    <div className={s.root}>
      <h1 style={{ position: 'fixed', marginLeft: '30px', marginTop: '5px' }}>
        <img src={img} alt='' width='120' />
      </h1>
      <div className={s.wrap}>
        <Header />
        <Sidebar />
        <main className={s.content}>
          <TransitionGroup>
            <CSSTransition key={1} classNames='fade' timeout={200}>
              {children}
            </CSSTransition>
          </TransitionGroup>
        </main>
      </div>
    </div>
  );
}
