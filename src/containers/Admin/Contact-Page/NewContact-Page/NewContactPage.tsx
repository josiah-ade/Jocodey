"use client";

import TableSection from "@/components/Admin/common/TableSection";
import HeaderTitle from "@/components/Admin/Title/HeaderTitle";
import SummaryCardComponent from "@/components/Card/Summary";
import { contactColumns } from "@/const/admin/TableColumn/contactsColumns";
import { GetContactDataProps } from "@/interface/api/types";
import { useApiDataStore } from "@/store/api/data";
import { metaBuilder } from "@/utils/common/meta-builder";
import { InboxIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";

interface Props {
  data: GetContactDataProps;
}
function ContactPageContainer({ data }: Props) {
  const { setContactsData, contactData } = useApiDataStore();

  useEffect(() => {
    setContactsData(data);
  }, [data, setContactsData]);

  return (
    <>
      <HeaderTitle
        title="Messages"
        subTitle="All those who want to get in contact with the organization."
      />
      <section className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-8">
        <SummaryCardComponent
          bg="bg-orange-400"
          textColor="text-orange-400"
          title="Total Messages"
          subTitle={contactData.totalRecords}
        >
          <InboxIcon className="w-6 h-6 sm:w-8 sm:h-8" />
        </SummaryCardComponent>
      </section>
      <div className="mt-10">
        <TableSection
          columns={contactColumns}
          data={contactData.data}
          title="Messages"
          message="No Message received yet."
          meta={metaBuilder(contactData)}
        />
      </div>
    </>
  );
}

export default ContactPageContainer;
