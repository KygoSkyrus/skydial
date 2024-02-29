import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { io } from "socket.io-client";
import { v4 as uuidv4 } from 'uuid';

import peer from './webRTCService'
// import { useSocket } from './SocketContext';




const socket = io('http://localhost:3000', { autoConnect: false }); // getting this out of the compoments bvcz when it was in,,it used to create a new seocket on every rerender

//listens to every socket events
socket.onAny((event, ...args) => {
    // console.log('triggered event :- ', event, args);
});



const DialPage = () => {
    const { dialId } = useParams();
    console.log("maychhc", dialId)

    const [localStream, setLocalStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null);
    const [userId, setUserId] = useState(null);
    const [calleeId, setCalleeId] = useState(null)

    const [msg, setMsg] = useState("")
    const myVideoRef = useRef();
    const remoteVideoRef = useRef();

    // SHOW caller's video when he starts a call
    useEffect(() => {
        // console.log('socket', socket)


        const startCall = async () => {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            setLocalStream(stream);
            myVideoRef.current.srcObject = stream;
        }
        startCall()
        const uId = uuidv4();
        setUserId(uId)


        // connectSocket();
        socket.connect();

        socket.emit('join-room', { userId: uId, dialId })


        // socket.emit('join-room', { userId: uId, dialId })
        socket.on("user:joined", handleUserJoined);
        socket.on("offer_recieved", handleOfferReq)
        socket.on("offer_resolved", handleOfferAcceptance)
        socket.on("msg", recievedMsg)

        return () => {
            socket.disconnect();
            socket.off("user:joined", handleUserJoined);
            socket.off("offer_recieved", handleOfferReq)
            socket.on("offer_resolved", handleOfferAcceptance)
            socket.off("msg", recievedMsg)
        };


        // socket.on('connect', onConnect);
        // socket.on('disconnect', onDisconnect);    
        // return () => {
        //   socket.off('connect', onConnect);
        //   socket.off('disconnect', onDisconnect);
        // };
    }, [])

    const handleUserJoined = ({ id }) => {
        console.log(`handleUserJoined____Email ${id} joined room`);
        setCalleeId(id);

        sendOffer(id)//sending offer when user joins
    }

    async function sendOffer(id) {
        console.log('sendOffer', id)
        const offer = await peer.getOffer();//doing the stuff of handlecalluser.. creating and sending an offer when user joins a room
        console.log('offerr', offer, socket)
        socket.emit("offer:req", { offer, to: id })
    }


    const sendStreams = useCallback(async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setLocalStream(stream);
        myVideoRef.current.srcObject = stream;

        for (const track of stream.getTracks()) {
            peer.peer.addTrack(track, stream);
        }
    }, []);


    const handleOfferReq = async (data) => {
        console.log('handleOfferReq',data.to)
        const ans = await peer.getAnswer(data.offer)
        socket.emit("offer_accepted", { answer: ans, to: data.to })
    }

    const handleOfferAcceptance = async (data) => {
        // this is not running
        console.log('__handleOfferAcceptance')
        peer.setLocalDescription(data.answer)
        sendStreams();
    }


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

    const sendMsg = () => {
        socket.emit("msg", { msg, to: dialId })
    }

    const recievedMsg = (data) => {
        console.log('data', data)
        const list = document.querySelector('.list')
        const newItem = document.createElement('li');
        newItem.textContent = data.msg;
        list.append(newItem)
    }

    const connectSocket = useCallback(
        (e) => {
            socket.connect()//needed when autoconnect is false, connect only when user is authenticated

            //   room created
            socket.on("connect", () => {
                console.log('connetxttxtxtx')
            });
            //   socket.emit("create_room", { userId, dialId });
        },
        [userId, dialId, socket]
    );

    function connect() {
        socket.connect();
    }

    function disconnect() {
        socket.disconnect();
    }

    const pickCall = () => { }

    return (
        <>
            <div>
                <video ref={myVideoRef} autoPlay muted style={{ width: '200px', height: '150px', border: "2px solid #fff" }}></video>
                <video ref={remoteVideoRef} autoPlay style={{ width: '200px', height: '150px', border: "2px solid #fff" }}></video>
                <div>
                    <button onClick={pickCall}>PICK UP</button>
                    <button >End Call</button>
                </div>
            </div>

            <button onClick={disconnect}>Disconnect</button>

            <div>
                <input type='text' value={msg} onChange={e => setMsg(e.target.value)} />
                <button onClick={sendMsg}>Send MSG</button>
            </div>


            <div>
                <h4>recieved msg</h4>
                <ul className='list'></ul>
            </div>


        </>
    );
};

export default DialPage;
