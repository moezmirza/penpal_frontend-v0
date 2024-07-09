export default function mapAuthCodeToMessage(authCode) {
  switch (authCode) {
    case "auth/invalid-email":
    case "auth/invalid-password":
    case "auth/invalid-credential":
      return "Email or password is invalid!";
    case "auth/weak-passord":
        return "weak password"; 
    default:
      return "An unexpected error occured!";
  }
}
