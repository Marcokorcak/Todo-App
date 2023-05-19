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

const loginUser = async (email, password) => {
  const authResponse = await supabase.auth.signInWithPassword({
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
    const meta = await supabase
      .from("profile")
      .select("*")
      .eq("user_id", authResponse.data.user.id);

    if (meta.error) {
      return {
        success: false,
        error: meta.error,
      };
    }
    return {
      ...authResponse,
      meta,
      message: "Successfully logged in, please wait to be redirected",
      success: true,
    };
  }

  return {
    success: false,
    error: {
      message: "An unknown error has occurred",
    },
  };
};

const getCurrentUser = async () => {
  debugger;
  // grab the session from supabase (which handles all authentication)
  const session = await supabase.auth.getSession();
  // if a user property exists in the session.data.session object
  if (session?.data?.session?.user) {
    //grab from the meta table we created for the current logged
    // in user, and attach it to the user object under the key
    // barge meta, this is so we can access for the current user's
    // name and slug
    const { data: bargeMeta, error } = await supabase
      .from("profile")
      .select("*")
      .eq("user_id", session.data.session.user.id)
      .single();

    if (error) {
      return {
        success: false,
        error,
      };
    }

    // here we take the user from the session.data.session
    // object and attach to it a property bargeMeta
    // that holds the name and slug (and some other info
    // that is not important)
    const { data: socialLinks } = await getSocialLinks(
      session.data.session.user.id
    );
    if (socialLinks?.error) {
      return socialLinks;
    }

    const { data: linkLinks } = await getLinksLinks(
      session.data.session.user.id
    );
    if (linkLinks?.error) {
      return socialLinks;
    }

    const user = {
      ...session.data.session.user,
      bargeMeta,
      socialLinks,
      linkLinks,
    };

    return {
      success: true,
      data: user,
    };
  }
  return {
    success: true,
    data: null,
  };
};
const linkRequestData = {
  data: null,
};

const getLinks = async (userId) => {
  if (linkRequestData.data) {
    return linkRequestData.data;
  }

  const { data, error } = await supabase
    .from("links")
    .select("*")
    .eq("user_id", userId);
  if (error) {
    return {
      success: false,
      error,
    };
  }

  linkRequestData.data = { success: true, data };

  return { success: true, data };
};

const logout = async () => {
  const { error } = await supabase.auth.signOut();
  return { success: !error, error };
};

export { registerUser, loginUser, getCurrentUser, logout };
