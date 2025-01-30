import { FormEvent, MouseEventHandler, useState } from "react";
import { useAuth } from "@/providers/Auth";
import Modal from "./Modal";
import PrimaryButton from "./PrimaryButton";
import axios from "axios";
import BounceLoader from "react-spinners/BounceLoader";

type SignupFormProps = {
  className: string;
  onClickOutside: (event: MouseEvent | TouchEvent) => void;
  onLoginClick: MouseEventHandler;
};
export default function SignupForm({
  className,
  onClickOutside,
  onLoginClick,
}: SignupFormProps) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setAuthenticated } = useAuth();

  async function signupUser(e: FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post("/rest-auth/registration", {
        username: username,
        email: email,
        password1: password,
        password2: password,
      });
      setAuthenticated(true);
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  }
  return (
    <Modal className={className} onClickOutside={onClickOutside}>
      {isLoading ? (
        <div className="p-10">
          <h1 className="text-3xl font-bold text-center">Signing Up...</h1>
          <BounceLoader
            cssOverride={{ margin: "2rem auto", display: "block" }}
            size={100}
            color={"#E60023"}
            loading={isLoading}
          />
        </div>
      ) : (
        <form onSubmit={signupUser} className="p-10 text-center">
          <h1 className="text-3xl font-bold">Welcome to AltPins</h1>
          <h2>Find new ideas to try</h2>
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            name="username"
            type="text"
            className="block mx-auto w-64 rounded-xl border-2 border-gray-300 px-4 py-2 my-2"
            placeholder="Username"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            name="email"
            type="text"
            className="block mx-auto w-64 rounded-xl border-2 border-gray-300 px-4 py-2 my-2"
            placeholder="Email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            name="password"
            type="password"
            className="block mx-auto w-64 rounded-xl border-2 border-gray-300 px-4 py-2 my-2"
            placeholder="Password"
          />
          <PrimaryButton className="block w-64 mx-auto">Continue</PrimaryButton>
        </form>
      )}
      <hr className="mx-auto w-4/5" />
      <div onClick={onLoginClick} className="cursor-pointer py-5 text-center">
        Already a member? Login
      </div>
    </Modal>
  );
}
