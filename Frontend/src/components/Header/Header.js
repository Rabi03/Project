import React, { useContext, useEffect, useState } from "react";
import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";
import Notifications from "../Notifications/Notifications";
import PowerIcon from "../Icons/HeaderIcons/PowerIcon";
import BurgerIcon from "../Icons/HeaderIcons/BurgerIcon";
import SearchIcon from "../Icons/HeaderIcons/SearchIcon";

import Badge from "@material-ui/core/Badge";
import { AuthContext } from "../../Context/Auth";

import s from "./Header.module.scss";
import "animate.css";
import PhoneSidebar from "../Sidebar/PhoneSidebar";
import Notification from "../../pages/ChatApp/globals/Notification/Notification";
import { firebaseApp } from "../../pages/ChatApp/firebase";

export default function Header() {
  const { user, logout } = useContext(AuthContext);

  const [messagesOpen, setMessagesOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isSidebarOpened, setIsSidebarOpened] = useState(false);
  const [NotificationRoom, setNotificationRoom] = useState({});
  const NotificationRef= firebaseApp.database().ref("notifications");
  const [unseen,setUnseen] = useState(0);

  useEffect(() => {
    NotificationRef.child(user.id).child('unSeen').on('value',data=>setUnseen(data.val()))
    NotificationRef.child(user.id).child('unSeen').on('child_changed',snap=>{
      NotificationRef.child(user.id).child('unSeen').get().then(data=>setUnseen(data.val()))
    })
  },[user.id])


  const handleNotification = (val) => setNotificationRoom(val);


  const toggleMessagesDropdown = () => {
    setMessagesOpen(!messagesOpen);
  };
  const toggleProfileDropdown = () => {
    setProfileOpen(!profileOpen);
  };

  const toggleSupportDropdown = () => {
    setSupportOpen(!supportOpen);
  };



  const toggleSearchOpen = () => {
    setSearchOpen(!searchOpen);
  };

  const resetUnseen=() => {
    setUnseen(0)
    NotificationRef.child(user.id).child('unSeen').get().then(val=>{
      NotificationRef.child(user.id).child('unSeen').set(0)
    })
  }

  return (
    <>
      <Navbar>
        <div className={s.burger}>
          <NavLink
            onClick={() => setIsSidebarOpened(!isSidebarOpened)}
            className={`d-md-none ${s.navItem} text-white`}
            href='#'
          >
            <BurgerIcon className={s.headerIcon} />
          </NavLink>
        </div>

        <div className={`d-print-none ${s.root}`}>

          <Nav className='ml-md-0'>
            <Dropdown
              className='d-sm-block'
              nav
              isOpen={profileOpen}
              toggle={toggleProfileDropdown}
            >
              <DropdownToggle
                nav
                style={{
                  color: "#C1C3CF",
                  padding: 0,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <span
                  className={`${s.avatar} rounded-circle thumb-sm float-left`}
                >
                  <img src={user && user.photoUrl} alt='...' />
                </span>
                <span className={`small d-sm-down-none ${s.accountCheck}`}>
                  {user && user.fName + " " + user.lName}
                </span>
              </DropdownToggle>
            </Dropdown>
            <NavItem className='d-lg-none'>
              <NavLink
                onClick={toggleSearchOpen}
                className={s.navItem}
                href='#'
              >
                <SearchIcon addId='header-search' className={s.headerIcon} />
              </NavLink>
            </NavItem>
            <NavItem className={`${s.divider} d-none d-sm-block`} />
            <Dropdown
              nav
              isOpen={messagesOpen}
              toggle={toggleMessagesDropdown}
              id='basic-nav-dropdown'
              className={`${s.notificationsMenu}`}
            >
              <DropdownToggle nav className={`${s.navItem} text-white`}>
                <Notification NotificationRoom={NotificationRoom} />
              </DropdownToggle>
              <DropdownMenu
                className={`${s.notificationsWrapper} py-0 animate__animated animate__faster animate__fadeInUp`}
              >
                <Notifications
                  msg={2}
                  tab={2}
                  handleNotification={handleNotification}
                />
              </DropdownMenu>
            </Dropdown>
            <Dropdown
              id='basic-nav-dropdown'
              className={`${s.notificationsMenu}`}
              nav
              isOpen={supportOpen}
              toggle={toggleSupportDropdown}
            >
              <DropdownToggle nav className={`${s.navItem} text-white`}>
                <Badge
                  className='NavIcon'
                  badgeContent={unseen}
                  color='error'
                  style={{ fontSize: "18px" }}
                  onClick={resetUnseen}
                >
                  <i
                    class='fas fa-bell'
                    style={{ color: "rgba(244,244,245,.8)" }}
                  ></i>
                </Badge>
              </DropdownToggle>
              <DropdownMenu
                className={`${s.notificationsWrapper} py-0 animate__animated animate__faster animate__fadeInUp`}
              >
                <Notifications msg={5} tab={1} />
              </DropdownMenu>
            </Dropdown>
            <NavItem>
              <NavLink
                className={`${s.navItem} d-sm-down-none  text-white`}
                href='#'
                onClick={logout}
              >
                <PowerIcon className={s.headerIcon} />
              </NavLink>
            </NavItem>
          </Nav>
        </div>
      </Navbar>
      {isSidebarOpened && <PhoneSidebar />}
    </>
  );
}

