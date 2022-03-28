import React from "react";

const RelatedConditionalTableDiv = ({ relatedSwitch, children }) => (
  <div
    className={`tableSection ${
      relatedSwitch ? "showRelatedColumn" : "noRelatedColumn"
    }`}
  >
    {children}
  </div>
);

export default RelatedConditionalTableDiv;
