import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import { supabaseUrl } from "../../services/supabase";
import { useCreateCabin } from "./useCreateCabin";

function CreateCabinForm({ cabinToEdit }) {
  const { id: editId, ...editValues } = cabinToEdit || {};
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  const { isWorking: isCreating, createCabin } = useCreateCabin({ reset });

  //  START
  const queryClient = useQueryClient();
  const { isLoading: isWorking, mutate } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
      toast.success(`Cabin ${isEditSession ? "updated" : "created"}`);
    },
    onError: (err) => {
      toast.error(err);
      console.error("Error while creating a new cabin:\n", err);
    },
  });
  //  END

  function onSubmit(data) {
    if (isEditSession) {
      mutate({
        ...data,
        id: editId,
        image: typeof data.image == "object" ? data.image[0] : data.image,
      });
    } else {
      createCabin({ ...data, image: data.image[0] });
    }
    // const cabinData = isEditSession
    //   ? {
    //       ...data,
    //       id: editId,
    //       image: typeof data.image == "object" ? data.image[0] : data.image,
    //     }
    //   : { ...data, image: data.image[0] };

    // mutate(cabinData);
  }

  function onError(err) {
    // console.error(err);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label={"Cabin name"} error={errors?.name?.message}>
        <Input
          disabled={isWorking || isCreating}
          type="text"
          id="name"
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label={"Maximum capacity"} error={errors?.maxCapacity?.message}>
        <Input
          disabled={isWorking || isCreating}
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least one",
            },
          })}
        />
      </FormRow>

      <FormRow label={"Regular price"} error={errors?.regularPrice?.message}>
        <Input
          disabled={isWorking || isCreating}
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 10,
              message: "Price should be at least 10",
            },
          })}
        />
      </FormRow>

      <FormRow label={"Discount"} error={errors?.discount?.message}>
        <Input
          disabled={isWorking || isCreating}
          type="number"
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
          disabled={isWorking || isCreating}
          type="number"
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
          disabled={isWorking || isCreating}
          variation="secondary"
          type="reset"
        >
          Cancel
        </Button>
        <Button disabled={isWorking || isCreating}>
          {isEditSession ? "Edit cabin" : "Create a new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
