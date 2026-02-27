import { Providers } from "@/app/providers";
import { getProjectsWithStats } from "@/lib/github";

export const revalidate = 3600;

export default async function Page() {
  const projects = await getProjectsWithStats();

  return <Providers projects={projects} />;
}
