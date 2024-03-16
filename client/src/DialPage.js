import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Peer from "simple-peer"

import GetSVGIcon from './GetSVGIcon';
import Modal from './Dialogs/Modal';
import InviteDiaglog from './Dialogs/InviteDialog';
import CommsDialog from './Dialogs/CommsDialog';



const DialPage = ({ socket }) => {

    const { dialId } = useParams();
    const location = useLocation();

    // const hasUserJoined = location.state?.hasUserJoined;// not needed as directly "initiator" param is being used instead
    const [myName, setMyName] = useState(location.state?.myName)

    const [localStream, setLocalStream] = useState(null);
    const [mySocketId, setMySocketId] = useState(null);

    const [receivingCall, setReceivingCall] = useState(false)
    const [callerId, setCallerId] = useState("")
    const [callerSignal, setCallerSignal] = useState()
    const [callerName, setCallerName] = useState("")
    const [callAccepted, setCallAccepted] = useState(false)
    const [callEnded, setCallEnded] = useState(false)
    const connectionRef = useRef()

    const [callAction, setCallAction] = useState('')
    const [showMessageNotification, setShowMessageNotification] = useState(false)

    const [msg, setMsg] = useState("")
    const [msgList, setMsgList] = useState([])
    const [isChatPanelHidden, setIsChatPanelHidden] = useState(true)
    const [isCameraOn, setIsCameraOn] = useState(true)
    const [isAudioOn, setIsAudioOn] = useState(true)
    const myVideoRef = useRef();
    const remoteVideoRef = useRef();
    const chatBody = useRef()



    const startCall = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setLocalStream(stream);
        myVideoRef.current.srcObject = stream;
    }
    // SHOW caller's video when he starts a call
    useEffect(() => {

        if (!myName) {
            document.getElementById('call_dialog')?.showModal()
        }

        startCall()
        // const uId = uuidv4();


        // connectSocket();
        socket.connect();

        socket.on("connect", () => {
            console.log('connetxttxtxtx', socket.id)//gives the socket it
            const test = document.getElementById('test')
            if (test)
                test.innerHTML = socket.id;
        });



        // socket.emit('join-room', { userId: uId, dialId })
        socket.on("on:connection", handleConnection);
        socket.on("call:incoming", handleIncomingCall)
        socket.on("call:declined", handleDeclinedCall)
        socket.on("call:end", handleCallEnd)


        socket.on("msg", recievedMsg)

        return () => {
            socket.disconnect();
            socket.off("on:connection", handleConnection);
            socket.off("call:incoming", handleIncomingCall)
            socket.off("call:declined", handleDeclinedCall)
            socket.off("call:end", handleCallEnd)

            socket.off("msg", recievedMsg)
        };

    }, [])

    const handleConnection = (socketId) => {
        console.log(`handleConnection ${socketId} SOCKET CREATED`);
        setMySocketId(socketId)
        // setCalleeId(id);
        // if (hasUserJoined) {
        //     console.log('about to run calluser', dialId)
        //     callUser(dialId);
        // }
    };


    useEffect(() => {
        // executing call user when user's socketId is set and user has entered his name (only for joiners)
        // if (hasUserJoined && mySocketId) {
        if (mySocketId && myName && dialId !== "initiator") {
            console.log('about to run calluser', dialId)
            callUser(dialId);
        }
    }, [mySocketId, myName])

    const handleIncomingCall = (data) => {
        console.log('handleIncomingCall', data)
        setReceivingCall(true)
        setCallerId(data.from)
        setCallerName(data.name)
        setCallerSignal(data.signal)
    }

    const handleCallEnd = (data) => {
        console.log('call ended')
        setCallAction('call_end')
        document.getElementById('comms_dialog')?.showModal()
    }

    const handleDeclinedCall = (data) => {
        // notification to user that his req is declined
        console.log('call is declined')
        setCallAction('call_declined')
        document.getElementById('comms_dialog')?.showModal()
    }

    const declineCall = () => {
        socket.emit("call:declined", { to: callerId, from: mySocketId, name: myName })
        document.getElementById("comms_dialog")?.close(); // closing dialog
        setReceivingCall(false)
        setCallerId("")
        setCallerName("")
        setCallerSignal("")
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
                signal: data, to: callerId, name: myName
            })
        })
        newPeer.on("stream", (stream) => {
            remoteVideoRef.current.srcObject = stream
        })

        newPeer.on("close", (data) => {
            console.log('close answercall', data)
            // setCallAction('call_declined')
            // document.getElementById('comms_dialog')?.showModal()
            // socket.emit("call:end", { to: callerId, from: mySocketId, name: myName })
        })

        newPeer.on('error', (error) => {
            console.log('errrrbha', error)
        })

        newPeer.signal(callerSignal)
        connectionRef.current = newPeer

        document.getElementById("comms_dialog")?.close() // closing dialog
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

        newPeer.on("close", (data) => {
            console.log('close calluser', data)
            // setCallAction('call_declined')
            // document.getElementById('comms_dialog')??.showModal()
            // socket.emit("call:end", { to: callerId, from: mySocketId, name: myName })
        })

        newPeer.on('error', (error) => {
            console.log('error', error)
        })

        connectionRef.current = newPeer
    }

    // NOTE : ERROR: when both peers has dial id in the url,, then msg is not wokring 
    const sendMsg = () => {
        if (msg?.trim()) {
            // try using only caller and dial it,, if anyone of them is true than use it
            // the problem is that when there is no initiator in url than it still uses dialid,,,whihc is obviously wring and is of not another user,,,so the solution can be is to use caller id always, and only use dialId if caller id is not there           
            const to = dialId === "initiator" ? callerId : dialId
            console.log('callerId', callerId)
            console.log('dialId', dialId)
            console.log("in sendmsg tooo")
            // console.log('sendmsg', to)
            socket.emit("msg", { msg, to, from: mySocketId })
            // chatBody.current.append()
            // setMsgList([...msgList, { from: mySocketId, msg }])
            setMsgList(prevState => [...prevState, { from: mySocketId, msg }])

            // let chatContainer=document.querySelector('.chat_body')
            // chatContainer.scrollTop = chatContainer.scrollHeight;

            // document.querySelector('.scroll_to_bottom')?.scrollIntoView({ behaviour: 'smooth' });
            setMsg('')
        }
    }

    const recievedMsg = (data) => {
        // console.log('normal', isChatPanelHidden)
        setIsChatPanelHidden(prev => {
            console.log('testtss', prev)
            if (prev) setShowMessageNotification(true) // updatimg this state here bcz in outer scope the ischatpanelstate didn't had updated value
            return prev
        })

        setMsgList(prevState => [...prevState, { from: data.from, msg: data.msg }])
    }

    useEffect(() => {
        setShowMessageNotification(false); // hide the notification badge whenever chat panel is toggled
    }, [isChatPanelHidden])

    useEffect(() => {
        const chatContainer = document.querySelector('.chat_body')
        if (chatContainer) chatContainer.scrollTop = chatContainer?.scrollHeight;
    }, [msgList])

    const endCall = () => {
        console.log('ref', connectionRef.current)
        console.log('callerId', callerId)
        const to = dialId === "initiator" ? callerId : dialId

        socket.emit("call:end", { to, from: mySocketId, name: myName })
        setCallEnded(true)

        connectionRef.current?.destroy()

        setCallAction('call_terminated')
        document.getElementById('comms_dialog')?.showModal()
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

    useEffect(() => {
        if ((receivingCall && !callAccepted)) {
            setCallAction('call_incoming')
            document.getElementById('comms_dialog')?.showModal()
        }
    }, [receivingCall])

    return (
        <>
            <div className='p-4 sm:p-8 dark bg-slate-950 bg-zinc-950 flex flex-col sm:justify-center items-center h-dvh text-purple-600 '>
                <button id='test'></button>
                {/* <h3 className='extra-bold'>SKYDIAL</h3> */}
                <div className="flex justify-center gap-3 rounded-md border border-gray-500 p-3 mb-10 h-dvh sm:h-3/4 w-full">
                    <div className={`w-full ${isChatPanelHidden ? 'relative h-full' : 'absolute sm:relative -z-10 sm:z-0'}`}>

                        {/* Video Local/Remote */}
                        {callAccepted && !callEnded ?
                            <video ref={remoteVideoRef} playsInline autoPlay className='border border-gray-500 rounded-lg shadow-sm w-full h-full'></video>
                            :
                            null}
                        <video ref={myVideoRef} playsInline autoPlay muted className={`border border-gray-500 rounded-lg shadow-sm ${callAccepted && !callEnded ? 'w-1/2 sm:w-1/4 absolute right-4 top-4 shadow-md' : 'w-full h-full'}`}></video>

                        {/* Chat Panel Toggler */}
                        {/* {callAccepted && !callEnded &&
                            <section className={`w-2 h-9 bg-gray-800 rounded-md absolute top-1/2 right-4 cursor-pointer ${!isChatPanelHidden && 'hidden'}`} onClick={() => setIsChatPanelHidden(prev => !prev)} title="Expand chat panel"></section>
                        } */}

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
                    {callAccepted && !callEnded && !isChatPanelHidden &&
                        <div className='flex flex-col border border-gray-500 rounded-md w-full sm:w-1/4 sm:min-w-80 h-full'>
                            <header className='bg-slate-900 p-4 flex justify-between w-full rounded-t-md border-b border-b-gray-500 text-gray-400'>
                                <div className='flex'>
                                    <GetSVGIcon name="chat" />
                                    <span className='ms-2'>{callerName}</span>
                                </div>

                                <button className="btn btn-sm btn-circle btn-ghost text-gray-500" onClick={() => setIsChatPanelHidden(prev => !prev)}>✕</button>
                            </header>

                            {/* Chat Body */}
                            <div className='chat_body h-auto flex-grow p-3 flex flex-col gap-2 overflow-y-auto' ref={chatBody}>
                                {msgList?.length > 0 ?
                                    msgList?.map((x, i) =>
                                        <section key={i} className={`text-gray-300 px-3 py-2 rounded-3xl w-fit break-all ${x.from === mySocketId ? 'self-end rounded-br-sm bg-gray-700' : 'rounded-bl-sm bg-gray-500'}`} style={{ maxWidth: "80%" }}>
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


                {/* <div className="call-button">
                    {!(callAccepted && !callEnded) &&
                        <button color="primary" aria-label="call" className='bg-gray-700 p-2 me-4 rounded' onClick={() => callUser(dialId)}>
                            call
                        </button>
                    }
                </div> */}


                {/* User 'n' Dial Details */}
                <div className="flex flex-col sm:flex-row gap-2 justify-between p-2 w-full text-white">
                    {
                        callAccepted && !callEnded &&
                        <div className='flex gap-2'>
                            <section className='flex flex-grow justify-between border border-gray-500 px-4 py-2 rounded-xl overflow-hidden'>
                                <span className='relative after:absolute after:bg-green-500 after:w-2 after:h-2 after:rounded-full online_dot'>
                                    <GetSVGIcon name="phone" className='w-5 h-5 inline-block' />
                                </span>
                                <span className='ms-3 text-ellipsis text-nowrap overflow-hidden' >{callerName}</span>
                            </section>

                            {/* Chat Panel Toggler | Chat Notifications */}
                            <section className='flex justify-between relative border border-gray-500 px-3 py-2 rounded-xl cursor-pointer' onClick={() => setIsChatPanelHidden(prev => !prev)}>
                                <GetSVGIcon name="chat" className='w-5 h-5 inline-block' />
                                {showMessageNotification &&
                                    <span className="absolute right-[10px] flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                                    </span>
                                }
                            </section>
                        </div>
                    }
                    <button className='bg-violet-500 px-4 py-2 rounded-xl text-ellipsis text-nowrap overflow-hidden'>{myName}</button>
                    {
                        !(callAccepted && !callEnded) &&
                        <button onClick={() => document.getElementById('invite_dialog')?.showModal()} >
                            <span>Invite people</span>
                            <GetSVGIcon name="user_plus" />
                            -id:{socket.id}
                        </button>
                    }
                </div>


            </div>
            <InviteDiaglog mySocketId={socket.id} />
            <CommsDialog callAction={callAction} caller={callerName} answerCall={answerCall} declineCall={declineCall} />
            <Modal action={"set_name"} setName={setMyName} socketId={socket.id} />
        </>
    );
};

export default DialPage;