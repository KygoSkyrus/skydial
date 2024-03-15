
# things to do
- NOTE : ERROR: when both peers has dial id in the url,, then msg is not wokring [even if user ]// INVALID 
- increase the width of dialog for mobile view
- implement socket reconnection on server/client


# Flow

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
