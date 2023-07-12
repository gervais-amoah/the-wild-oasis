import supabase from "../services/supabase";
import { supabaseUrl } from "../services/supabase";

export async function createEditCabin(cabinData) {
  let imagePath = "";
  let imageName = "";

  if (
    typeof cabinData.image == "string" &&
    cabinData.image.startsWith(supabaseUrl)
  ) {
    imagePath = cabinData.image;
  } else {
    //  create the image'name and path
    imageName = `${Math.random()}-${cabinData.image.name}`.replace("/", "");
    imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  }

  const query = supabase.from("cabins");
  let reqData;

  if (cabinData.id) {
    //  UPDATE CURR CABIN
    const { data, error } = await query
      .update(cabinData)
      .eq("id", cabinData.id)
      .select();

    if (error) {
      console.error(error);
      throw new Error("Cabin could not be updated");
    }

    reqData = data;
  } else {
    //  CREATE NEW CABIN
    const { data, error } = await query
      .insert([{ ...cabinData, image: imagePath }])
      .select();

    if (error) {
      console.error(error);
      throw new Error("Cabin could not be created");
    }

    //  upload cabin's image
    const { error: uploadError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, cabinData.image);

    if (uploadError) {
      console.error(uploadError);
      // await supabase.from("cabins").delete().eq("id", data.id);
      throw new Error(
        "Cabin image could not be uploaded and the cabin was not created"
      );
    }

    reqData = data;
  }

  return reqData;
}

export async function getCabins() {
  const { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return cabins;
}

export async function deleteCabin(id) {
  const { error, data } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  } else {
    return data;
  }
}
