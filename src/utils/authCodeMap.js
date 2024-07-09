export default function mapAuthCodeToMessage(authCode) {
  switch (authCode) {
    case "auth/invalid-password":
    case "auth/invalid-credential":
      return "Email or password is invalid!";
    case "auth/invalid-email":
      return "Invalid email format!";
    case "auth/weak-password":
      return "Weak password!";
    case "auth/email-already-in-use":
      return "Email address already exists!";
    default:
      return "An unexpected error occured!";
  }
}
