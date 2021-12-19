/* eslint-disable react/no-array-index-key */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/button-has-type */
/* eslint-disable import/newline-after-import */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-has-content */
 
import React, { useState } from "react";
import InfoOption from "./InfoOptions";
import {Link} from 'react-router-dom'

export default function InfoUserSettings({ members, id,memberKey,admin }) {
  const [seeMember, setSeeMember] = useState(false);
  return (
    <>
      <div style={{ padding: "0px 8px", marginTop: "5px" }}>
        <button
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            border: "0px",
            cursor: "pointer",
            backgroundColor: "#132c33 ",
            color: "white",
          }}
          onClick={() => setSeeMember(!seeMember)}
        >
          <h6>Project members</h6>
          <i
            className={[
              "fas",
              seeMember ? "fa-angle-down" : "fa-angle-left",
            ].join(" ")}
            style={{ fontSize: "20px" }}
          ></i>
        </button>
        {seeMember && (
          <div style={{ marginTop: "3px" }}>
            {memberKey &&
              memberKey.map((member, index) => (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderRadius: "10px",
                    color: "white",
                    paddingRight: "10px",
                  }}
                  className='member'
                >
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      padding: "0px 5px",
                      width: "100%",
                    }}
                    className='member-card'
                  >
                    <img
                      src={members[member].avatar}
                      alt='message-attachment'
                      width='35'
                      height='35'
                      style={{ borderRadius: "17px", marginRight: "5px" }}
                    />
                    <div>
                      <Link to={`/profile/${members[member].userId}`} style={{marginBottom: "0px"}}>{members[member].name}</Link>
                      <p style={{ fontSize: "10px" }}>{members[member].role}</p>
                    </div>
                  </div>
                  {members[member].role.localeCompare("Member") === 0 && (
                    <i
                      className='fas fa-trash delete-member'
                      style={{
                        marginRight: "5px",
                        cursor: "pointer",
                        marginLeft: "10px",
                      }}
                    ></i>
                  )}
                </div>
              ))}
          </div>
        )}
      </div>
      <InfoOption members={members} id={id} admin={admin} />
    </>
  );
}
