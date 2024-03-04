import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { io } from "socket.io-client";
import { v4 as uuidv4 } from 'uuid';
import Peer from "simple-peer"




const socket = io('http://localhost:3006', { autoConnect: false }); // getting this out of the compoments bvcz when it was in,,it used to create a new seocket on every rerender

//listens to every socket events
socket.onAny((event, ...args) => {
    // console.log('triggered event :- ', event, args);
});



const DialPage = () => {
    const { dialId } = useParams();
    console.log("maychhc", dialId)

    const [localStream, setLocalStream] = useState(null);
    const [mySocketId, setMySocketId] = useState(null);

    const [receivingCall, setReceivingCall] = useState(false)
    const [caller, setCaller] = useState("")//chnage to callerId 
    const [callerSignal, setCallerSignal] = useState()
    const [name, setName] = useState("")//chnage to callerName
    const [callAccepted, setCallAccepted] = useState(false)
    const [idToCall, setIdToCall] = useState("")
    const [callEnded, setCallEnded] = useState(false)
    const connectionRef = useRef()



    const [msg, setMsg] = useState("")
    const myVideoRef = useRef();
    const remoteVideoRef = useRef();

    // SHOW caller's video when he starts a call
    useEffect(() => {

        const startCall = async () => {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            setLocalStream(stream);
            myVideoRef.current.srcObject = stream;
        }
        startCall()
        // const uId = uuidv4();


        // connectSocket();
        socket.connect();

        socket.on("connect", () => {
            // console.log('connetxttxtxtx',socket.id)//gives the socket it
        });

        // socket.emit('join-room', { userId: uId, dialId })
        socket.on("on:connection", handleConnection);
        socket.on("callUser", (data) => {
            setReceivingCall(true)
            setCaller(data.from)
            setName(data.name)
            setCallerSignal(data.signal)
        })

        socket.on("msg", recievedMsg)

        return () => {
            socket.disconnect();
            socket.off("on:connection", handleConnection);
        };

    }, [])

    const handleConnection = (socketId) => {
        console.log(`handleUserJoined____Email ${socketId} joined room`);
        setMySocketId(socketId)
        // setCalleeId(id);
    };

    const answerCall = () => {
        setCallAccepted(true)
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: localStream
        })
        peer.on("signal", (data) => {
            socket.emit("answerCall", { signal: data, to: caller })
        })
        peer.on("stream", (stream) => {
            remoteVideoRef.current.srcObject = stream
        })

        peer.signal(callerSignal)
        connectionRef.current = peer
    }

    const callUser = (id) => {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: localStream
        })
        peer.on("signal", (data) => {
            socket.emit("callUser", {
                userToCall: id,
                signalData: data,
                from: mySocketId,
                name: name
            })
        })
        peer.on("stream", (stream) => {
            remoteVideoRef.current.srcObject = stream
        })
        socket.on("callAccepted", (signal) => {
            setCallAccepted(true)
            peer.signal(signal)
        })

        connectionRef.current = peer
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


    const endCall = () => {
        setCallEnded(true)
        console.log('ref', connectionRef.current)
        connectionRef.current.destroy()
    }

    return (
        <>
            <div className='p-8 dark bg-slate-950 bg-zinc-950 flex flex-col justify-center items-center h-dvh text-purple-600 '>

                <div className="flex justify-center rounded-md border border-gray-500 p-3 mb-10 h-3/4 w-full">
                    {callAccepted && !callEnded ?
                        <video ref={remoteVideoRef} playsInline autoPlay className='border border-gray-400 rounded-lg shadow-sm'></video>
                        :
                        null}
                    <video ref={myVideoRef} playsInline autoPlay muted className='border border-gray-400 rounded-lg shadow-sm'></video>
                </div>



                <div>

                    <div>
                        <input className='py-2 px-3 rounded-md focus:outline-none border focus:border-purple-500' type='text' onChange={e => setName(e.target.value)} value={name} placeholder='your name' />

                    </div>

                    <div className="call-button">
                        {callAccepted && !callEnded ? (
                            <button variant="contained" color="secondary" onClick={endCall}>
                                End Call
                            </button>
                        ) : (
                            <button color="primary" aria-label="call" onClick={() => callUser(idToCall)}>
                                call
                            </button>
                        )}
                        {idToCall}
                    </div>
                    <div><button onClick={e => navigator.clipboard.writeText(mySocketId)}>Share call url</button></div>

                    <div>
                        <input type='text' placeholder='enter caller id' value={idToCall}
                            onChange={(e) => setIdToCall(e.target.value)} />
                    </div>

                    <div>
                        {receivingCall && !callAccepted ? (
                            <div className="caller">
                                <h1 >{name} is calling...</h1>
                                <button variant="contained" color="primary" onClick={answerCall}>
                                    Answer
                                </button>
                            </div>
                        ) : null}
                    </div>

                </div>

                {/* <div>
                    <input type='text' value={msg} onChange={e => setMsg(e.target.value)} />
                    <button onClick={sendMsg}>Send MSG</button>
                </div>

                <div>
                    <h4>recieved msg</h4>
                    <ul className='list'></ul>
                </div> */}

            </div>
        </>
    );
};

export default DialPage;
