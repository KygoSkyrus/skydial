# learn

- strict mode in react {whats the point of running useeeffect an extra time, how does it help is recognisizng bugs}
- [hot module reloading](https://webpack.js.org/concepts/hot-module-replacement/) 
- create a js for ttoltip permanent 


# done
- turn off audio or camera while on call


# things to do
- add deploy code on server

- create logo
- add description favico
- on call end show proper msg and either send user to home page or clear everything
- emit an event to the user that user has left the call and then end the remote stream,, setevery neccessary state off
- add popup for answer call option
- add a notificatio for user when he recives a msg and his chat panel is off

- whenever anyon other than user itself joins the room, start the call (run the calluser function)



# Flow 
- **create a call**: 
  - on page load there will be a signin option just like skychat
  - along with that login there will be an option to join a call

- **join a call**: 
  - to join a call, there is no need to signin, just the name is needed
  - to join a call, you would need a caller's id 
  - when clicked on 'join' button, user should be redirected to Join page
  - on the page initially they'll get a modal asking  for their name and callersId 
    - if both fields are filled then 

# without login
- **create a call**: 
  - when clicked on start a call user will get a modal dialog to enter his name and then he will be redirected to call page
  - basically we can redirect this guy to his socketid too, as it does not matter for the caller,, but we will send  a state to differentiate between join and start routes,,,
  - on call page he will have a invite button to this video call. this button should have  a link that will bring other user to this call, {need the rest of logic in join call}
  - on call page he will be shown his video and there will be a chat window of width 25% side to the video(75%),
  - this chat window will show the user only as he is the only one

- **join a call**: 
 - same as above when clicked on join the user will get the same modal for name but along with the he would need to enter the room id,
 - after he enters these things than he will be redirected to the room, and in the room there should be a useefect which will run with the 'answercall' and  it will have the user id, maybe instead of uuid roomid in the share url, it should be user's socket id(which is the main requirement for a connection)
 - the share url will be something like, /dial/<socketid>
