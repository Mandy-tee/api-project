const url = "https://potterapi-fedeperin.vercel.app/en/books";
const options = {
  method: "GET",
  headers: {
    // "x-rapidapi-key": "470a709658msh4abe5172c1816a8p143d5fjsn73a22ed8ef98",
    // "x-rapidapi-host": "getbooksinfo.p.rapidapi.com",
  },
};

let books;

const fetchBook = async () => {
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    books = result;
    console.table(result);
    for (const book of result) {
      // console.log(book);
      const bookDiv = document.createElement("div");
      const bookH1 = document.createElement("h1");
      bookH1.textContent = book.title;
      bookDiv.appendChild(bookH1);

      const bookP = document.createElement("p");
      bookP.textContent = book.description;
      bookDiv.appendChild(bookP);

      const bookImg = document.createElement("Img");
      bookImg.setAttribute("src", book.cover);
      bookImg.setAttribute("alt", book.title);
      bookImg.classList.add("book-img");
      bookDiv.appendChild(bookImg);

      document.querySelector("#books").appendChild(bookDiv);
    }
  } catch (error) {
    console.error(error);
  }
};

document.addEventListener("DOMContentLoaded", fetchBook);

const searchInput = document.getElementById("search-input");

searchInput.addEventListener("input", (e) => {
  // Use 'input' for real-time filtering
  const query = e.target.value.toLowerCase();

  // Clear previous book display
  const booksContainer = document.querySelector("#books");
  booksContainer.innerHTML = ""; // Clear existing books

  const filteredBooks = books.filter((book) => {
    return (
      book.title.toLowerCase().includes(query) ||
      book.description.toLowerCase().includes(query)
    );
  });

  // Display filtered books
  for (const book of filteredBooks) {
    const bookDiv = document.createElement("div");
    const bookH1 = document.createElement("h1");
    bookH1.textContent = book.title;
    bookDiv.appendChild(bookH1);

    const bookP = document.createElement("p");
    bookP.textContent = book.description;
    bookDiv.appendChild(bookP);

    const bookImg = document.createElement("img"); // Fixed 'Img' to 'img'
    bookImg.setAttribute("src", book.cover);
    bookImg.setAttribute("alt", book.title);
    bookImg.classList.add("book-img");
    bookDiv.appendChild(bookImg);

    booksContainer.appendChild(bookDiv);
  }
});
