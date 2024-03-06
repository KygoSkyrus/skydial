import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { io } from "socket.io-client";
import { v4 as uuidv4 } from 'uuid';
import Peer from "simple-peer"




// const socket = io('http://localhost:3006', { autoConnect: false }); // getting this out of the compoments bvcz when it was in,,it used to create a new seocket on every rerender

// //listens to every socket events
// socket.onAny((event, ...args) => {
//     // console.log('triggered event :- ', event, args);
// });



const DialPage = ({ socket }) => {
    const { dialId } = useParams();

    const location = useLocation();
    const hasUserJoined = location.state?.hasUserJoined;
    const myName = location.state?.myName;
    console.log("location.state", location.state)

    const [localStream, setLocalStream] = useState(null);
    const [mySocketId, setMySocketId] = useState(null);

    const [receivingCall, setReceivingCall] = useState(false)
    const [caller, setCaller] = useState("")//chnage to callerId 
    const [callerSignal, setCallerSignal] = useState()
    const [callerName, setCallerName] = useState("")//chnage to callerName
    const [callAccepted, setCallAccepted] = useState(false)
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

        // if (hasUserJoined) {
        //     callUser();
        // }

        // socket.emit('join-room', { userId: uId, dialId })
        socket.on("on:connection", handleConnection);
        socket.on("callUser", (data) => {
            setReceivingCall(true)
            setCaller(data.from)
            setCallerName(data.name)
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
        if (hasUserJoined) {
            console.log('about to run calluser', dialId)
            callUser(dialId);
        }
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
                name: myName
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
                    <div className='w-full h-full relative'>
                        {callAccepted && !callEnded ?
                            <video ref={remoteVideoRef} playsInline autoPlay className='border border-gray-400 rounded-lg shadow-sm'></video>
                            :
                            null}
                        <video ref={myVideoRef} playsInline autoPlay muted className={`w-full h-full border border-gray-400 rounded-lg shadow-sm`}></video>

                        <div className='w-full absolute bottom-4 flex justify-center items-center gap-3'>
                            <section className='border hover:border-gray-900 border-gray-500 text-white p-2 cursor-pointer rounded-2xl px-3'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
                                </svg>

                            </section>

                            <section className='border hover:border-gray-900 border-gray-500 text-white p-2 cursor-pointer rounded-2xl px-3'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                                </svg>

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hidden">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M12 18.75H4.5a2.25 2.25 0 0 1-2.25-2.25V9m12.841 9.091L16.5 19.5m-1.409-1.409c.407-.407.659-.97.659-1.591v-9a2.25 2.25 0 0 0-2.25-2.25h-9c-.621 0-1.184.252-1.591.659m12.182 12.182L2.909 5.909M1.5 4.5l1.409 1.409" />
                                </svg>
                            </section>

                            <section className='bg-red-600 text-white p-2 cursor-pointer rounded-2xl px-3'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 3.75 18 6m0 0 2.25 2.25M18 6l2.25-2.25M18 6l-2.25 2.25m1.5 13.5c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 0 1 4.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 0 0-.38 1.21 12.035 12.035 0 0 0 7.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 0 1 1.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 0 1-2.25 2.25h-2.25Z" />
                                </svg>
                            </section>
                        </div>
                    </div>


                </div>



                <div>



                    <div className="call-button">
                        {callAccepted && !callEnded ? (
                            <button variant="contained" color="secondary" onClick={endCall}>
                                End Call
                            </button>
                        ) : (
                            <button color="primary" aria-label="call" onClick={() => callUser(dialId)}>
                                call
                            </button>
                        )}
                        {dialId}
                    </div>



                    <div>
                        {receivingCall && !callAccepted ? (
                            <div className="caller">
                                <h1 >{callerName} is calling...</h1>
                                <button variant="contained" color="primary" onClick={answerCall}>
                                    Answer
                                </button>
                            </div>
                        ) : null}
                    </div>

                </div>

                <div className="flex justify-between p-2 w-full text-white">
                    <button className='bg-violet-500 px-4 py-2 rounded-xl'>{myName}</button>
                    <button onClick={e => navigator.clipboard.writeText(mySocketId)}>Invite people</button>
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
