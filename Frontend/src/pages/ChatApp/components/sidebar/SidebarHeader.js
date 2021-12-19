/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/self-closing-comp */
import { useContext, useState ,useEffect} from "react";
import { useHistory } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import Menu from "@material-ui/core/Menu";
import Avatar from "@material-ui/core/Avatar";
import MenuItem from "@material-ui/core/MenuItem";
import InputBase from "@material-ui/core/InputBase";
import firebase from "firebase/app";
import "firebase/firestore";
import db, { auth } from "../../firebase";
import { AuthContext } from "../../../../Context/Auth";
import Badge from "@material-ui/core/Badge";
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import Notifications from "../../../../components/Notifications/Notifications";
import s from "../../../../components/Header/Header.module.scss";
import Notification from "../../globals/Notification/Notification";
import {firebaseApp} from '../../firebase'

export default function SidebarHeader() {
  const { user } = useContext(AuthContext);
  const [supportOpen, setSupportOpen] = useState(false);
  const NotificationRef= firebaseApp.database().ref("notifications");
  const [unseen,setUnseen] = useState(0);
  const history = useHistory();
  const toggleSupportDropdown = () => {
    setSupportOpen(!supportOpen);
  };

  useEffect(() => {
    NotificationRef.child(user.id).child('unSeen').on('value',data=>setUnseen(data.val()))
    NotificationRef.child(user.id).child('unSeen').on('child_changed',snap=>{
      NotificationRef.child(user.id).child('unSeen').get().then(data=>setUnseen(data.val()))
    })
  },[user.id])

  const resetUnseen=() => {
    setUnseen(0)
    NotificationRef.child(user.id).child('unSeen').get().then(val=>{
      NotificationRef.child(user.id).child('unSeen').set(0)
    })
  }

  return (
    <div className='sidebar__header'>
      <div className='sidebar__headerMenu'>
        <h4
          style={{
            fontSize: "25px",
            fontWeight: "bold",
            marginTop: "5px",
            marginBottom: "20px",
            color: "white",
          }}
        >
          Chats
        </h4>
        <div
          style={{
            display: "flex",
          }}
        >
          <Dropdown
            id='basic-nav-dropdown'
            className={`${s.chatNotificationsMenu}`}
            isOpen={supportOpen}
            toggle={toggleSupportDropdown}
          >
            <DropdownToggle nav className={`${s.navItem} text-white`}>
              <Badge
                className='NavIcon'
                badgeContent={unseen}
                color='error'
                style={{ fontSize: "20px" }}
                onClick={resetUnseen}
              >
                <i
                  class='fas fa-bell'
                  style={{
                    color: "rgba(244,244,245,.8)",
                  }}
                ></i>
              </Badge>
            </DropdownToggle>
            <DropdownMenu
              className={`${s.notificationsWrapper} py-0 animate__animated animate__faster animate__fadeInUp`}
              style={{left:'0px',top:'30px'}}
            >
              <Notifications msg={5} tab={1} disable={true} />
            </DropdownMenu>
          </Dropdown>

          <Avatar
            src={user.photoUrl}
            style={{
              width: "25px",
              height: "25px",
              marginTop: "5px",
              marginLeft: "5px",
              cursor: "pointer",
            }}
            alt='Profilr Pic'
            onClick={() => history.push("/home")}
          />
        </div>
      </div>
      <div className='sidebar__search'>
        <div className='sidebar__searchContainer'>
          <SearchIcon />
          <InputBase
            inputProps={{ "aria-label": "search bar" }}
            placeholder='Search or start new room'
            type='text'
            style={{ color: "white" }}
          />
        </div>
      </div>
    </div>
  );
}
