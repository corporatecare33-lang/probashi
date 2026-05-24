import { createFileRoute } from "@tanstack/react-router";
import { Stub } from "@/components/Stub";

export const Route = createFileRoute("/training")({
  component: () => <Stub title="Training Programs" desc="Skills, language, and pre-departure training catalog coming soon." />,
});
