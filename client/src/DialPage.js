import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { io } from "socket.io-client";
import { v4 as uuidv4 } from 'uuid';
import Peer from "simple-peer"
import Modal from './Modal';
import GetSVGIcon from './GetSVGIcon';


import InviteDiaglog from './InviteDialog';
import IncomingCallDIalog from './IncomingCallDIalog';


// const socket = io('http://localhost:3006', { autoConnect: false }); // getting this out of the compoments bvcz when it was in,,it used to create a new seocket on every rerender

// //listens to every socket events
// socket.onAny((event, ...args) => {
//     // console.log('triggered event :- ', event, args);
// });



const DialPage = ({ socket }) => {

    const { dialId } = useParams();
    const location = useLocation();

    const hasUserJoined = location.state?.hasUserJoined;
    // let myName = location.state?.myName;
    // console.log("location.state", location.state)
    const [myName, setMyName] = useState(location.state?.myName)

    const [localStream, setLocalStream] = useState(null);
    const [mySocketId, setMySocketId] = useState(null);

    const [receivingCall, setReceivingCall] = useState(false)
    const [caller, setCaller] = useState("")//chnage to callerId 
    const [callerSignal, setCallerSignal] = useState()
    const [callerName, setCallerName] = useState("user 77")//defaults to empty
    const [callAccepted, setCallAccepted] = useState(false)//defaults to false
    const [callEnded, setCallEnded] = useState(false)
    const connectionRef = useRef()



    const [msg, setMsg] = useState("")
    const [msgList, setMsgList] = useState([])
    const [chatPanelHidden, setChatPanelHidden] = useState(false)
    const [isCameraOn, setIsCameraOn] = useState(true)
    const [isAudioOn, setIsAudioOn] = useState(true)
    const myVideoRef = useRef();
    const remoteVideoRef = useRef();
    const chatBody = useRef()


    console.log('name in dial', myName)

    const startCall = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setLocalStream(stream);
        myVideoRef.current.srcObject = stream;
    }
    // SHOW caller's video when he starts a call
    useEffect(() => {

        if (!myName) {
            document.getElementById('call_dialog').showModal()
        }

        // startCall()
        // const uId = uuidv4();


        // connectSocket();
        socket.connect();

        socket.on("connect", () => {
            // console.log('connetxttxtxtx',socket.id)//gives the socket it
        });



        // socket.emit('join-room', { userId: uId, dialId })
        socket.on("on:connection", handleConnection);
        socket.on("call:incoming", handleIncomingCall)

        socket.on("msg", recievedMsg)

        return () => {
            socket.disconnect();
            socket.off("on:connection", handleConnection);
            socket.off("call:incoming", handleIncomingCall)

            socket.off("msg", recievedMsg)
        };

    }, [])

    const handleConnection = (socketId) => {
        console.log(`handleUserJoined____Email ${socketId} joined room`);
        setMySocketId(socketId)
        // setCalleeId(id);
        if (hasUserJoined) {
            console.log('about to run calluser', dialId)
            // callUser(dialId);
        }
    };

    const handleIncomingCall = (data) => {
        setReceivingCall(true)
        setCaller(data.from)
        setCallerName(data.name)
        setCallerSignal(data.signal)
    }

    const answerCall = () => {
        setCallAccepted(true)
        const newPeer = new Peer({
            initiator: false,
            trickle: false,
            stream: localStream
        })
        newPeer.on("signal", (data) => {
            socket.emit("answerCall", {
                signal: data, to: caller, name: myName
            })
        })
        newPeer.on("stream", (stream) => {
            remoteVideoRef.current.srcObject = stream
        })

        newPeer.signal(callerSignal)
        connectionRef.current = newPeer
    }

    const callUser = (id) => {
        const newPeer = new Peer({
            initiator: true,
            trickle: false,
            stream: localStream
        })
        newPeer.on("signal", (data) => {
            socket.emit("callUser", {
                userToCall: id,
                signalData: data,
                from: mySocketId,
                name: myName
            })
        })
        newPeer.on("stream", (stream) => {
            remoteVideoRef.current.srcObject = stream
        })
        socket.on("callAccepted", (data) => {
            setCallAccepted(true)
            newPeer.signal(data.signal)
            setCallerName(data.name)
        })

        connectionRef.current = newPeer
    }


    const sendMsg = () => {
        if (msg?.trim()) {
            const to = dialId === "initiator" ? caller : dialId
            // console.log('sendmsg', to)
            socket.emit("msg", { msg, to, from: mySocketId })
            // chatBody.current.append()
            // setMsgList([...msgList, { from: mySocketId, msg }])
            setMsgList(prevState => [...prevState, { from: mySocketId, msg }])
            setMsg('')
        }
    }

    const recievedMsg = (data) => {
        console.log('data', data)
        // const list = document.querySelector('.list')
        // const newItem = document.createElement('li');
        // newItem.textContent = data.msg;
        // list.append(newItem)

        // setMsgList([...msgList, { from: data.from, msg: data.msg }])
        setMsgList(prevState => [...prevState, { from: data.from, msg: data.msg }])

    }


    const endCall = () => {
        setCallEnded(true)
        console.log('ref', connectionRef.current)
        connectionRef.current?.destroy()
    }


    const toggleVideo = async () => {
        try {
            console.log('cammer', isCameraOn)
            localStream?.getVideoTracks().forEach((track) => {
                track.enabled = !isCameraOn;
            });

            // Update the video state
            setIsCameraOn(!isCameraOn);
        } catch (error) {
            console.error('Error toggling video:', error);
        }
    };

    const toggleAudio = async () => {
        try {
            console.log('audio', isAudioOn)
            localStream?.getAudioTracks().forEach((track) => {
                track.enabled = !isAudioOn;
            });

            // Update the video state
            setIsAudioOn(!isAudioOn);
        } catch (error) {
            console.error('Error toggling video:', error);
        }
    };

    useEffect(()=>{
        if(!(receivingCall && !callAccepted) ){
            document.getElementById('incomingCall_dialog').showModal()
        }
    },[receivingCall])

    return (
        <>
            <div className='p-4 sm:p-8 dark bg-slate-950 bg-zinc-950 flex flex-col sm:justify-center items-center h-dvh text-purple-600 '>

                <div className="flex justify-center gap-3 rounded-md border border-gray-500 p-3 mb-10 h-dvh sm:h-3/4 w-full">
                    <div className={`w-full ${chatPanelHidden ? 'absolute sm:relative -z-10 sm:z-0' : 'relative h-full'}`}>

                        {/* Video Local/Remote */}
                        {callAccepted && !callEnded ?
                            <video ref={remoteVideoRef} playsInline autoPlay className='border border-gray-500 rounded-lg shadow-sm w-full h-full'></video>
                            :
                            null}
                        <video ref={myVideoRef} playsInline autoPlay muted className={`border border-gray-500 rounded-lg shadow-sm ${callAccepted && !callEnded ? 'w-1/2 sm:w-1/4 absolute right-4 top-4 shadow-md' : 'w-full h-full'}`}></video>

                        {/* Chat Panel Toggler */}
                        {callAccepted && !callEnded &&
                            <section className={`w-2 h-9 bg-gray-800 rounded-md absolute top-1/2 right-4 cursor-pointer ${chatPanelHidden && 'hidden'}`} onClick={() => setChatPanelHidden(!chatPanelHidden)} title="Expand chat panel"></section>
                        }

                        {/* Stream Icons */}
                        <div className='w-full absolute bottom-4 flex justify-center items-center gap-3'>
                            <section className={`border hover:border-gray-900 border-gray-500 text-white p-2 cursor-pointer rounded-2xl px-3 ${!isAudioOn && 'bg-red-600 border-red-600'}`} onClick={toggleAudio} title={`Turn ${isAudioOn ? 'off' : 'on'} audio`}>
                                <section className={`relative mic ${!isAudioOn && 'after:absolute'}`}>
                                    <GetSVGIcon name="mic" />
                                </section>
                            </section>

                            <section className={`border hover:border-gray-900 border-gray-500 text-white p-2 cursor-pointer rounded-2xl px-3 ${!isCameraOn && 'bg-red-600 border-red-600'}`} onClick={toggleVideo} title={`Turn ${isCameraOn ? 'off' : 'on'} video`}>
                                <GetSVGIcon name={isCameraOn ? "camera_on" : "camera_off"} />
                            </section>

                            {callAccepted && !callEnded &&
                                <section className='bg-red-600 text-white p-2 cursor-pointer rounded-2xl px-3' onClick={endCall}>
                                    <GetSVGIcon name="end_call" />
                                </section>
                            }
                        </div>
                    </div>

                    {/* Chat Panel */}
                    {callAccepted && !callEnded && chatPanelHidden &&
                        <div className='flex flex-col border border-gray-500 rounded-md w-full sm:w-1/4 sm:min-w-80 h-full'>
                            <header className='bg-slate-900 p-4 flex justify-between w-full rounded-t-md border-b border-b-gray-500 text-gray-400'>
                                <div className='flex'>
                                    <GetSVGIcon name="chat" />
                                    <span>DG{callerName}</span>
                                </div>

                                <button className="btn btn-sm btn-circle btn-ghost text-gray-500" onClick={() => setChatPanelHidden(!chatPanelHidden)}>✕</button>
                            </header>

                            {/* Chat Body */}
                            <div className='chat_body h-auto flex-grow p-3 flex flex-col gap-2 overflow-y-auto' ref={chatBody}>
                                {msgList?.length > 0 ?
                                    msgList?.map((x, i) =>
                                        <section key={i} className={`bg-gray-700 text-gray-300 px-3 py-2 rounded-3xl w-fit break-all ${x.from === mySocketId ? 'self-end rounded-br-sm' : 'rounded-bl-sm bg-gray-500'}`} style={{ maxWidth: "80%" }}>
                                            {x.msg}
                                        </section>
                                    )
                                    :
                                    <section className='text-center text-gray-500 w-fit m-auto py-3 px-5 border border-gray-600 rounded-2xl relative msgIcon'>start messaging</section>
                                }
                            </div>

                            <div className='flex'>
                                <input type='text' value={msg} onChange={e => setMsg(e.target.value)} className='w-full rounded-l-md dark:border-gray-700 p-3 hover:border-none hover:outline-none focus:outline-none text-gray-950' placeholder='type...' onKeyUp={e => e.key === "Enter" && sendMsg()} />
                                <button onClick={sendMsg} className='py-2 px-3 font-semibold rounded-r dark:bg-violet-400 dark:text-gray-900'>
                                    <GetSVGIcon name="send" />
                                </button>
                            </div>

                        </div>
                    }
                </div>






                <div className="call-button">
                    {callAccepted && !callEnded ? (
                        <button variant="contained" color="secondary" onClick={endCall}>
                            End Call
                        </button>
                    ) : (
                        <button color="primary" aria-label="call" className='bg-gray-700 p-2 me-4 rounded' onClick={() => callUser(dialId)}>
                            call
                        </button>
                    )}
                    {dialId}
                </div>



                {/* <div>
                    {!(receivingCall && !callAccepted) ? (
                        <IncomingCallDIalog caller={callerName} answerCall={answerCall} />
                    ) : null}
                </div> */}



                {/* User/Dial Details */}
                <div className="flex flex-col sm:flex-row gap-2 justify-between p-2 w-full text-white">
                    {
                        callAccepted && !callEnded &&
                        <section className='flex justify-between border border-gray-500 px-4 py-2 rounded-xl'>
                            <span className='relative after:absolute after:bg-green-500 after:w-2 after:h-2 after:rounded-full online_dot'>
                                <GetSVGIcon name="phone" className='w-5 h-5 inline-block' />
                            </span>
                            <span className='ms-3' >{callerName}</span>
                        </section>
                    }
                    <button className='bg-violet-500 px-4 py-2 rounded-xl'>{myName}</button>
                    {
                        !(callAccepted && !callEnded) &&
                        <button
                            onClick={() => document.getElementById('invite_dialog').showModal()}
                        // onClick={e => navigator.clipboard.writeText(mySocketId)}
                        >
                            <span>Invite people</span>
                            <GetSVGIcon name="user_plus" />
                        </button>
                    }
                </div>


            </div>
            <InviteDiaglog mySocketId={socket.id} />
            <IncomingCallDIalog caller={callerName} answerCall={answerCall} />
            <Modal action={"set_name"} setName={setMyName} socketId={socket.id} />
        </>
    );
};

export default DialPage;