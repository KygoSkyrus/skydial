import React from 'react'
import { SocialIcon } from 'react-social-icons'
import { EmailShareButton, FacebookShareButton, LineShareButton, PinterestShareButton, RedditShareButton, TelegramShareButton, TwitterShareButton, WhatsappShareButton, LineIcon } from "react-share"
import GetSVGIcon from './GetSVGIcon';

const InviteDiaglog = ({ mySocketId }) => {

    function handleClick(event) {
        const dialog = document.getElementById("invite_dialog");
        if (event.target === dialog) {
            dialog.close();
        }
    }

    return (
        <dialog id='invite_dialog' className='dark dark:bg-gray-900 dark:text-gray-100 lg:w-1/2 md:w-3/4 rounded-3xl px-6 py-16 sm:px-12 md:px-16 xl:col-span-2' onClick={(e) => handleClick(e)}>
            <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-2 text-gray-500">✕</button>
            </form>

            <div>
                <span className="block dark:text-violet-400">SKYDIAL</span>
                <h1 className="text-5xl font-extrabold dark:text-gray-50">Share invite </h1>
                <p className="mt-4 mb-6">
                    <span className="font-thin dark:text-gray-50">Invite people to your call by sharing dial url</span>
                </p>
            </div>

            <div className='flex flex-wrap justify-center gap-3 p-3'>

                <section className='w-[50px] h-[50px] rounded-full grid place-items-center border border-gray-300 cursor-pointer hover:scale-105 relative link_copy' onClick={() => navigator.clipboard.writeText(window.location.host + `/dial/${mySocketId}`)} title='copy url'>
                    <GetSVGIcon name="link" />
                </section>

                <WhatsappShareButton url={window.location.host + `/dial/${mySocketId}`} className="hover:scale-105">
                    <SocialIcon network='whatsapp' />
                </WhatsappShareButton>

                <FacebookShareButton url={window.location.host + `/dial/${mySocketId}`} className="hover:scale-105">
                    <SocialIcon network='facebook' />
                </FacebookShareButton>

                <TelegramShareButton url={window.location.host + `/dial/${mySocketId}`} className="hover:scale-105" >
                    <SocialIcon network='telegram' />
                </TelegramShareButton>

                <EmailShareButton url={window.location.host + `/dial/${mySocketId}`} className="hover:scale-105">
                    <SocialIcon network='email' />
                </EmailShareButton>

                <LineShareButton url={window.location.host + `/dial/${mySocketId}`} className="hover:scale-105">
                    <SocialIcon network='linkedin' />
                </LineShareButton>

                <PinterestShareButton url={window.location.host + `/dial/${mySocketId}`} className="hover:scale-105">
                    <SocialIcon network='pinterest' />
                </PinterestShareButton>

                <TwitterShareButton url={window.location.host + `/dial/${mySocketId}`} className="hover:scale-105">
                    <SocialIcon network='x' />
                </TwitterShareButton>

                <TwitterShareButton url={window.location.host + `/dial/${mySocketId}`} className="hover:scale-105">
                    <SocialIcon network='twitch' />
                </TwitterShareButton>

                <RedditShareButton url={window.location.host + `/dial/${mySocketId}`} className="hover:scale-105">
                    <SocialIcon network='reddit' />
                </RedditShareButton>
            </div>
        </dialog>
    )
}

export default InviteDiaglog