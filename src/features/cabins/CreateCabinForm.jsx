import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import ImagePreview from '../../ui/ImagePreview';
import Input from '../../ui/Input';
import SpinnerMini from '../../ui/SpinnerMini';
import Textarea from '../../ui/Textarea';
import { errorToast, warnVisitor } from '../../utils/helpers';
import { useUser } from '../authentication/useUser';
import { useCreateCabin } from './useCreateCabin';
import { useUpdateCabin } from './useUpdateCabin';

function CreateCabinForm({ cabinToEdit, onCloseModal }) {
  const { isVisitor } = useUser();

  const { id: editId, ...editValues } = cabinToEdit || {};
  const isEditSession = Boolean(editId);

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageFile, setSelectedImageFile] = useState(editValues?.image);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { errors } = formState;

  const { isCreating, createCabin } = useCreateCabin({ reset, closeModal });
  const { isUpdating, updateCabin } = useUpdateCabin({ closeModal });

  const isWorking = isCreating || isUpdating;

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImageFile(file);
    setSelectedImage(URL.createObjectURL(file));
  };

  function isNumeric(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
  }

  function onSubmit(data) {
    if (isVisitor && isEditSession) return warnVisitor();

    try {
      if (isEditSession) {
        updateCabin({
          ...data,
          id: editId,
          // image: typeof data.image == "object" ? data.image[0] : data.image,
          image: selectedImageFile,
        });
      } else {
        // createCabin({ ...data, image: data.image[0] });
        createCabin({ ...data, image: selectedImageFile });
      }
    } catch (error) {
      console.error(error);
      errorToast('Something went wrong');
    }
  }

  function onError(err) {
    console.error(err);
  }

  function closeModal() {
    onCloseModal?.();
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal && 'modal'}
    >
      <FormRow label={'Cabin name'} error={errors?.name?.message}>
        <Input
          disabled={isWorking}
          type="text"
          id="name"
          {...register('name', {
            required: 'This field is required',
          })}
        />
      </FormRow>
      <FormRow label={'Maximum capacity'} error={errors?.maxCapacity?.message}>
        <Input
          disabled={isWorking}
          type="text"
          id="maxCapacity"
          {...register('maxCapacity', {
            required: 'This field is required',
            validate: (value) =>
              isNumeric(value) || 'Please provide a valid number',
            min: {
              value: 1,
              message: 'Capacity should be at least one',
            },
          })}
        />
      </FormRow>
      <FormRow label={'Regular price'} error={errors?.regularPrice?.message}>
        <Input
          disabled={isWorking}
          type="text"
          id="regularPrice"
          {...register('regularPrice', {
            required: 'This field is required',
            validate: (value) =>
              isNumeric(value) || 'Please provide a valid number',
            min: {
              value: 10,
              message: 'Price should be at least 10',
            },
          })}
        />
      </FormRow>
      <FormRow label={'Discount'} error={errors?.discount?.message}>
        <Input
          disabled={isWorking}
          type="text"
          id="discount"
          defaultValue={0}
          {...register('discount', {
            required: 'This field is required',
            validate: (value) =>
              +getValues().regularPrice >= +value ||
              'Discount should be less than the regular price',
          })}
        />
      </FormRow>
      <FormRow label={'Description'} error={errors?.description?.message}>
        <div style={{ display: 'block', width: '100%' }}>
          <Textarea
            disabled={isWorking}
            type="text"
            id="description"
            defaultValue=""
            {...register('description', {
              required: 'This field is required',
            })}
          />
        </div>
      </FormRow>
      <FormRow label={'Cabin photo'}>
        <FileInput
          onChange={handleImageChange}
          id="image"
          required={!isEditSession}
          accept="image/*"
          // {...register("image", {
          //   required: isEditSession ? false : "This field is required",
          // })}
        />
      </FormRow>
      {/* image preview */}
      <ImagePreview
        selectedImage={selectedImage}
        cabinToEdit={cabinToEdit}
        editImage={editValues?.image}
      />
      {/* <div
        style={{
          overflow: "hidden",
          height: "200px",
          position: "relative",
          width: "62%",
        }}
      >
        {(selectedImage || cabinToEdit) && (
          <img
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            src={selectedImage || editValues?.image}
            alt="Preview"
          />
        )}
      </div> */}
      <FormRow>
        <Button
          disabled={isWorking}
          $variation="secondary"
          type="reset"
          onClick={closeModal}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isWorking ? (
            <SpinnerMini />
          ) : isEditSession ? (
            'Edit cabin'
          ) : (
            'Create a new cabin'
          )}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
