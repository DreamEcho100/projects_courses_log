import React from "react";
import "tachyons";
import classes from "./ImageLinkForm.module.css";

const ImageLinkForm = ({ onInputCange, onSubmitBtnClick }) => {

  return (
    <div className="center-items-in flex-column-direction">
      <p>
        {'This Magic Brain will detect faces in your pictures. Git it a try.'}
      </p>
        <div className={`${classes.form} form pa4 br3 shadow-5 center-items-in full-container-size`}>
          <input onChange={ onInputCange } className="f4 pa2 w-70 center" type="text" />
          <button
            className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
            onClick={ onSubmitBtnClick }
            >
            Detect
          </button>
        </div>
    </div>
  );
};

export default ImageLinkForm;