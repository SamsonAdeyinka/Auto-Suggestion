import { useState } from "react";
import "./App.css";
import sampleData from "./sampleData.json";

function App() {

  const AutoSuggestion = () => {
    const [inputValue, setInputValue] = useState("");
    const [isFocus, setIsFocus] = useState(false);
    const [settings] = useState({
      showSuggestion: true,
      showCollection: true,
      showProduct: true,
    });

    const handleInputValue = (e) => {
      setInputValue(e.target.value);
    };

    const jsondata = sampleData[0];


    const filterData = (jsondata, query) => {
      if (!query) {
        return {
          suggestion: [],
          collection: [],
          product: [],
        };
      }

      const lowerCaseQuery = query.toLowerCase();

      return {
        suggestion: jsondata.suggestion.filter((item) =>
          item.term.toLowerCase().includes(lowerCaseQuery)
        ),
        collection: jsondata.collection.filter((item) =>
          item.title.toLowerCase().includes(lowerCaseQuery)
        ),
        product: jsondata.product.filter((item) =>
          item.title.toLowerCase().includes(lowerCaseQuery)
        ),
      };
    };

    const filteredData = filterData(jsondata, inputValue);

    return (
      <div className="bg-teal-500 h-dvh p-10 content-center">
        <label className="text-gray-200">Product Search</label>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputValue}
          onFocus={() => setIsFocus(true)}
          className="mr-6 mt-6 border rounded-lg block w-full p-2.5"
          placeholder="Type product..."
        />
        {isFocus && (
          <div className="p-4 shadow-lg bg-gray-50/75 mt-1 rounded">
            {settings.showSuggestion && (
              <div>
                <div className="bg-gray-500 p-2 rounded">
                  <h3 className="text-center text-slate-300">Suggestion</h3>
                </div>
                <ul>
                  {filteredData.suggestion.map((item, index) => (
                    <a href={item.url}><li className="hover:bg-gray-100 py-3 px-3 rounded" key={index}>{item.term}</li></a>
                  ))}
                </ul>
              </div>
            )}
            {settings.showCollection && (
              <div>
                <div className="bg-gray-500 p-2 rounded">
                  <h3 className="text-center text-slate-300">Collection</h3>
                </div>
                <ul>
                  {filteredData.collection.map((item, index) => (
                    <a href={item.url}><li className="hover:bg-gray-100 py-3 px-3 rounded" key={index}>{item.title}</li></a>
                  ))}
                </ul>
              </div>
            )}
            {settings.showProduct && (
              <div>
                <div className="bg-gray-500 p-2 rounded">
                  <h3 className="text-center text-slate-300">Product</h3>
                </div>
                <ul>
                  {filteredData.product.map((item, index) => (
                    <a href={item.url}>
                      <li className="hover:bg-gray-100 py-3 px-3 rounded" key={index}>
                        <div className="flex flex-row">
                          <img className="basis-1/4 max-w-32" src={item.img} alt="" />
                          <div className="basis-1/4 ml-3">
                            <h2 className="text-lg font-bold">{item.title}</h2>
                            <h2>Brand: {item.brand}</h2>
                            <h2 className="text-blue-500">{item.price}</h2>
                          </div>
                        </div>                                              
                      </li>
                    </a>
                    
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="App">
      <div className="m-3">
        <AutoSuggestion />
      </div>
    </div>
  );
}

export default App;
