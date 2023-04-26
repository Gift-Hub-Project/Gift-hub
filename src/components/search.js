// const searchInput = document.getElementById("searchInput");

// const basketsFromDOM = document.getElementsByClassName("basket");

// searchInput.addEventListener("keyup", (event) => {
//     const { value } = event.target;
//     const searchQuery = value.toLowerCase();

//     for(const basketElement of basketsFromDOM) {
//         let basket =basketElement.textContent.toLowerCase();

//         if( basket.includes(searchQuery)) {
//             basketElement.getElementsByClassName.display = "none";
//         }
//     }
// });

// export default searchInput;


const searchFunction = (query, baskets) => {
    const searchQuery = query.toLowerCase();
    return baskets.filter((basket) => {
      const basketText = basket.text.toLowerCase();
      return basketText.includes(searchQuery);
    });
  };
  
  export default searchFunction