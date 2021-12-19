import React from 'react';
import cx from 'classnames';

import s from './Sidebar.module.scss';
import LinksGroup from './LinksGroup';
export default function PhoneSidebar() {
  return (
    <nav className={[cx(s.root), cx(s.sidebarOpen)].join(' ')}>
      <ul className={s.nav}>
        <LinksGroup
          header='Home'
          isHeader
          iconName={
            <img
              src='https://img.icons8.com/fluent/48/000000/home.png'
              alt=''
              width='25'
            />
          }
          link='/app/main'
          index='home'
        />

        <LinksGroup
          header='Friends'
          isHeader
          iconName={
            <img
              src='https://img.icons8.com/color/48/000000/user-group-woman-woman.png'
              alt=''
              width='25'
            />
          }
          link='/app/typography'
          index='friend'
        />
        <LinksGroup
          header='Groups'
          isHeader
          iconName={
            <img
              src='https://img.icons8.com/color/48/000000/group.png'
              alt=''
              width='30'
            />
          }
          link='/app/tables'
          index='group'
        />
        <LinksGroup
          header='Saved'
          isHeader
          iconName={
            <img
              src='https://img.icons8.com/fluent/48/000000/save.png'
              alt=''
              width='25'
            />
          }
          link='/app/components'
          index='save'
        />
        <LinksGroup
          header='Messenger'
          isHeader
          iconName={
            <img
              src='https://img.icons8.com/fluent/48/000000/facebook-messenger--v2.png'
              alt=''
              width='25'
            />
          }
          link='/app/components'
          index='save'
        />
        <LinksGroup
          header='My Idea'
          isHeader
          iconName={
            <img
              src='https://img.icons8.com/fluent/50/000000/idea-sharing.png'
              alt=''
              width='28'
            />
          }
          link='/app/components'
          index='save'
        />
      </ul>
    </nav>
  );
}
