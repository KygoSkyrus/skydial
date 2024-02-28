import React, { useState, useEffect, useRef, useCallback } from 'react';
import peer from './webRTCService'
import { useParams } from 'react-router-dom';
// import { useSocket } from './SocketContext';
import { io } from "socket.io-client";




const socket = io('http://localhost:3000', { autoConnect: false }); // getting this out of the compoments bvcz when it was in,,it used to create a new seocket on every rerender

//listens to every socket events
socket.onAny((event, ...args) => {
    console.log('triggered event :- ', event, args);
});



const DialPage = (props) => {
    const { dialId } = useParams();
    const { userId } = props;
    console.log("maychhc", dialId)

    const [localStream, setLocalStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null);

    const myVideoRef = useRef();
    const remoteVideoRef = useRef();




    // SHOW caller's video when he starts a call
    useEffect(() => {


        console.log('socket', socket)

        handleSubmitForm();

        const startCall = async () => {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            setLocalStream(stream);
            myVideoRef.current.srcObject = stream;
        }
        // startCall()
    }, [])


    const handleSubmitForm = useCallback(
        (e) => {
            //   room created
            socket.on("connect", () => {
                console.log('connetxttxtxtx')
            });
            //   socket.emit("create_room", { userId, dialId });
        },
        [userId, dialId, socket]
    );

    const handleCallAccepted = async (offerRes) => {
        console.log('handleCallAccepted', offerRes)
        peer.setLocalDescription(offerRes)
        sendStreams();
    }

    const sendStreams = useCallback(async () => {
        // const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        // setLocalStream(stream);
        // myVideoRef.current.srcObject = stream;

        // for (const track of stream.getTracks()) {
        //     peer.peer.addTrack(track, stream);
        // }
    }, []);


    useEffect(() => {
        const handleIncoming = async () => {
            console.log('theOfferRequest')
            const ans = await peer.getAnswer()
        }
        // handleIncoming();
    }, [])

    useEffect(() => {
        peer.peer.addEventListener('track', async ev => {
            const remoteStream = ev.streams;
            console.log('trackkk', remoteStream)
            setRemoteStream(remoteStream)
            remoteVideoRef.current.srcObject = remoteStream[0];
        })
    }, [])

    const handleNegoNeeded = useCallback(async () => {
        const offer = await peer.getOffer();
    }, [])

    useEffect(() => {
        peer.peer.addEventListener('negotiationneeded', handleNegoNeeded)
        return () => {
            peer.peer.removeEventListener('negotiationneeded', handleNegoNeeded)
        }
    }, [])


    const handleNegoIncoming = async (negoOfferRes) => {
        const ans = await peer.getAnswer(negoOfferRes);

    }

    const handleNegoAccepted = async (negoOfferRes) => {
        await peer.setLocalDescription(negoOfferRes);
    }

    const pickCall = () => {

    }



    return (

        <div>
            <video ref={myVideoRef} autoPlay muted style={{ width: '200px', height: '150px', border: "2px solid #fff" }}></video>
            <video ref={remoteVideoRef} autoPlay style={{ width: '200px', height: '150px', border: "2px solid #fff" }}></video>
            <div>
                <button onClick={pickCall}>PICK UP</button>
                <button >End Call</button>
            </div>
        </div>

    );
};

export default DialPage;
