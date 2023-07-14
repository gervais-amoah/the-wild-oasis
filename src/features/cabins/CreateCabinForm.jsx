import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import { useCreateCabin } from "./useCreateCabin";
import { useUpdateCabin } from "./useUpdateCabin";

function CreateCabinForm({ cabinToEdit, onCloseModal }) {
  const { id: editId, ...editValues } = cabinToEdit || {};
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { errors } = formState;

  const { isCreating, createCabin } = useCreateCabin({ reset, closeModal });
  const { isUpdating, updateCabin } = useUpdateCabin({ closeModal });

  const isWorking = isCreating || isUpdating;

  function isNumeric(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
  }

  function onSubmit(data) {
    // console.log(data);
    if (isEditSession) {
      updateCabin({
        ...data,
        id: editId,
        image: typeof data.image == "object" ? data.image[0] : data.image,
      });
    } else {
      createCabin({ ...data, image: data.image[0] });
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
      type={onCloseModal && "modal"}
    >
      <FormRow label={"Cabin name"} error={errors?.name?.message}>
        <Input
          disabled={isWorking}
          type="text"
          id="name"
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label={"Maximum capacity"} error={errors?.maxCapacity?.message}>
        <Input
          disabled={isWorking}
          type="text"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            validate: (value) =>
              isNumeric(value) || "Please provide a valid number",
            min: {
              value: 1,
              message: "Capacity should be at least one",
            },
          })}
        />
      </FormRow>

      <FormRow label={"Regular price"} error={errors?.regularPrice?.message}>
        <Input
          disabled={isWorking}
          type="text"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
            validate: (value) =>
              isNumeric(value) || "Please provide a valid number",
            min: {
              value: 10,
              message: "Price should be at least 10",
            },
          })}
        />
      </FormRow>

      <FormRow label={"Discount"} error={errors?.discount?.message}>
        <Input
          disabled={isWorking}
          type="text"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              +getValues().regularPrice >= +value ||
              "Discount should be less than the regular price",
          })}
        />
      </FormRow>

      <FormRow
        label={"Description for website"}
        error={errors?.description?.message}
      >
        <Textarea
          disabled={isWorking}
          type="text"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label={"Cabin photo"}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          disabled={isWorking}
          variation="secondary"
          type="reset"
          onClick={closeModal}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit cabin" : "Create a new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
