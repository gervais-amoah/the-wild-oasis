// import Spinner from 'ui/Spinner';
// import { useSettings } from "features/settings/useSettings";
// import { useUpdateSetting } from "features/settings/useUpdateSetting";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import HasError from "../../ui/HasError";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useUser } from "../authentication/useUser";
import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSettings";

function UpdateSettingsForm() {
  const { settings, error, isLoading } = useSettings();
  const { updateSetting, isUpdating } = useUpdateSetting();
  const { isVisitor } = useUser();

  if (isLoading) return <Spinner />;

  if (error) return <HasError />;

  const {
    minBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
    breakfastPrice,
  } = settings;

  function handleBlur(e, field) {
    const { value } = e.target;

    if (!value) return;
    updateSetting({ [field]: value });
  }

  // This time we are using UNCONTROLLED fields, so we will NOT store state
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          defaultValue={minBookingLength}
          onBlur={(e) => handleBlur(e, "minBookingLength")}
          disabled={isUpdating || isVisitor}
          id="min-nights"
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          defaultValue={maxBookingLength}
          onBlur={(e) => handleBlur(e, "maxBookingLength")}
          disabled={isUpdating || isVisitor}
          id="max-nights"
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          defaultValue={maxGuestsPerBooking}
          onBlur={(e) => handleBlur(e, "maxGuestsPerBooking")}
          disabled={isUpdating || isVisitor}
          id="max-guests"
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          defaultValue={breakfastPrice}
          onBlur={(e) => handleBlur(e, "breakfastPrice")}
          disabled={isUpdating || isVisitor}
          id="breakfast-price"
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
