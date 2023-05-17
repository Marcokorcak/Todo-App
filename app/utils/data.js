import supabase from "./supabase";

const registerUser = async (email, password, name, slug) => {
  const { data: registerData, error: registerError } = await supabase
    .from("profile")
    .select("*")
    .eq("slug", slug);
  if (registerError) {
    return {
      success: false,
      error: registerError,
    };
  }
  if (registerData.length > 0) {
    return {
      success: false,
      error: registerError,
    };
  }

  const authResponse = await supabase.auth.signUp({
    email,
    password,
  });

  if (authResponse.error) {
    return {
      success: false,
      error: authResponse.error,
    };
  }

  if (authResponse.data.user) {
    const addMetaResponse = await supabase
      .from("profile")
      .insert([{ user_id: authResponse.data.user.id, name, slug }]);

    if (addMetaResponse.error) {
      return {
        success: false,
        error: addMetaResponse.error,
      };
    }
    return {
      success: true,
      message:
        "Registration successful, please wait a few moments to be taken to the login page",
      ...addMetaResponse.data,
    };
  }

  return {
    success: false,
    error: {
      message: "An unknown error has occurred",
    },
  };
};

export { registerUser };
