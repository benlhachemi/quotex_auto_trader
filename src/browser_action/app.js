document.querySelector('.btn').addEventListener('click',open_olymptrade);

function open_olymptrade(){
	chrome.tabs.create({ url : 'https://quotex.com/en/demo-trade'});
}

