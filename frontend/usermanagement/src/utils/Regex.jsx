// Email and Password Regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const validateForm = (formData, setPassErr) => {
    const { email, password, rePassword } = formData;

    if (!emailRegex.test(email)) {
        setPassErr("Invalid email format");
        return false;
    }

    if (!passwordRegex.test(password)) {
        setPassErr(
            "Password must be at least 8 characters long and include 1 uppercase, 1 lowercase, 1 number, and 1 special character"
        );
        return false;
    }

    if (password !== rePassword) {
        setPassErr("Passwords do not match");
        return false;
    }

    setPassErr("");
    return true;
};

export const validatePassword = (password, setPassErr ) => { 

    if (!passwordRegex.test(password)) {
        setPassErr(
            "Password must be at least 8 characters long and include 1 uppercase, 1 lowercase, 1 number, and 1 special character"
        );
    return false;
}
    setPassErr("")
    return true
}