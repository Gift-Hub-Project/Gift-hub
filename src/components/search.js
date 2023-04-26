
const searchFunction = (query, baskets) => {
    const searchQuery = query.toLowerCase();
    return baskets.filter((basket) => {
      const basketText = basket.text.toLowerCase();
      return basketText.includes(searchQuery);
    });
  };
  
  export default searchFunction