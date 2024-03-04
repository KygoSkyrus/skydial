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