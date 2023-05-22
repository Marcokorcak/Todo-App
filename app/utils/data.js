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
    const { data, error } = await supabase
      .from("profile")
      .select("*")
      .eq("user_id", session.data.session.user.id)
      .single();

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    // here we take the user from the session.data.session
    // object and attach to it a property bargeMeta
    // that holds the name and slug (and some other info
    // that is not important)
    /* const { data: socialLinks } = await getSocialLinks(
      session.data.session.user.id
    );
    if (socialLinks?.error) {
      return socialLinks;
    } */

    /* const { data: linkLinks } = await getLinksLinks(
      session.data.session.user.id
    );
    if (linkLinks?.error) {
      return socialLinks;
    } */

    const user = {
      ...session.data.session.user,
      ListoMeta: data,
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

const recentUserList = async (num = 5) => {
  const { data, error } = await supabase
    .from("profile")
    .select("name, user_id")
    .order("created_at", { ascending: false })
    .limit(num);

  if (error) {
    return {
      success: false,
      error,
    };
  }

  return {
    success: true,
    data,
  };
};

const logout = async () => {
  const { error } = await supabase.auth.signOut();
  return { success: !error, error };
};

const createList = async (title, content, user_id) => {
  const insertResponse = await supabase
    .from("list")
    .insert({
      title,
      content,
      user_id,
    })
    .select();

  if (insertResponse.error) {
    return {
      success: false,
      error: insertResponse.error,
    };
  }
  return {
    success: true,
    message: "successfully added",
    data: insertResponse.data,
  };
};

const list_user = async (user_id) => {
  const { data, error } = await supabase
    .from("list")
    .select("title, id")
    .eq("user_id", user_id);
  if (error) {
    return {
      success: false,
      error,
    };
  }

  return {
    success: true,
    data,
  };
};

const Ibl = async (id) => {
  const { data, error } = await supabase
    .from("list_item")
    .select("title, order, status, id")
    .eq("list_id", id)
    .order("order", { ascending: true });

  if (error) {
    return {
      success: false,
      error,
    };
  }

  return {
    success: true,
    data,
  };
};

const Lid = async (id) => {
  const { data, error } = await supabase
    .from("list")
    .select("title")
    .eq("id", id);
  if (error) {
    return {
      success: false,
      error,
    };
  }

  return {
    success: true,
    data,
  };
};

const insertNewItem = async (title, order, status, list_id) => {
  const insertResponse = await supabase
    .from("list_item")
    .insert({
      title,
      order,
      status,
      list_id,
    })
    .select();

  if (insertResponse.error) {
    return {
      success: false,
      error: insertResponse.error,
    };
  }
  return {
    success: true,
    message: "successfully added",
    data: insertResponse.data,
  };
};

const removeItem = async (itemId) => {
  const deleteResponse = await supabase
    .from("list_item")
    .delete()
    .eq("id", itemId);
};

const modifyItem = async (itemId, status) => {
  const updateResponse = await supabase
    .from("list_item")
    .update({ status: status })
    .eq("id", itemId);
};

const ChangePlacement = async (itemId, current, destination, lid) => {
  await supabase.rpc("changeorder", {
    item_id: itemId,
    current: current,
    destination: destination,
    lid: lid,
  });
};

export {
  registerUser,
  loginUser,
  getCurrentUser,
  recentUserList,
  logout,
  createList,
  list_user,
  Ibl,
  Lid,
  insertNewItem,
  removeItem,
  modifyItem,
  ChangePlacement,
};
