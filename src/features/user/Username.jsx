import { useSelector } from "react-redux";

function Username() {

  const username = useSelector((state) => state.user.Username);
  return <div className="hidden text-sm font-semibold md:block">{username}</div>;
}

export default Username;
