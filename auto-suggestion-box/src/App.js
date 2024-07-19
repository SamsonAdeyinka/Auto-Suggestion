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
      { id: 1, title: "tank top", url: "/productone" },
      { id: 2, title: "product 2", url: "/producttwo" },
      { id: 3, title: "product 3", url: "/productthree" },
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
      <div>
        <label>Product Search</label>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputValue}
          onFocus={() => setIsFocus(true)}
          className="mr-6 mt-6 bg-gray-50 border rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Type product..."
        />
        {isFocus && (
          <div className="p-4 shadow-lg">
            {settings.showSuggestion && (
              <div>
                <h3>Suggestion</h3>
                <ul>
                  {filteredData.suggestion.map((item, index) => (
                    <li key={index}>{item.term}</li>
                  ))}
                </ul>
              </div>
            )}
            {settings.showCollection && (
              <div>
                <h3>Collection</h3>
                <ul>
                  {filteredData.collection.map((item, index) => (
                    <li key={index}>{item.title}</li>
                  ))}
                </ul>
              </div>
            )}
            {settings.showProduct && (
              <div>
                <h3>Product</h3>
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
      <div className="m-6">
        <AutoSuggestion />
      </div>
    </div>
  );
}

export default App;
