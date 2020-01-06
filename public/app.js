const status = document.getElementById('status');
const messages = document.getElementById('messages');
const form = document.getElementById('form');
const input = document.getElementById('input');
const URL = 'http://api.openweathermap.org/data/2.5/weather?id=703448&appid=77b3a59577b93fe4e2be80940c52db12';

const ws = new WebSocket('ws://localhost:3012');

function setStatus(value) {
    status.innerHTML = value;
}

function printMessage(value) {
    const li = document.createElement('li');

    li.innerHTML = value;
    messages.appendChild(li);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    ws.send(input.value);
    input.value = '';
});

ws.onopen = () => setStatus('ONLINE');

ws.onclose = () => setStatus('DISCONNECTED');

ws.onmessage = response => printMessage(response.data);

setInterval(() => {
    fetch(URL)
        .then(resp => resp.json())
        .then((data) => {
            document.querySelector('.city-name').textContent = data.name;
            document.querySelector('.temp').innerHTML = Math.round(data.main.temp - 273) + '&deg;';
            document.querySelector('.disclaimer').textContent = new Date().toLocaleDateString();
            document.querySelector('.features li').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`
        })
        .then(() => {
            clearInterval(update);
        })
        .catch((e) => {
            console.log(e);
        });
}, 3600);
