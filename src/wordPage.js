import React, { useState } from "react";
import { Modal, Button } from "antd";
import logo from "./logo.svg";
import "./App.css";
import "antd/dist/antd.css";
import { Input, Space } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import { SearchOutlined } from "@ant-design/icons";
import { fetchDataFromColins } from "./data-access/colins";
import axios from "axios";
import { COLINS_DICTIONARY_API_KEY } from "./secret.json";
import cheerio from "cheerio";

const WordPage = ({
  isModalVisible,
  setIsModalVisible,
  word,
  data,
  getWord,
  defData,
}) => {
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const renderWordBody = (defData) => {
    if (!isModalVisible || defData === null || defData === undefined) {
      return <h1>LOADING</h1>;
    }

    data = defData;
    try {
      return (
        <>
          <h1><span>{data.word}</span></h1>
          {data.renren.tags.map(tag => <span> | {tag} | </span>)}
          {console.log("in wordPage data =", data)}
          <div className="def-header">
            <div className="pron">
              {console.log("in wordPage 2 data =", data)}
              <span className="pron-mw">/{data.colins[0].hwi.prs[0].mw}/</span>
            </div>
            <div children="parts-wrapper">
              {data.colins.map((part) => (
                <div className="part-wrapper">
                  <h2 className="part-title">
                    <span className="fl"><code>{part.fl}</code></span>
                    <span>      | </span>
                    <span className="hw">{part.hwi.hw}</span>
                  </h2>
                  <div className="defs-wrapper">
                    {part.shortdef.map((def) => (
                      <p className="def">{def}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      );
    } catch {
      return <h1>LOOK UP FAILED</h1>;
    }
  };

  return (
    <>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {renderWordBody(defData)}
      </Modal>
    </>
  );
};

export default WordPage;
