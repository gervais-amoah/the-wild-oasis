import React from "react";
import styled from "styled-components";

const ImagePreviewWrapper = styled.div`
  overflow: hidden;
  height: 250px;
  position: relative;
  width: 62%;
`;

const ImagePreviewStyle = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

function ImagePreview({ selectedImage, cabinToEdit, editImage }) {
  return (
    <ImagePreviewWrapper>
      {(selectedImage || cabinToEdit) && (
        <ImagePreviewStyle src={selectedImage || editImage} alt="Preview" />
      )}
    </ImagePreviewWrapper>
  );
}

export default ImagePreview;
