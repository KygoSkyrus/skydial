# learn

- strict mode in react {whats the point of running useeeffect an extra time, how does it help is recognisizng bugs}
- [hot module reloading](https://webpack.js.org/concepts/hot-module-replacement/) 


- whenever anyon other than user itself joins the room, start the call (run the calluser function)
- either from main page or from dialpage,, a popup should appear for user's name

- currently there is a room system,,
- check if the room systems works for group video call,,
  if not then remove the room system,
  and just do the calls base on socket it and there will be only one on one calling

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
  - on call page he will have a invite button to this video call. this button should have  a link that will bring other user to this call, {need the rest of logic in join call}
  - on call page he will be shown his video and there will be a chat window of width 25% side to the video(75%),
  - this chat window will show the user only as he is the only one

- **join a call**: 
 - same as above when clicked on join the user will get the same modal for name but along with the he would need to enter the room id,
 - after he enters these things than he will be redirected to the room, and in the room there should be a useefect which will run with the 'answercall' and  it will have the user id, maybe instead of uuid roomid in the share url, it should be user's socket id(which is the main requirement for a connection)
