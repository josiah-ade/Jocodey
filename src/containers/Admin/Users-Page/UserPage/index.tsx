"use client";


import TableSection from "@/components/Admin/common/TableSection";
import HeaderTitle from "@/components/Admin/Title/HeaderTitle";
import SummaryCardComponent from "@/components/Card/Summary";
import { userColumns } from "@/const/admin/TableColumn/userColumn";
import { GetUserDataProps } from "@/interface/api/types";
import { useApiDataStore } from "@/store/api/data";
import { metaBuilder } from "@/utils/common/meta-builder";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect } from "react";
import { FaPlus } from "react-icons/fa";

interface Props {
  data: GetUserDataProps;
}
function UserPageContainer({ data }: Props) {
  const { setUserData, userData } = useApiDataStore();

  useEffect(() => {
    setUserData(data);
  }, [data, setUserData]);

  return (
    <>
      <HeaderTitle
        title="Users"
        subTitle="Here's all users that can perform an action."
      />
      <section className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-8">
        <SummaryCardComponent
          bg="bg-orange-400"
          textColor="text-orange-400"
          title="Total Users"
          subTitle={userData.totalRecords}
        >
          <UserGroupIcon className="w-6 h-6 sm:w-8 sm:h-8" />
        </SummaryCardComponent>
      </section>
      <div className="mt-10">
        <div className="mb-6 mt-10">
          <Link
            className="mb-5 min-w-[120px] cursor-pointer inline-flex items-center justify-center py-3 px-6 shadow-sm text-sm font-medium rounded-lg text-gray-text bg-bg1 border border-border1 hover:opacity-70"
            href="/admin/users/create"
          >
            <FaPlus className="h-4  w-4 mr-2 font-medium" />
            Add New User
          </Link>
        </div>
        <TableSection
          columns={userColumns}
          data={userData.data}
          title="Users"
          message="No User created."
          meta={metaBuilder(userData)}
        />
      </div>
    </>
  );
}

export default UserPageContainer;
