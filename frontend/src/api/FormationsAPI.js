import React, { useState, useEffect } from "react";
import axios from "axios";

function FormationsAPI() {
  const [formations, setFormations] = useState([]);
  const [callback, setCallback] = useState(false);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [result, setResult] = useState(0);

  const getformations = async () => {
    const res = await axios.get(
      `/api/formation?limit=${
        page * 9
      }&${category}&${sort}&title[regex]=${search}`
    );
    setFormations(res.data.formations);
    setResult(res.data.result);
  };
  useEffect(() => {
    getformations();
  }, [callback, category, sort, search, page]);

  return {
    formations: [formations, setFormations],
    callback: [callback, setCallback],
    category: [category, setCategory],
    sort: [sort, setSort],
    search: [search, setSearch],
    page: [page, setPage],
    result: [result, setResult],

    callback: [callback, setCallback],
  };
}

export default FormationsAPI;
