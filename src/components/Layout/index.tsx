import { Outlet, Navigate, useParams } from "react-router-dom";
import { Note } from "../../types";

type Prop = {
  notes: Note[];
};

const Layout = ({ notes }: Prop) => {
  const { id } = useParams();

  const found = notes.find((n) => n.id == id);

  if (!found) return <Navigate to="/" replace />;

  return <Outlet context={found} />;
};

export default Layout;
