function isLocalPage() {
  return window.location.host.includes('localhost') || window.location.host.includes('127.0.0.1');
}

function addScript(url, isModule = false) {
  const theScript = document.createElement('script');
  theScript.src = url;
  if (isModule) {
    theScript.type = 'module';
  }
  document.body.appendChild(theScript);
}

function addStyle(url) {
  const link = document.createElement('link');
  link.href = url;
  link.rel = 'stylesheet';
  document.body.appendChild(link);
}

if (!isLocalPage()) {
  const container = document.createElement('div');
  container.id = 'kng-search';
  container.style.position = 'fixed';
  container.style.right = '0';
  container.style.top = '0';
  container.style.bottom = '0';
  container.style.width = '400px';
  container.style.backgroundColor = 'white';
  container.style.zIndex = '999991';
  container.style.display = 'none';
  container.style.overflowY = 'auto';
  document.body.appendChild(container);

  const toggleBtn = document.createElement('div');
  toggleBtn.style.position = 'fixed';
  toggleBtn.style.right = '0';
  toggleBtn.style.bottom = '0';
  toggleBtn.style.width = '20px';
  toggleBtn.style.height = '20px';
  toggleBtn.style.borderRadius = '10px';
  toggleBtn.style.backgroundColor = 'red';
  toggleBtn.style.zIndex = '999992';
  toggleBtn.style.display = 'flex';
  toggleBtn.style.alignItems = 'center';
  toggleBtn.style.justifyContent = 'center';
  toggleBtn.style.fontSize = '12px';
  toggleBtn.style.color = 'white';
  toggleBtn.style.cursor = 'pointer';
  toggleBtn.innerText = 'D';
  toggleBtn.addEventListener('click', () => {
    if (container.style.display === 'none') {
      container.style.display = 'block';
    } else {
      container.style.display = 'none';
    }
  });
  document.body.appendChild(toggleBtn);

  addScript(chrome.runtime.getURL('/assets/index.js'), true);
  addStyle(chrome.runtime.getURL('/assets/index.css'));
}
