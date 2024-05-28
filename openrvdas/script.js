document.addEventListener("DOMContentLoaded", function () {
    const toc = document.getElementById("toc");
    const chapterContent = document.getElementById("chapter-content");

    const chapters = [
        { title: "Quickstart", file: "quickstart.html" },
        { title: "GUI Quickstart", file: "quickstart_gui.html" },
        { title: "Introduction to Loggers", file: "intro_to_loggers.html" },
        // Add more chapters as needed
    ];

    // Populate TOC
    chapters.forEach((chapter, index) => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = "#";
        a.textContent = chapter.title;
        a.addEventListener("click", (e) => {
            e.preventDefault();
            loadChapter(chapter.file);
        });
        li.appendChild(a);
        toc.appendChild(li);
    });

    // Load chapter content
    function loadChapter(file) {
        fetch(file)
            .then((response) => response.text())
            .then((text) => {
                chapterContent.innerHTML = marked(text);
            })
            .catch((error) => {
                chapterContent.innerHTML = "<p>Error loading chapter.</p>";
                console.error(error);
            });
    }

    // Load the first chapter by default
    if (chapters.length > 0) {
        loadChapter(chapters[0].file);
    }
});
