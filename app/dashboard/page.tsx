/** COMPONENTS */
import GenericList from "@/app/components/genericList";
import GridLayout from "@/app/components/layouts/gridLayout";
import DashboardTile from "@/app/components/dashboardTile";

/** MISC */
import { apps } from "@/lib/data/apps";

const DashboardPage = () => (
  <GridLayout spacing={2} alignItems="center" justifyContent="center">
    <GenericList
      items={apps}
      renderItem={(app) => <DashboardTile key={app.id} {...app} />}
    />
  </GridLayout>
);

export default DashboardPage;
