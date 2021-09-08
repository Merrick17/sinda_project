import React, { useContext, useState } from "react";
import { GlobalState } from "../../../GlobalState";
import FormationItem from "../utils/formationItem/formationItem";
import Filters from "./Filters";

function Formations() {
  const state = useContext(GlobalState);
  const [formations] = state.FormationsAPI.formations;
  const [isAdmin] = state.userAPI.isAdmin;

  return (
    <>
      <Filters />

      <div className="formations">
        {formations.map((formation) => {
          return <FormationItem key={formation._id} formation={formation} />;
        })}
      </div>
    </>
  );
}

export default Formations;
