import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { GlobalState } from "../../../GlobalState";
import AdminDash from "../dashbord/AdminDash";
import { useHistory, useParams } from "react-router-dom";

const initialState = {
  formation_id: "",
  title: "",
  price: 0,
  description: "",
  nomFormateur: "",
  category: "",
  _id: "",
};

function CreateFormation() {
  const state = useContext(GlobalState);
  const [formation, setFormation] = useState(initialState);
  const [categories] = state.CategoriesAPI.categories;
  const [images, setImages] = useState(false);

  const [token] = state.token;
  const history = useHistory();
  const param = useParams();

  const [formations] = state.FormationsAPI.formations;
  const [onEdit, setOnEdit] = useState(false);
  const [callback, setCallback] = state.FormationsAPI.callback;

  useEffect(() => {
    if (param.id) {
      setOnEdit(true);
      formations.forEach((formation) => {
        if (formation._id === param.id) {
          setFormation(formation);
          console.log(formation);
          setImages(formation.images);
        }
      });
    } else {
      setOnEdit(false);
      setFormation(initialState);
      setImages(false);
    }
  }, [param.id]);

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];

      if (!file) return alert("File not exist.");

      if (file.size > 1024 * 1024)
        // 1mb
        return alert("Size too large!");

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        // 1mb
        return alert("File format is incorrect.");

      let formData = new FormData();
      formData.append("file", file);

      const res = await axios.post("/api/upload_avatar", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });

      setImages(res.data);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleDestroy = async () => {
    try {
      await axios.post(
        "/api/destroy",
        { public_id: images.public_id },
        {
          headers: { Authorization: token },
        }
      );

      setImages(false);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormation({ ...formation, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!images) return alert("No Image Upload");

      if (onEdit) {
        await axios.put(
          `/api/formation/${formation._id}`,
          { ...formation, images },
          {
            headers: { Authorization: token },
          }
        );
        alert("formation suceesfully update");
      } else {
        await axios.post(
          "/api/formation",
          { ...formation, images },
          {
            headers: { Authorization: token },
          }
        );
      }
      setCallback(!callback);
      history.push("/create_formation");
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const styleUpload = {
    display: images ? "block" : "none",
  };

  return (
    <>
      <AdminDash />
      <section id="main-content">
        <section className="wrapper">
          <h3>New Frormation</h3>

          <div className="create_product">
            <div className="upload">
              <input
                type="file"
                name="file"
                id="file_up"
                onChange={handleUpload}
              />
              <div id="file_img" style={styleUpload}>
                <img src={images ? images.url : ""} alt="" />
                <span onClick={handleDestroy}>X</span>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="row">
                <label htmlFor="formation_id">Formation ID</label>
                <input
                  type="text"
                  name="formation_id"
                  id="formation_id"
                  required
                  value={formation.formation_id}
                  onChange={handleChangeInput}
                />
              </div>

              <div className="row">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  required
                  value={formation.title}
                  onChange={handleChangeInput}
                />
              </div>

              <div className="row">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  required
                  value={formation.price}
                  onChange={handleChangeInput}
                />
              </div>
              <div className="row">
                <label htmlFor="nomFormateur">Nom du Formateur</label>
                <input
                  type="text"
                  name="nomFormateur"
                  id="nomFormateur"
                  required
                  value={formation.nomFormateur}
                  onChange={handleChangeInput}
                />
              </div>

              <div className="row">
                <label htmlFor="description">Description</label>
                <textarea
                  type="text"
                  name="description"
                  id="description"
                  required
                  value={formation.description}
                  rows="5"
                  onChange={handleChangeInput}
                />
              </div>

              <div className="row">
                <label>Categories: </label>
                <select
                  name="category"
                  value={formation.category}
                  onChange={handleChangeInput}
                >
                  <option value="">Please select a category</option>
                  {categories.map((category) => (
                    <option value={category.name} key={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit">{onEdit ? "Update" : "Create"} </button>
            </form>
          </div>
        </section>
      </section>
    </>
  );
}

export default CreateFormation;
