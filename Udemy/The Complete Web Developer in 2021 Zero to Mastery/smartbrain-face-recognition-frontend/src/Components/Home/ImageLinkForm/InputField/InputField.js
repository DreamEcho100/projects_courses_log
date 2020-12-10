import React from "react";
import "tachyons";

const InputField = React.forwardRef(({ onSubmitBtnClick}, ref) => {
  console.log(ref)
  return (
    <button
      className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
      onClick={ onSubmitBtnClick }
      ref={ ref }
      >
      Detect
    </button>
  );
});

export default InputField;