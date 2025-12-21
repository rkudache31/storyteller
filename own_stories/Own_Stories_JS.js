const apiBase = "http://172.203.138.104:5010";

let currentBook = null;
let currentPage = 0;

const bookList = document.getElementById("bookList");
const storySection = document.getElementById("storySection");

// Load books when page opens
window.onload = loadLibrary;

// Navigation buttons
document.getElementById("prevBtn").addEventListener("click", prevPage);
document.getElementById("nextBtn").addEventListener("click", nextPage);
document.getElementById("backBtn").addEventListener("click", backToLibrary);

async function loadLibrary() {
  bookList.innerHTML = "<p style='color:#ffd700; font-size:2em; grid-column:1/-1;'>Loading your stories... ✨</p>";

  try {
    const res = await fetch(`${apiBase}/library`);
    const data = await res.json();

    bookList.innerHTML = "";

    if (data.books.length === 0) {
      bookList.innerHTML = "<p style='color:#ff9999; font-size:2.5em; grid-column:1/-1;'>Your library is empty!<br>Go create a story first! 📖</p>";
      return;
    }

    data.books.forEach(book => {
      const bookDiv = document.createElement("div");
      bookDiv.className = "book";
      bookDiv.textContent = book.topic || `Story ${book.book_id}`;
      bookDiv.title = `Open: ${book.topic || 'A Magical Tale'}`;
      bookDiv.onclick = () => openBook(book.book_id);
      bookList.appendChild(bookDiv);
    });

  } catch (err) {
    bookList.innerHTML = "<p style='color:#ff6666; font-size:2em;'>Cannot connect to story server 😢<br>Is it running?</p>";
  }
}

async function openBook(bookId) {
  try {
    const res = await fetch(`${apiBase}/book/${bookId}`);
    const book = await res.json();

    currentBook = book;
    currentPage = 0;

    document.querySelector(".bookshelf").style.display = "none";
    document.querySelector(".title").style.display = "none";
    storySection.style.display = "block";

    showPage();
  } catch (err) {
    alert("Couldn't open this story 😔");
  }
}

function showPage() {
  const page = currentBook.pages[currentPage];
  document.getElementById("storyTitle").textContent = 
    `${currentBook.topic} — Page ${currentPage + 1} of ${currentBook.pages.length}`;
  document.getElementById("pageImage").src = page.image_url;
  document.getElementById("pageText").textContent = page.text;
  document.getElementById("pageAudio").src = page.audio_url;
}

function nextPage() {
  if (currentPage < currentBook.pages.length - 1) {
    currentPage++;
    showPage();
  }
}

function prevPage() {
  if (currentPage > 0) {
    currentPage--;
    showPage();
  }
}

function backToLibrary() {
  storySection.style.display = "none";
  document.querySelector(".bookshelf").style.display = "block";
  document.querySelector(".title").style.display = "block";
  document.getElementById("pageAudio").pause();
}

/* ===============================
   STORY GENERATION (NEW ADDITION)
================================ */

const storyForm = document.getElementById("storyForm");
const topicInput = document.getElementById("topicInput");

if (storyForm) {
  storyForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // page reload stop

    const topic = topicInput.value.trim() || "magical adventure";

    bookList.innerHTML = `
      <p style="color:#ffd700; font-size:2em; grid-column:1/-1;">
        ✨ Creating your magical story...
      </p>
    `;

    try {
      await fetch(
        `${apiBase}/children_story_with_images?topic=${encodeURIComponent(topic)}`
      );

      topicInput.value = "";

      // refresh bookshelf after generation
      loadLibrary();

    } catch (error) {
      bookList.innerHTML = `
        <p style="color:#ff6666; font-size:2em; grid-column:1/-1;">
          ❌ Story generation failed
        </p>
      `;
      console.error(error);
    }
  });
}
