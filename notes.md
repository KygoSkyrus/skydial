
# done
- your name is not at the bottom on homepage
- add scroll in view in chat
- add the timout to send to homepage whenever needed... i.e. on call declined/end
- add message popup for events like new messages, call endeed
- add the url on invite people
- on call end show proper msg and either send user to home page or clear everything
- emit an event to the user that user has left the call and then end the remote stream,, setevery neccessary state off
- add popup for answer call option
- add a notificatio for user when he recives a msg and his chat panel is off
- prgress bar width is changing as the texts width changes
- on call end, technincally its not able to reconnect, maybe socket is deleted,, refresh workd though,,, redirect user to homepage when call ends.

# things to do
- NOTE : ERROR: when both peers has dial id in the url,, then msg is not wokring 
- fix the call thing on page load,, remove call button
- increase the width of dialog for mobile view
- create logo
- add favico
- whenever anyon other than user itself joins the room, start the call (run the calluser function)


# Flow

- **create a call**:

  - on page load there will be a signin option just like skychat
  - along with that login there will be an option to join a call

- **join a call**:
  - to join a call, there is no need to signin, just the name is needed
  - to join a call, you would need a caller's id
  - when clicked on 'join' button, user should be redirected to Join page
  - on the page initially they'll get a modal asking for their name and callersId
    - if both fields are filled then

# without login

- **create a call**:

  - when clicked on start a call user will get a modal dialog to enter his name and then he will be redirected to call page
  - basically we can redirect this guy to his socketid too, as it does not matter for the caller,, but we will send a state to differentiate between join and start routes,,,
  - on call page he will have a invite button to this video call. this button should have a link that will bring other user to this call, {need the rest of logic in join call}
  - on call page he will be shown his video and there will be a chat window of width 25% side to the video(75%),
  - this chat window will show the user only as he is the only one

- **join a call**:
- same as above when clicked on join the user will get the same modal for name but along with the he would need to enter the room id,
- after he enters these things than he will be redirected to the room, and in the room there should be a useefect which will run with the 'answercall' and it will have the user id, maybe instead of uuid roomid in the share url, it should be user's socket id(which is the main requirement for a connection)
- the share url will be something like, /dial/<socketid>
