const searchform = document.querySelector("form");
const moviecontainer = document.querySelector(".moviecontainer");
const inputbox = document.querySelector(".inputbox");

const getmovieinfo = async (movie) => {
  try {
    const myapikey = "af40a0bd";
    const url = `https://www.omdbapi.com/?apikey=${myapikey}&t=${movie}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Unable To Fetch Data!!");
    }

    const data = await response.json();

    showmoviedata(data);
  } catch (error) {
    showerrormessage("No Movie Found!!!");
  }
};

const showmoviedata = (data) => {
  moviecontainer.innerHTML = "";
  moviecontainer.classList.remove("nobackground");

  const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster } =
    data;

  const movieelement = document.createElement("div");
  movieelement.classList.add("movieinfo");

  movieelement.innerHTML = `<h2>${Title}</h2>
                          <p><strong>Rating:&#11088;</strong>${imdbRating}</p>`;

  const moviegenreelement = document.createElement("div");
  moviegenreelement.classList.add("moviegenre");

  Genre.split(",").forEach((element) => {
    const p = document.createElement("p");
    p.innerText = element;

    moviegenreelement.appendChild(p);
  });

  movieelement.appendChild(moviegenreelement);

  movieelement.innerHTML += `<p><strong>Released Date:</strong> ${Released}  </p>

                        <p><strong>Duration:</strong> ${Runtime}  </p>
                        <p><strong>Cast:</strong> ${Actors}  </p>
                        <p><strong>Plot:</strong> ${Plot}  </p>
                        
`;

  //movie poster
  const movieposterelement = document.createElement("div");
  movieposterelement.classList.add("movieposter");
  movieposterelement.innerHTML = `<img src="${Poster}"/>`;

  moviecontainer.appendChild(movieposterelement);
  moviecontainer.appendChild(movieelement);
};

//function to display error message

const showerrormessage = (message) => {
  moviecontainer.innerHTML = `<h2 class="error-message">${message} </h2>`;
  moviecontainer.classList.add("nobackground");
};

searchform.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(inputbox.value);
  const moviename = inputbox.value.trim();

  if (moviename !== "") {
    showerrormessage("Fetching Movie Details....");
    getmovieinfo(moviename);
  } else {
    showerrormessage("Please Enter The Valid Name.");
  }
});
