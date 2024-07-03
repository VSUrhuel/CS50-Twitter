
const firebaseConfig = {
    apiKey: "AIzaSyALTyo9nqORtTnV5vX2LYnjcyFuloL2SB8",
    authDomain: "twitter-adece.firebaseapp.com",
    databaseURL: "https://twitter-adece-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "twitter-adece",
    storageBucket: "twitter-adece.appspot.com",
    messagingSenderId: "363179696708",
    appId: "1:363179696708:web:8dbdf2b9d8e74d507e1211",
    measurementId: "G-XGFBX202WG"
  };

firebase.initializeApp(firebaseConfig);


document.addEventListener('DOMContentLoaded', function() {
    
    document.querySelector('#register_click').addEventListener('click', (e) => registerView());
    document.querySelector('#login_click').addEventListener('click', (e) => loginView());
    loginView();
    
}); 

function registerView(){
    document.querySelector('#login').style.display = 'none';
    document.querySelector('#register').style.display = 'block';
    document.querySelector('#main').style.display = 'none';
    document.querySelector('#register_btn').addEventListener('click', (e) => register(e));
}

function loginView(){
    if(document.querySelector('#login') && document.querySelector('#register') && document.querySelector('#main') ){
        document.querySelector('#login').style.display = 'none';
        document.querySelector('#register').style.display = 'none';
        document.querySelector('#main').style.display = 'block';
        document.querySelector('#submit_btn').addEventListener('click', (e) => log_in(e));
    }
}

function log_in(e){
    e.preventDefault();
    document.querySelector('#login').style.display = 'block';
    const username = document.querySelector('#usernamelog').value;
    const password = document.querySelector('#passwordlog').value;
    var database = firebase.database();
    database.ref(`user/${username}`).once('value', function(snapshot) {
        if (snapshot.exists()) {
            if(snapshot.val().password == password){
                document.querySelector('#register').style.display = 'none';
                document.querySelector('#login').style.display = 'none';
                document.querySelector('#main').style.display = 'block';
                document.querySelector('#username').textContent = username;
                
            }else{
                alert('Invalid password');   
            }
        } else {
            alert('User does not exist');
        }
    }).catch((error) => {
        console.error(error);
    });
}

function register(e){
    e.preventDefault();
    const username = document.querySelector('#usernamereg').value;
    const password = document.querySelector('#passwordreg').value;
    const email = document.querySelector('#email').value;
    const confirmatory_password = document.querySelector('#confirmatory_password').value;
    console.log(`${username} and ${password} and ${email} and ${confirmatory_password}`);
    if(password != confirmatory_password){
        alert('Passwords do not match');
        return;
    }
    var database = firebase.database();
    e.preventDefault();
    database.ref(`user/${username}`).once('value', function(snapshot) {
        if (snapshot.exists()) {
            alert('User already exists');
        } else {
            database.ref(`user/${username}`).set({
                username: username,
                password: password,
                email: email
            });
            alert('User created');
            loginView();
        }
    }).catch((error) => {
        console.error(error);
    });
}

function showTweets(){
    var database = firebase.database();
    database.ref(`post`).on('value', function(snapshot) {
        if (snapshot.exists()) {
            snapshot.forEach(function(data) {
                var user = data.key;
                database.ref(`post`).on('value', function(snapshot) {
                    if (snapshot.exists()) {
                        snapshot.forEach(function(data) {
                            var post = data.val();
                            var post_id = post.id;
                            var post_content = post.content;
                            var post_user = post.user;
                            var post_time = post.time_posted;
                            const div = document.createElement('div')
                        })
                    }
                })
            })
        }
    })
}

var num = -1;

function post_tweet(){
    num = num+1;
    const content = document.querySelector('#post-content').textContent;
    const username = document.querySelector('#username').textContent;
    var database = firebase.database();
database.ref(`post/${username}/${num}`).set({
    id: num,
    content: content,
    user: username,
    time_posted: new Date().toLocaleString()
});
alert('saved');
}
