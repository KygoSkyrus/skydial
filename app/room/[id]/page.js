"use client"
import React, { useState, useEffect, useRef } from 'react';

const CallPage = ({ params }) => {
    console.log('params', params)
    const peerRef = useRef(null);
    const [remoteStream, setRemoteStream] = useState(null);

    useEffect(() => {
        // Initialize peer connection and connect to Socket.io using the id
        // ...
    }, []);

    const handleIceCandidate = (event) => {
        // Send ICE candidates to the other peer via Socket.io
    };

    const handleRemoteStream = (event) => {
        setRemoteStream(event.stream);
    };

    return (
        <main className="">


            <div className="border">

            id page: {params.id}
            </div>


        </main>
    );
};

export default CallPage;
