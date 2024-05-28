// Fetch and parse markdown files
const markdownFiles = [
  'quickstart.md',
  'quickstart_gui.md',
  'intro_to_loggers.md',
  'cached_data_server.md',
  'controlling_loggers.md'];
const parsedFiles = {};

markdownFiles.forEach(file => {
  var html_file = 'md/' + file.replace(/\.md$/, '.html');
  console.log('Fetching ' + html_file);
  fetch(html_file)
    .then(response => response.text())
    .then(content => {
      // parsedFiles[file] = window.marked(content);
      parsedFiles[file] = content;
      populateSidebar(file);
    });
});

// Populate sidebar with links
function populateSidebar(file) {
  const sidebarList = document.getElementById('sidebar-list');
  const listItem = document.createElement('li');
  const link = document.createElement('a');
  link.href = '#';
  link.textContent = file;
  link.addEventListener('click', () => loadFileContent(file));
  listItem.appendChild(link);
  sidebarList.appendChild(listItem);
}

// Load file content in main pane
function loadFileContent(file) {
  const mainPane = document.getElementById('main-pane');
  mainPane.innerHTML = parsedFiles[file];

  // Make references clickable
  const links = mainPane.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const targetFile = event.target.textContent;
      loadFileContent(targetFile);
      updateSidebarLink(targetFile);
    });
  });

  updateSidebarLink(file);
}

// Update sidebar link styles
function updateSidebarLink(file) {
  const sidebarLinks = document.querySelectorAll('#sidebar-list a');
  sidebarLinks.forEach(link => {
    if (link.textContent === file) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}
