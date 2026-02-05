import SummaryCardComponent from "@/components/Card/Summary";
import { BarChart } from "@/components/Chart/BarChart";
import { useApiDataStore } from "@/store/api/data";
import { ArrowTrendingDownIcon, InboxIcon } from "@heroicons/react/24/outline";

function ShowContact({ year }: { year: number }) {
  const { contactAnalyticsData } = useApiDataStore();

  return (
    <>
      <section className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        <SummaryCardComponent
          bg="bg-orange-400"
          textColor="text-orange-400"
          title="Today"
          subTitle={contactAnalyticsData?.todayContacts}
        >
          <InboxIcon className="w-6 h-6 sm:w-8 sm:h-8" />
        </SummaryCardComponent>

        <SummaryCardComponent
          bg="bg-green-500"
          textColor="text-rose-500"
          title="All-Time Total"
          subTitle={contactAnalyticsData?.allTimeContacts}
         
        >
          <InboxIcon className="w-6 h-6 sm:w-8 sm:h-8" />
        </SummaryCardComponent>
      </section>

      <section className="mt-5 bg-bg1 border border-border1 p-3 md:p-6 rounded-xl shadow-lg">
        {contactAnalyticsData?.chartData && (
          <BarChart
            data={contactAnalyticsData.chartData}
            title={`Contact Overview for ${year}`}
            color="orange-400"
          />
        )}
      </section>
    </>
  );
}

export default ShowContact;
