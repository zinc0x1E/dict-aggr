import logo from "./logo.svg";
import "./App.css";
import "antd/dist/antd.css";
import { Input, Space } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import { Modal, Button, Tooltip } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import WordPage from "./wordPage";
import { fetchDataFromColins } from "./data-access/colins";
import axios from "axios";
import { COLINS_DICTIONARY_API_KEY } from "./secret.json";
import cheerio from "cheerio";

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  // const [word, setWord] = useState("");

  let buffer = "";
  const [defData, setDefData] = useState(undefined);
  // const [isModalVisible, setIsModalVisible] = isModalVisibleHook;
  // let isModalVisible = false
  const fetchData = async (word) => {
    const data = {word: word};
    await axios
      .get(
        `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${COLINS_DICTIONARY_API_KEY}`
      )
      .then((res) => {
        console.log(res);
        data.colins = res.data;
      });

    await axios
      .get(`https://www.91dict.com/words?w=${word}`)
      .then((res) => {
        console.log(res);
        let $ = cheerio.load(res.data);
        let tags = [];
        $("div.tag")
          .children()
          .each((i, ele) => {
            tags.push($(ele).text());
          });
        data.renren = {};
        data.renren.tags = tags;
      })
      .catch((err) => {
        console.log(err);
      });

    return data;
  };

  const showModal = () => {
    console.log("buffer =", buffer);
    // setWord(buffer.trim());
    // console.log("word = ", word);
    fetchData(buffer).then((v) => {
      console.log("============== v =", v)
      setDefData(v);
      setIsModalVisible(true);
    });
  };

  const onTextFieldChange = (e) => {
    buffer = e.target.value;
    console.log(buffer);
  };
  const onSearch = (e) => {
    console.log(e);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <code> Define Words You Want </code>
        </p>{" "}
        <div
          className="search-field-wrapper"
          style={{
            width: "60%",
            height: "2.5em",
          }}
        >
          <input
            onChange={onTextFieldChange}
            style={{ color: "black", height: "100%", width: "80%" }}
          ></input>
          <button
            style={{
              backgroundColor: "#61dafb",
              border: "0px",
              padding: "0px",
              height: "100%",
              width: "20%",
            }}
            onClick={() => {
              onSearch();
              showModal();
            }}
          >
            <SearchOutlined /> Search{" "}
          </button>
        </div>
        <WordPage
          isModalVisible={isModalVisible}
          setIsModalVisible={(newVal) => setIsModalVisible(newVal)}
          defData={defData}
        ></WordPage>
        {/* <Modal
          title="Basic Modal"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal> */}
      </header>{" "}
    </div>
  );
}

export default App;
