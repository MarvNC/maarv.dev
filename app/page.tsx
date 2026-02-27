import { Providers } from "@/app/providers";
import { getProjectsWithStats } from "@/lib/github";

export const dynamic = "force-dynamic";

export default async function Page() {
  const projects = await getProjectsWithStats();

  return <Providers projects={projects} />;
}
