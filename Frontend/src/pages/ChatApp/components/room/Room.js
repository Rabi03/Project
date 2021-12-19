/* eslint-disable import/newline-after-import */
/* eslint-disable no-unused-vars */
import { useEffect, useState, lazy, useContext } from "react";
import { useParams, useHistory,Link } from "react-router-dom";
import moment from "moment";
import { firebaseApp } from "../../firebase";
import RoomHeader from "./RoomHeader";
import RoomBody from "./RoomBody";
import RoomInput from "./RoomInput";
import InfoBar from "../InfoBar/InfoBar";
import { AuthContext } from "../../../../Context/Auth";
import Announcement from "../../pages/Announcement/Announcement";
const Sidebar = lazy(() => import("../sidebar/Sidebar"));

export default function Room() {
  const history = useHistory();
  const [seed, setSeed] = useState("");
  const [roomData, setRoomData] = useState({});
  const [messagesState, setMessagesState] = useState({});
  const [memberOpen,setMemberOpen] = useState(false)
  const { user } = useContext(AuthContext);
  const { roomId } = useParams([]);
  const [RoomID, setRoomID] = useState(roomId);
  const [OpenInfo, setOpenInfo] = useState(true);
  const timeSource = (message) => new Date(message);
  const [OpenPost, setOpenPost] = useState(false);
  const [OpenChat, setOpenChat] = useState(true);
  const [OpenFile, setOpenFile] = useState(false);
  const RoomRef = firebaseApp.database().ref("rooms").child(RoomID);

  const OpenOrClosePost = () => {
    setOpenPost(true);
    setOpenChat(false);
    setOpenInfo(false);
    setOpenFile(false);
    setMemberOpen(false);
  };
  const OpenOrCloseChat = () => {
    setOpenPost(false);
    setOpenChat(true);
    setOpenInfo(true);
    setOpenFile(false);
    setMemberOpen(false);
  };

  const handleOpenFile = () => {
    setOpenFile(true);
    setOpenPost(false);
    setOpenChat(false);
    setOpenInfo(false);
    setMemberOpen(false);
  };

  const handleOpenMember=() => {
    setOpenFile(false);
    setOpenPost(false);
    setOpenChat(false);
    setOpenInfo(false);
    setMemberOpen(true);
  }

  const handleCloseInfo = () => {
    setOpenInfo(!OpenInfo);
  };

  const showDate = (message) => {
    if (moment(timeSource(message)).fromNow(false) > moment().calendar()) {
      return moment(timeSource(message)).fromNow(false);
    }
    return moment(timeSource(message)).calendar();
  };

  const getRoomData = () =>
    RoomRef.on("value", (snap) => setRoomData(snap.val()));

  useEffect(() => {
    if (user && roomId) {
      getRoomData();
    } else history.push("/");
    return () => RoomRef.off();
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));

    return function cleanup() {
      setSeed(Math.floor(Math.random() * 5000));
    };
  }, []);

  if(roomId==='12345'){
    return <div className="container" style={{marginTop:50}}>
    <div className="row">
        <div className="col-md-12">
            <div style={{padding:'40px 15px',textAlign:'center'}}>
                <h1>
                    Oops!</h1>
                <h2>
                    You have not joined any group</h2>
                <div className="error-details">
                    Try to find group and join with them.
                </div>
                <div className="error-actions">
                    <Link to="/home" className="btn btn-primary btn-lg"><span className="glyphicon glyphicon-home"></span>
                       Go Back </Link><Link to="/help" className="btn btn-default btn-lg"><span className="glyphicon glyphicon-envelope"></span> Take me Home </Link>
                </div>
            </div>
        </div>
    </div>
</div>
  }

  else return (
    <>
      <Sidebar handleRoomID={(id) => setRoomID(id)} />
      <div
        className='room'
        style={{ flex: OpenInfo ? "0.8" : "1", padding: OpenPost && "0px" }}
      >
        {OpenPost || OpenFile ||memberOpen? (
          <Announcement
            user={user}
            roomID={RoomID}
            userImage={roomData.avatar}
            OpenOrCloseChat={OpenOrCloseChat}
            OpenOrClosePost={OpenOrClosePost}
            OpenAccouncemnet={OpenPost}
            OpenFile={OpenFile}
            memberOpen={memberOpen}
            roomName={roomData && roomData.name}
            handleOpenFile={handleOpenFile}
            handleOpenMember={handleOpenMember}
            images={roomData.images}
            files={roomData.files}
            roomData={roomData}
          />
        ) : OpenChat ? (
          <>
            <RoomHeader
              user={user}
              seed={seed}
              roomName={roomData && roomData.name}
              zoomLink={roomData && roomData.zoomLink}
              avatar={roomData && roomData.avatar}
              roomId={roomId}
              showDate={showDate}
              handleCloseInfo={handleCloseInfo}
              OpenOrClosePost={OpenOrClosePost}
              handleOpenFile={handleOpenFile}
              handleOpenMember={handleOpenMember}
              OpenInfo={OpenInfo}
            />

            <RoomBody
              roomId={roomId}
              messages={roomData && roomData.messages}
              showDate={showDate}
              user={user}
            />

            <RoomInput roomId={roomId} user={user} />
          </>
        ) : (
          <div>Members</div>
        )}
      </div>

      {OpenInfo && (
        <InfoBar
          roomName={roomData && roomData.name}
          roomId={roomId}
          data={roomData}
        />
      )}
    </>
  );
}
