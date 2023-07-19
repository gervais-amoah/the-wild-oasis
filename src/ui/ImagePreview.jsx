import React from "react";
import styled from "styled-components";

const ImagePreviewWrapper = styled.div`
  overflow: hidden;
  height: 250px;
  position: relative;
  width: 62%;
  margin-top: 2rem;
  border-radius: 0.7rem;

  @media (max-width: 767px) {
    width: 100%;
    height: 150px;
  }
`;

const ImagePreviewStyle = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

function ImagePreview({ selectedImage, cabinToEdit, editImage }) {
  return (
    (selectedImage || cabinToEdit) && (
      <ImagePreviewWrapper>
        <ImagePreviewStyle src={selectedImage || editImage} alt="Preview" />
      </ImagePreviewWrapper>
    )
  );
}

export default ImagePreview;
