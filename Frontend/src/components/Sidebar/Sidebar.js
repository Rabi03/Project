/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import { gql, useQuery } from "@apollo/client";

import s from "./Sidebar.module.scss";
import LinksGroup from "./LinksGroup";

import axios from "axios";
import { AuthContext } from "../../Context/Auth";

export default function Sidebar() {
  const { user } = useContext(AuthContext);

  const {
    loading,
    error,
    data: info,
  } = useQuery(GET_USER, {
    onError(err) {
      console.log(err);
    },
    variables: { username: user.username },
  });

  console.log(info);
  return (
    <div className={s.root}>
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
          link='/home'
          index='home'
        />
        <LinksGroup
          header='User Profile'
          isHeader
          iconName={
            <img
              src='https://img.icons8.com/color/48/000000/circled-user-male-skin-type-5--v1.png'
              alt=''
              width='25'
            />
          }
          link={`/profile/${user.id}`}
          index='profile'
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
          link='/friends'
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
          link='/groups'
          index='group'
        />
        <LinksGroup
          header='Project Store'
          isHeader
          iconName={
            <img
              src='https://img.icons8.com/color/48/000000/ms-share-point.png'
              alt=''
              width='26'
            />
          }
          link='/store'
          index='store'
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
          link='/saved'
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
          link={`/rooms/${
            info&&
            info.getUserByUsername.rooms.length > 0 ?
            info.getUserByUsername.rooms[0].roomId:12345
          }`}
          index='message'
        />
      </ul>
    </div>
  );
}

const GET_USER = gql`
  query getUserByUsername($username: String!) {
    getUserByUsername(username: $username) {
      rooms
    }
  }
`;
