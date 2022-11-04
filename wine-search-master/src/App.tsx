import "./App.css";
import { useEffect, useState } from "react";
import { getWines } from "./services/wine";
import { Heading } from '@chakra-ui/react';
import { wineType } from "./utils/typeDefs";
import { useDispatch } from "react-redux";
import { storeWines } from "./redux/slices/wineSlice";



function App() {
  const [wines, setWines] = useState<wineType[]>([]);
  const [input, setInput] = useState<string>("");
  const [searchedWines, setSearchedWines] = useState<wineType[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const winesRes = await getWines();
      if (winesRes.status === 200) {
        const { data } = winesRes;
        dispatch(storeWines(data));
        setWines(data);
      }
    })();
  }, []);

  const handleSearch = (value: string) => {
    setInput(value);
    const filteredList = wines?.filter(
      (e: wineType) =>
        e.wine.toLowerCase().includes(value.toLowerCase()) ||
        e.winery.toLowerCase().includes(value.toLowerCase())
    );
    setSearchedWines(filteredList);
  };



  return (

    <div className="App">
      <Heading>🍷 WineShop 🍷</Heading>
      <Heading>Enter The Wine name to begin the search...</Heading>
      <div>
        <input
          type="text"
          onChange={(e) => handleSearch(e.target.value)}
          value={input}
          className="search"
          placeholder="Search"
        />
      </div>
      <ul className="wineList">
        {searchedWines.map((e: wineType, i) => (
          <li className="flex gap-2 item" key={i}>
            <div>
              <img
                src={
                  e.image}
                alt="wine"
                className="wineImg"
              />
            </div>
            <div className="details">
              <div>
                <h2 className="heading">{e.wine}</h2>
                <p className="desc text-gray">Winery: {e.winery}</p>
              </div>
              <div>
                <div className="text-gray">Reviews: {e.rating.reviews}</div>


              </div>

            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

