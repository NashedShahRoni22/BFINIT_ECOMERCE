import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";

export default function useAuth() {
  const authInfo = useContext(AuthContext);
  return authInfo;
}
