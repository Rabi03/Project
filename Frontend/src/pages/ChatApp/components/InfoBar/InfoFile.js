/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-no-target-blank */
import React, { useState } from "react";

export default function InfoFile({ data }) {
  const [Checkphotos, SetCheckPhotos] = useState(false);
  const [Checkfiles, setCheckFiles] = useState(false);
  const ImageData = data.images ? Object.keys(data.images) : null;
  const FileData = data.files ? Object.keys(data.files) : null;

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
          onClick={() => SetCheckPhotos(!Checkphotos)}
        >
          <h6>Project Media</h6>
          <i
            className={[
              "fas",
              Checkphotos ? "fa-angle-down" : "fa-angle-left",
            ].join(" ")}
            style={{ fontSize: "20px" }}
          ></i>
        </button>
        {Checkphotos && data.images && (
          <div style={{ marginTop: "5px" }}>
            {ImageData.map((file, index) => (
              <img
                key={index}
                src={data.images[file]}
                alt='message-attachment'
                width='80'
                height='75'
                style={{ margin: "0px 2px" }}
              />
            ))}
          </div>
        )}

        <button
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            border: "0px",
            cursor: "pointer",
            marginTop: "5px",
            backgroundColor: "#132c33 ",
            color: "white",
          }}
          onClick={() => setCheckFiles(!Checkfiles)}
        >
          <h6>Project Files</h6>
          <i
            className={[
              "fas",
              Checkfiles ? "fa-angle-down" : "fa-angle-left",
            ].join(" ")}
            style={{ fontSize: "20px" }}
          ></i>
        </button>

        {Checkfiles && data.files && (
          <div style={{ marginTop: "0px", paddingLeft: "10px" }}>
            {FileData.map((file, index) => (
              <div
                key={index}
                style={{
                  marginBottom: "2px",
                  borderRadius: "20px",
                }}
              >
                <h5>
                  <a
                    style={{
                      display: "table-cell",
                      fontSize: "13px",
                      textDecoration: "underline",
                      color: "white",
                    }}
                    href={data.files[file].data}
                    target='_blank'
                    download
                  >
                    {data.files[file].filename}
                  </a>
                </h5>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
