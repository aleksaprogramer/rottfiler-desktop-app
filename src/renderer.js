const information = document.getElementById('info');
const ping = document.getElementById(`ping`);
information.innerText = `This app is using Electron (v${window.versions.electron()})`;

const func = async () => {
  const response = await window.versions.ping()
  ping.textContent = response; // prints out 'pong'
}

func()