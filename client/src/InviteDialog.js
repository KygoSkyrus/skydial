import React from 'react'
import { SocialIcon } from 'react-social-icons'
import { EmailShareButton, FacebookShareButton, LineShareButton, PinterestShareButton, RedditShareButton, TelegramShareButton, TwitterShareButton, WhatsappShareButton, LineIcon } from "react-share"

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
                <WhatsappShareButton url={window.location.href} onClick={e => navigator.clipboard.writeText(mySocketId)}>
                    <SocialIcon network='url' />
                </WhatsappShareButton>

                <WhatsappShareButton url={window.location.href}>
                    <SocialIcon network='whatsapp' />
                </WhatsappShareButton>

                <FacebookShareButton url={window.location.href}>
                    <SocialIcon network='facebook' />
                </FacebookShareButton>

                <TelegramShareButton url={window.location.href} >
                    <SocialIcon network='telegram' />
                </TelegramShareButton>

                <EmailShareButton url={window.location.href}>
                    <SocialIcon network='email' />
                </EmailShareButton>

                <LineShareButton url={window.location.href}>
                    <SocialIcon network='linkedin' />
                </LineShareButton>

                <PinterestShareButton url={window.location.href}>
                    <SocialIcon network='pinterest' />
                </PinterestShareButton>

                <TwitterShareButton url={window.location.href}>
                    <SocialIcon network='x' />
                </TwitterShareButton>

                <TwitterShareButton url={window.location.href}>
                    <SocialIcon network='twitch' />
                </TwitterShareButton>

                <RedditShareButton url={window.location.href}>
                    <SocialIcon network='reddit' />
                </RedditShareButton>
            </div>
        </dialog>
    )
}

export default InviteDiaglog