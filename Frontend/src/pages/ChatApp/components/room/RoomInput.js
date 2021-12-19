/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useContext, useState } from "react";
import { firebaseApp } from "../../firebase";
import EmojiPicker from "../../globals/EmojiPicker";
import { AuthContext } from "../../../../Context/Auth";
import uid from "uuid/dist/v4";

const RoomInput = ({ roomId, user }) => {
  const [message, setMessage] = useState("");
  const RoomRef = firebaseApp.database().ref("rooms");
  const storageRef=firebaseApp.storage().ref().child('messenger/images/'+uid()+'.jpg')

  const addEmoji = (emoji) => {
    setMessage(message + emoji.native);
  };

  const UploadImage = (e) => {
    const file = e.target.files[0];
    storageRef.put(file).then(function(result){
      storageRef.getDownloadURL().then(function(result){
        console.log("image",result)
        RoomRef.child(roomId)
        .child("messages")
        .push({
          image: result,
          name: user.fName,
          avatar: user.photoUrl,
          uid: user.id,
          timestamp: Date.now(),
        })
        .then((snap) => {
          RoomRef.child(roomId)
            .child("messageUpdate")
            .set(Date.now());
        })
        .catch((err) => console.error("Error writing document: ", err));

      RoomRef.child(roomId).child("images").push(result);
        
      })
      .catch(err=>{
        console.log(err)
      }) 
  })
    .catch(err=>{
      console.log(err)
    })

  };

  const FileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      RoomRef.child(roomId)
        .child("messages")
        .push({
          file: {
            name: file.name.toString(),
            data: reader.result,
          },
          name: user.fName,
          avatar: user.photoUrl,
          uid: user.id,
          timestamp: Date.now(),
        })
        .then((snap) => {
          RoomRef.child(roomId)
            .child("messageUpdate")
            .set(Date.now());
        })
        .catch((err) => console.error("Error writing document: ", err));

      RoomRef.child(roomId).child("files").push({
        filename: file.name.toString(),
        data: reader.result,
      });
    };
  };

  const createMessage = () => {
    RoomRef.child(roomId)
      .child("messages")
      .push({
        message,
        name: user.fName,
        avatar: user.photoUrl,
        uid: user.id,
        timestamp: Date.now(),
      })
      .then((snap) => {
        RoomRef.child(roomId)
          .child("messageUpdate")
          .set(Date.now());
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createMessage();

    setMessage("");
  };

  return (
    <>
      <form className='message-form' onSubmit={handleSubmit}>
        <input
          type='text'
          className='message-input'
          placeholder='Send a message...'
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onSubmit={handleSubmit}
        />

        <input
          type='file'
          multiple={false}
          id='upload-button'
          style={{ display: "none" }}
          onChange={UploadImage}
          accept="image/*"
        />
        <input
          type='file'
          multiple={false}
          id='upload-file-button'
          style={{ display: "none" }}
          onChange={FileUpload}
        />
        {/* <i
          className='fas fa-smile picture-icon'
          style={{ color: '#F7B928', cursor: 'pointer' }}
          onClick={() => setEmoji(!openEmoji)}
        ></i> */}
        <EmojiPicker
          addEmoji={addEmoji}
          style={{ marginTop: "-7px", color: "yellow" }}
        />

        <label htmlFor='upload-button'>
          <span className='image-button'>
            <i
              className='fas fa-image picture-icon'
              style={{ color: "#45BD62" }}
            ></i>
          </span>
        </label>
        <label htmlFor='upload-file-button'>
          <span className='image-button'>
            <i
              className='fas fa-folder picture-icon'
              style={{
                cursor: "pointer",
                color: "#fccc77",
              }}
            ></i>
          </span>
        </label>

        <i
          className='fas fa-paper-plane picture-icon'
          style={{ cursor: "pointer", marginLeft: "10px", color: "#3498DB " }}
          onClick={handleSubmit}
        ></i>
      </form>
    </>
  );
};

export default RoomInput;
