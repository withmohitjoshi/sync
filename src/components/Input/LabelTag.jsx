import React from "react";

const LabelTag = ({ label }) => {
  return label && <label className="input-label text-gray-100">{label}</label>;
};

export default LabelTag;
