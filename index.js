const apiKey = '628944559ec04682b92d47165f9eff34'; //  actual News API key
const blogContainer = document.getElementById('blog-container');
const searchField=document.getElementById('search-input')
const searchButton=document.getElementById('search-button')

async function fetchRandomNews() {
  try {
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=15&apiKey=${apiKey}`;//fetching 15 only  //make the dymaic one;
    const response = await fetch(apiUrl);//store the apiurl in seprate 
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error("Error fetching random news:", error);
    return []; // Return an empty array in case of an error
  }
}

 searchButton.addEventListener("click", async()=>
{
    const query=searchField.value.trim()
    if(query!=="")
    {
        try{
            const articles=await fetchRandomNewsQuery(query)
            displayBlogs(articles)

        }
        catch(error)
        {
            console.error("error at searching query",error);
        }
    }
})

async function fetchRandomNewsQuery(query)
{
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=15&apiKey=${apiKey}`;//fetching 15 only  //make the dymaic one;
        const response = await fetch(apiUrl);//store the apiurl in seprate 
        const data = await response.json();
        return data.articles;
      } catch (error) {
        console.error("Error fetching random news:", error);
        return []; // Return an empty array in case of an error
      }
}

function displayBlogs(articles) {
  blogContainer.innerHTML = ""; // Clear the container before appending new content

  articles.forEach((article) => {
    const blogCard = document.createElement("div");
    blogCard.classList.add("blog-card");

    // Create a container for image and title (flexible for styling)
    const contentWrap = document.createElement("div");
    contentWrap.classList.add("content-wrapper"); // Add a class for styling

    //Image tag
    const img = document.createElement("img");
    img.src = article.urlToImage || 'placeholder.jpg'; // Set a default image if urlToImage is missing
    img.alt = article.title;
     //Title tag of h2
    const title = document.createElement("h2");
    title.textContent = article.title;

    contentWrap.appendChild(img);
    contentWrap.appendChild(title);

    // Description paragraph
    const description = document.createElement("p");
    description.textContent = article.description;

    blogCard.appendChild(contentWrap);
    blogCard.appendChild(description);
    blogCard.addEventListener('click',()=>
    {
        window.open(article.url,"_blank")
    })
    blogContainer.appendChild(blogCard);
  });
}

(async () => {
  try 
  {
    const articles = await fetchRandomNews();
    displayBlogs(articles);
  }
   catch (error) 
   {
    console.error("Error fetching side:", error);
  }
})();//working within the async function as the function;