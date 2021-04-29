import axios from "axios";
import request from "./request";

const COLINS_DICTIONARY_API_KEY = "4c546e37-c9e5-4840-945c-b4f14e3a57b6";

export function fetchDataFromColins(word) {
  return request({
    method: "get",
    url: `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${COLINS_DICTIONARY_API_KEY}`,
  });
}
