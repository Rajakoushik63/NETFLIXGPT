export const checkValidData = (email, password, name) => {
  // Check if email matches the regex for email format
  const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    email
  );

  // Check if password is strong (at least one uppercase, lowercase, number, special character, and min length of 8)
  const isPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    );

  // Check if name only contains letters, spaces, apostrophes, or hyphens
  const isNameValid = /^[A-Za-z\s'-]+$/.test(name);

  // Return error messages if validation fails
  if (!isNameValid)
    return "Name is not Valid. It should only contain letters, spaces, and special characters like apostrophes or hyphens.";
  if (!isEmailValid)
    return "Email is not valid. Please enter a valid email address.";
  if (!isPassword)
    return "Password is not valid. It should have at least 8 characters, including uppercase, lowercase, a number, and a special character.";

  // If all validations pass, return null (indicating data is valid)
  return null;
};
