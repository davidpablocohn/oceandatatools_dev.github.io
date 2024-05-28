// Sample list of markdown files (replace these with your actual filenames)
const markdownFiles = ['quickstart.md', 'quickstart_gui.md', 'intro_to_loggers.md'];

// Function to load a Markdown file and display its content
function loadMarkdown(file) {
  fetch(file)
    .then(response => response.text())
    .then(markdown => {
      const htmlContent = marked(markdown);
      document.getElementById('mainPane').innerHTML = htmlContent;
      updateSidebar(file);
      addLinkListeners();
    });
}

// Function to update the sidebar
function updateSidebar(activeFile) {
  const fileList = document.getElementById('fileList');
  fileList.innerHTML = '';

  markdownFiles.forEach(file => {
    const listItem = document.createElement('li');
    const link = document.createElement('a');
    link.href = '#';
    link.textContent = file.replace('.md', '');
    link.dataset.file = file;

    if (file === activeFile) {
      link.classList.add('active');
    }

    link.addEventListener('click', (event) => {
      event.preventDefault();
      loadMarkdown(file);
    });

    listItem.appendChild(link);
    fileList.appendChild(listItem);
  });
}

// Function to add click listeners to links within the main pane
function addLinkListeners() {
  const links = document.querySelectorAll('#mainPane a');
  links.forEach(link => {
    link.addEventListener('click', (event) => {
      const href = event.target.getAttribute('href');
      if (href && href.endsWith('.md')) {
        event.preventDefault();
        loadMarkdown(href);
      }
    });
  });
}

// Initial load
loadMarkdown(markdownFiles[0]);
