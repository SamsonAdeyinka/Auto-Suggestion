import { useState } from "react";
import "./App.css";

function App() {
  const sampleData = {
    suggestion: [
      { term: "red top", url: "/termone" },
      { term: "term 2", url: "/termtwo" },
      { term: "term 3", url: "/termthree" },
    ],
    collection: [
      { id: 1, title: "tops", url: "/collectionone" },
      { id: 2, title: "collection 2", url: "/collectiontwo" },
      { id: 3, title: "collection 3", url: "/collectionthree" },
    ],
    product: [
      { id: 1, title: "tank top", url: "/productone", brand: "Nike", price: ""},
      { id: 2, title: "product 2", url: "/producttwo", brand: "Adidas"},
      { id: 3, title: "product 3", url: "/productthree", brand: "Vans"},
    ],
  };

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

    const filterData = (data, query) => {
      if (!query) {
        return {
          suggestion: [],
          collection: [],
          product: [],
        };
      }

      const lowerCaseQuery = query.toLowerCase();

      return {
        suggestion: data.suggestion.filter((item) =>
          item.term.toLowerCase().includes(lowerCaseQuery)
        ),
        collection: data.collection.filter((item) =>
          item.title.toLowerCase().includes(lowerCaseQuery)
        ),
        product: data.product.filter((item) =>
          item.title.toLowerCase().includes(lowerCaseQuery)
        ),
      };
    };

    const filteredData = filterData(sampleData, inputValue);

    return (
      <div className="bg-teal-500 h-dvh p-10 content-center">
        <label className="text-gray-200" >Product Search</label>
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
                    <li key={index}>{item.term}</li>
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
                    <li key={index}>{item.title}</li>
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
                    <li key={index}>{item.title}</li>
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
