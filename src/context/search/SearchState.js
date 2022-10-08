import SearchContext from "./searchContext";

const SearchState = (props) => {
  const host = "http://localhost:5000";
  // Search Bus
  const searchBus = async (source, destination, trip_date)=>{
    const response = await fetch(`${host}/api/search`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({source, destination, trip_date})
    })
    const searchRes = await response.json()
    console.log(searchRes)
  }
  return <SearchContext.Provider value={{searchBus}}>{props.children}</SearchContext.Provider>;
};

export default SearchState;
