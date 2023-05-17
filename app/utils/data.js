import supabase from "./supabase";


const registerUser = async (name, email, password, slug) => {
    const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("slug", slug);
    if(error) {
        return {
            success: false,
            message: error.message,
        };
    }
    if(data.length > 0) {
        return {
            success: false,
            message: "Slug already exists",
        };
    }

    const authResponse = await supabase.auth.signUp({
        email,
        password,
    });

    if(authResponse.error) {
        return {
            success: false,
            message: authResponse.error.message,
        };
    }

    if(authResponse.data.user) {
        const addMetaResponse = await supabase
        .from('users')
        .insert([{ email, name, slug }]);
        console.log(authResponse.data.user)
        if(addMetaResponse.error) {
            return {
                success: false,
                message: addMetaResponse.error.message,
            };
        }
        return {
            success: true,
            message: "Registration complete! Redirecting..." ,
            ...addMetaResponse.data,
        }
    }

    return {
        success: false,
        message: "An unknown error has occurred!!"
    };
}

export {registerUser};