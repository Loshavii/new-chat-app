// import logo from './logo.svg';
// import './App.css';
// import {ZIMKitManager, Common } from '@zegocloud/zimkit-react';
// import '@zegocloud/zimkit-react/index.css';
// import { useEffect, useState } from 'react';
// import { APP_ID, APP_SECRET } from './constants';

// const id = Math.floor( Math.random()*1000)
// function App() {
//   const [state, setState] = useState(
//     {
//       appConfig:{
//         appID: APP_ID,
//         serverSecret: APP_SECRET
//       },

//       userInfo: {
//         userID: `Losh${id}`,
//         userName: `Losh${id}`,
//         userAvatarUrl: ''
//       },
//     }
//   )

//   useEffect(() => {
//     const init = async() => {
//       const zimKit = new ZIMKitManager();
//       const token = zimKit.generateKitTokenForTest(
//         state.appConfig.appID, 
//         state.appConfig.serverSecret, 
//         state.userInfo.userID);
//       await zimKit.init(state.appConfig.appID);
//       await zimKit.connectUser(state.userInfo, token);
//     }
//     init()


//   }, [])


//   return (
//     <div className="App">
//       welcome back {state.userInfo.userID};
//       <Common></Common>
//     </div>
//   );
// }

// export default App;
import logo from './logo.svg';
import './App.css';
import { ZIMKitManager, Common } from '@zegocloud/zimkit-react';
import '@zegocloud/zimkit-react/index.css';
import { useEffect, useState, useRef } from 'react';
import { APP_ID, APP_SECRET } from './constants';

const id = Math.floor(Math.random() * 1000);

function App() {
  const [state, setState] = useState({
    appConfig: {
      appID: APP_ID,
      serverSecret: APP_SECRET,
    },
    userInfo: {
      userID: `Losh${id}`,
      userName: `Losh${id}`,
      userAvatarUrl: '',
    },
  });

  const zimKitRef = useRef(null);

  useEffect(() => {
    const init = async () => {
      try {
        zimKitRef.current = new ZIMKitManager();
        
        // Generate token for connecting the user
        const token = zimKitRef.current.generateKitTokenForTest(
          state.appConfig.appID,
          state.appConfig.serverSecret,
          state.userInfo.userID
        );

        await zimKitRef.current.init(state.appConfig.appID);
        await zimKitRef.current.connectUser(state.userInfo, token);
      } catch (error) {
        console.error("Error initializing or connecting ZIMKitManager:", error);
      }
    };

    init();

    return () => {
      if (zimKitRef.current) {
        try {
          zimKitRef.current.disconnectUser(); // Disconnect user on cleanup
        } catch (error) {
          console.error("Error during disconnectUser:", error);
        }
      }
    };
  }, [state.appConfig.appID, state.appConfig.serverSecret, state.userInfo]);

  return (
    <div className="App">
      Welcome back, {state.userInfo.userID}!
      <Common />
    </div>
  );
}

export default App;

