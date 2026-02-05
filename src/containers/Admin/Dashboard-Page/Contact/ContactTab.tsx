import { fetchContactStats } from "@/app/admin/analytics/contact/actions";
import LoadingState from "@/components/common/Loading/LoadingState";
import { useEntityActionAnalytics } from "@/hooks/analytics/analytics-entity";
import { useState } from "react";
import ShowContact from "./ShowContact";

function ContactTab() {
  const [year] = useState(2025);

  const { loading } = useEntityActionAnalytics({
    getData: fetchContactStats,
    year,
    apiPath: "contactAnalytics",
  });

  return <>{loading ? <LoadingState /> : <ShowContact year={year} />}</>;
}

export default ContactTab;
