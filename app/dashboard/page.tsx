import { apps } from "@/lib/data/apps";
import { GenericList } from "@/app/components/genericList";
import { GridLayout } from "@/app/components/layouts/gridLayout";
import DashboardTile from "@/app/components/dashboardTile";

export default function DashboardPage() {
  return (
    <GridLayout spacing={2} alignItems="center" justifyContent="center">
      <GenericList
        items={apps}
        renderItem={(app) => <DashboardTile key={app.id} {...app} />}
      />
    </GridLayout>
  );
}
