import { getProfile } from "@/lib/actions";
import { redirect } from "next/navigation";

export default async function Home() {
  const profile = await getProfile();

  if (!profile) {
    redirect("/login");
  }
  return (
    <div>
      <h1>Home</h1>
      <p>{profile.name}</p>
      <p>{profile.email}</p>
    </div>
  );
}
