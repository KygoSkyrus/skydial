"use client"
import React, { useState, useEffect, useRef } from 'react';
import RTCPeerConnection from 'react-webrtc';
// import Layout from '../layout';

const CallPage = ({ roomId }) => {
    console.log('roomid',roomId)
  const peerRef = useRef(null);
  const [remoteStream, setRemoteStream] = useState(null);

  useEffect(() => {
    // Initialize peer connection and connect to Socket.io using the roomId
    // ...
  }, [roomId]);

  const handleIceCandidate = (event) => {
    // Send ICE candidates to the other peer via Socket.io
  };

  const handleRemoteStream = (event) => {
    setRemoteStream(event.stream);
  };

  return (
    <div>
      <RTCPeerConnection
        ref={peerRef}
        onIceCandidate={handleIceCandidate}
        onaddstream={handleRemoteStream}
      />
      {/* Display local and remote video streams */}
      {/* ... */}
    </div>
  );
};

export default CallPage;
