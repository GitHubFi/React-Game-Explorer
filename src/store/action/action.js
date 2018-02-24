
import ActionTypes from '../constant/constant';
import history from '../../History';
// import createBrowserHistory from 'history/createBrowserHistory'
import firebase from 'firebase';
// import createBrowserHistory from 'history/createBrowserHistory';
// const history = createBrowserHistory()
// const hsitory = createBrowserHistory()
var config = {
    apiKey: "AIzaSyDc4OlT5lghXKkaGl1K_5YTgv6-FG0N3C8",
    authDomain: "first-web-af5b5.firebaseapp.com",
    databaseURL: "https://first-web-af5b5.firebaseio.com",
    projectId: "first-web-af5b5",
    storageBucket: "first-web-af5b5.appspot.com",
    messagingSenderId: "544390605725"
};
firebase.initializeApp(config);


export function changeUserName() {
    return dispatch => {
        dispatch({ type: ActionTypes.USERNAME, payload: 'Ali' })
    }
}


export function signupAction(user) {

    return dispatch => {
        console.log('user', user);
        // history.push('/signin');

        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then((createdUser) => {
                console.log('signed up successfully user uid', createdUser.uid);
                delete user.password;
                user.uid = createdUser.uid;
                firebase.database().ref('users/' + createdUser.uid + '/').set(user)
                    .then(() => {
                        firebase.database().ref('users/').once('value')
                            .then((userData) => {
                                let allUsers = userData.val();
                                let currentUserUid = firebase.auth().currentUser.uid;
                                dispatch({ type: ActionTypes.ALLUSERS, payload: allUsers })
                                dispatch({ type: ActionTypes.CURRENTUSER, payload: currentUserUid })
                                //firebase.database().ref('message/').once('value')
                                history.push('/signin');
                                // .then((messagesData) => {
                                //     let messages = messagesData.val();
                                //     console.log(messages);
                                //     dispatch({ type: ActionTypes.MESSAGES, payload: messages })
                                // })
                            })
                    })

            })

    }
}

export function signinAction(user) {
    return dispatch => {
        console.log('user in signin', user);
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then((signedinUser) => {
                firebase.database().ref('users/').once('value')
                    .then((userData) => {
                        let allUsers = userData.val();
                        let currentUserUid = firebase.auth().currentUser.uid;
                        let allUsersArr = [];
                        for (var key in allUsers) {
                            allUsersArr.push(allUsers[key]);
                        }
                        console.log("All user signed in:",allUsersArr);
                        dispatch({ type: ActionTypes.ALLUSERS, payload: allUsersArr })
                        dispatch({ type: ActionTypes.CURRENTUSER, payload: currentUserUid })
                                history.push('/');
                        // firebase.database().ref('message/').once('value')
                            // .then((messagesData) => {
                            //     let messages = messagesData.val();
                            //     console.log(messages);

                            //     dispatch({ type: ActionTypes.MESSAGES, payload: messages })
                            // })




                    })
            })
    }
}









export function GetServerData() {
    return dispatch => {

    
       fetch('https://www.giantbomb.com/api/games/?api_key=875adc8d6de97c6ce8c25c7d525593f449efa46f&format=json&filter=original_release_date:2017-02-17|2018-02-17&field_list=name,image,original_release_date,https://www.giantbomb.com/api/games/?api_key=875adc8d6de97c6ce8c25c7d525593f449efa46f&format=json&filter=original_release_date:2017-02-17|2018-02-17&field_list=name,image,original_release_date,site_detail_url').
        
            then((responce) => responce.json())
            .then((parsedJSON) => {
                console.log("meraj", parsedJSON.results)
                dispatch({
                    type: ActionTypes.DATA,
                    payload: parsedJSON
                })
            })
    }
}

// export function changeRecipientUID(recpUID) {
//     return dispatch => {
//         dispatch({type: ActionTypes.CHANGERECPUID, payload:recpUID})
//     }
// }



// export function sendMessage(message) {
//     return dispatch => {
//         firebase.database().ref('message/').push(message)
//             .then(()=>{
//                 console.log('message sent')
//             })

//     }
// }