
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
    document.querySelector('#post-tweet').addEventListener('click', () => post_tweet());
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
        showTweets();
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

var postedTime = []

function showTweets(){
    var database = firebase.database();
    database.ref(`post`).on('value', function(snapshot) {
        if (snapshot.exists()) {
            console.log(snapshot);
            snapshot.forEach(function(data) {
                var user = data.key;
                database.ref(`post`).on('value', function(snapshot) {
                    if (snapshot.exists()) {
                        snapshot.forEach(function(data) {
                            console.log(data);
                            
                            var post = data.val();
                            if(postedTime.indexOf(post.time_posted) != -1){
                                return;
                            }
                            var post_like = post.like;
                            var post_content = post.content;
                            var post_user = post.user;
                            var post_time = post.time_posted;
                            postedTime.push(post_time);
                            const li = document.createElement('li');
                            li.classList.add('py-3', 'sm:py-4', 'h-fit');

                            // Create the <div> element with the 'relative' and 'flex' classes
                            const div1 = document.createElement('div');
                            div1.classList.add('relative', 'flex', 'items-center', 'h-fit');

                            // Create the <div> element with the 'flex-shrink-0' and 'absolute' classes
                            const div2 = document.createElement('div');
                            div2.classList.add('flex-shrink-0', 'absolute', 'left-0', 'top-0');

                            // Create the <img> element and set its attributes
                            const img = document.createElement('img');
                            img.classList.add('w-8', 'h-8', 'rounded-full');
                            img.src = 'profile (1).png';

                            // Append the <img> element to the second <div> element
                            div2.appendChild(img);

                            // Create the <div> element with the 'flex-1', 'min-w-0', 'ml-12', and 'h-fit' classes
                            const div3 = document.createElement('div');
                            div3.classList.add('flex-1', 'min-w-0', 'ml-12', 'h-fit');

                            // Create the first <p> element and set its attributes
                            const p1 = document.createElement('p');
                            p1.classList.add('text-sm', 'font-medium', 'text-gray-900', 'truncate');
                            p1.textContent = 'Rhuel Laurente';

                            // Create the <span> element with the 'text-sm', 'text-gray-500', and 'truncate' classes
                            const span1 = document.createElement('span');
                            span1.classList.add('text-sm', 'text-gray-500', 'truncate');
                            span1.textContent = ` @${post_user} · `;

                            // Create the <span> element for the time and set its text content
                            const span2 = document.createElement('span');
                            span2.textContent = getRelativeTime(post_time);

                            // Append the <span> elements to the first <p> element
                            p1.appendChild(span1);
                            span1.appendChild(span2);

                            // Create the second <p> element and set its attributes
                            const p2 = document.createElement('p');
                            p2.classList.add('text-sm', 'font-light', 'text-gray-900', 'overflow-hidden');
                            console.log(post_content);
                            p2.textContent = post_content;
                            // Create the <div> element with the 'flex' and 'items-center' classes
                            const div4 = document.createElement('div');
                            div4.classList.add('flex', 'items-center');

                            // Create the <button> element with the 'focus:outline-none', 'cursor-pointer', 'mt-2', 'ml-0', and 'align-left' classes
                            const button = document.createElement('button');
                            button.id = 'heart-button';
                            button.classList.add('focus:outline-none', 'cursor-pointer', 'mt-2', 'ml-0', 'align-left', 'flex');

                            // Create the <svg> element and set its attributes
                            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                            svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
                            svg.setAttribute('width', '50');
                            svg.setAttribute('height', '50');
                            svg.setAttribute('viewBox', '0 0 100 100');

                            // Create the <path> element and set its attributes
                            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                            path.setAttribute('d', 'M50,20 C50,5 30,5 30,20 C30,30 50,45 50,45 C50,45 70,30 70,20 C70,5 50,5 50,20 Z');
                            path.setAttribute('fill', 'white');
                            path.setAttribute('stroke', 'black');
                            path.setAttribute('stroke-width', '2');
                            path.classList.add('p-0', 'm-0');

                            // Create the <span> element with the 'text-sm', 'font-medium', 'mt-0.5', and 'p-0' classes
                            const span3 = document.createElement('span');
                            span3.id = 'heart-text';
                            span3.classList.add('text-sm', 'font-medium', 'mt-0.5', 'p-0');
                            span3.textContent = 'Like';

                            // Append the <path> element to the <svg> element
                            svg.appendChild(path);

                            // Append the <svg> and <span> elements to the <button> element
                            button.appendChild(svg);
                            button.appendChild(span3);

                            // Append the <button> element to the <div> element
                            div4.appendChild(button);

                            // Append the <p> and <div> elements to the third <div> element
                            div3.appendChild(p1);
                            div3.appendChild(p2);
                            div3.appendChild(div4);

                            // Append the <div> elements to the first <div> element
                            div1.appendChild(div2);
                            div1.appendChild(div3);

                            // Append the <div> element to the <li> element
                            li.appendChild(div1);

                            // Append the <li> element to the desired parent element in your HTML document
                            const parentElement = document.getElementById('tweet_lists');
                            parentElement.appendChild(li);
                        })
                    }
                })
            })
        }
    })
}


function getRelativeTime(postTime){
    const now = Date.now();
    console.log(now)
    const secondsElapsed = Math.floor((now - postTime) / 1000);
    if (secondsElapsed < 60) {
        return `${secondsElapsed}s`;
    } else if (secondsElapsed < 3600) {
        const minutes = Math.floor(secondsElapsed / 60);
        return `${minutes}m`;
    } else if (secondsElapsed < 86400) {
        const hours = Math.floor(secondsElapsed / 3600);
        return `${hours}h`;
    } else {
        postDate = new Date(postTime);
        return postDate;
    }
}

function getLastIndex(){
    var num = 1;
    var database = firebase.database();
    database.ref(`post`).on('value', function(snapshot) {
        if (snapshot.exists()) {
            snapshot.forEach(function(data) {
                var id = data.key;
                alert(id);
                if(id>=num){
                    num+=1;
                }
            })
        }
    })
    return num;
}
function post_tweet(){
    var num = getLastIndex();
    const content = document.querySelector('#post-content-text').value;
    const username = document.querySelector('#username').textContent;
    var database = firebase.database();
    database.ref(`post/${num}`).set({
        like: 0,
        content: content,
        user: username,
        time_posted: Date.now()
    });
}
