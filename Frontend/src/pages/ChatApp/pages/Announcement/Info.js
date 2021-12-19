import React, { useState } from "react";
import ProjectBrief from "../../components/InfoBar/ProjectBrief";

export default function Info({roomData}) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div
      style={{
        width: "250px",
        border: "1px solid rgba(255, 255, 255, 0.05)",
        padding: "10px 10px",
        height:'150px'
      }}
      className="Announcement-info"
    >
      <h5>About</h5>
      <div style={{ alignItems: "center", marginTop: "8px" }}>
        <a
          href='http://github.com'
          target='_blank'
          rel='noopener noreferrer'
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            color: "white",
          }}
        >
          <p>Project Repository</p>
          <i
            className='fab fa-github'
            style={{
              color: "cyan",
              fontSize: "18px",
              marginLeft: "5px",
              textDecoration: "none",
            }}
          />
        </a>
        <p
          style={{
            marginTop: "10px",
            marginBottom: "5px",
            display: "flex",
            alignItems: "center",
          }}
        >
          Project Details
          <i
            role='button'
            className='fas fa-tasks'
            style={{
              color: "cyan",
              fontSize: "18px",
              marginLeft: "5px",
              marginTop: "3px",
              cursor: "pointer",
            }}
            onClick={handleClickOpen}
          />
        </p>
      </div>
      <ProjectBrief
        open={open}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        details={roomData.details}
      />
    </div>
  );
}
