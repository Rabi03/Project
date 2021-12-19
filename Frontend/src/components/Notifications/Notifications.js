import React, { useState } from "react";
import { ButtonGroup, Button, Badge } from "reactstrap";
import NotificationsDemo from "./notifications-demo/Notifications";
import NewNotificationsDemo from "./notifications-demo/NewNotifications";
import MessagesDemo from "./notifications-demo/Messages";

import s from "./Notifications.module.scss";

export default function Notifications({
  tab,
  msg,
  disable = false,
  handleNotification,
}) {
  const [notificationsTabSelected, setNotificationsTabSelected] = useState(tab);
  const [newNotifications, setNewNotifications] = useState(null);
  const [isLoad, setIsLoad] = useState(false);

  const changeNotificationsTab = (tab) => {
    setNotificationsTabSelected(tab);
    setNewNotifications(null);
  };

  const loadNotifications = () => {
    setIsLoad(true);

    setTimeout(() => {
      setNewNotifications(() => <NewNotificationsDemo />);
      setIsLoad(false);
    }, 1500);
  };

  let notificationsTab;

  switch (notificationsTabSelected) {
    case 1:
      notificationsTab = <NotificationsDemo />;
      break;
    case 2:
      notificationsTab = (
        <MessagesDemo handleNotification={handleNotification} />
      );
      break;
    default:
      notificationsTab = <NotificationsDemo />;
      break;
  }
  return (
    <section className={`${s.notifications} navbar-notifications`}>
      {disable && (
        <header className={[s.cardHeader, "card-header"].join(" ")}>
          <h5 style={{ color: "white" }}>Notifications</h5>
        </header>
      )}
      {!disable && (
        <header className={[s.cardHeader, "card-header"].join(" ")}>
          <ButtonGroup className={s.notificationButtons}>
            <Button
              outline
              color='default'
              size='sm'
              className={s.notificationButton}
              onClick={() => changeNotificationsTab(1)}
              active={notificationsTabSelected === 1}
            >
              Notifications
            </Button>
            <Button
              outline
              color='default'
              size='sm'
              className={s.notificationButton}
              onClick={() => changeNotificationsTab(2)}
              active={notificationsTabSelected === 2}
            >
              Messages
            </Button>
            <Button
              outline
              color='default'
              size='sm'
              className={s.notificationButton}
              onClick={() => changeNotificationsTab(3)}
              active={notificationsTabSelected === 3}
            >
              Progress
            </Button>
          </ButtonGroup>
        </header>
      )}

      {newNotifications || notificationsTab}
      {notificationsTabSelected === 2 && (
        <footer className={[s.cardFooter, "text-sm", "card-footer"].join(" ")}>
          <button className={`${s.msg_link} btn-link`}>
            See All in Messenger
          </button>
        </footer>
      )}
    </section>
  );
}
