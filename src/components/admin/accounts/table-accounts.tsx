'use client'

import { GetListAccounts } from "@/service/account"
import { useQuery } from "@tanstack/react-query"

export default function TableAccounts() {


  const {data: dataAccounts, isLoading: isLoadingAccounts} = useQuery({
    queryFn: () => GetListAccounts(),
    queryKey: ['dataAccounts'],
  })

  console.log(dataAccounts)

  if(isLoadingAccounts) return <div className="loader"/>

  return (
    <div>table-accounts</div>
  )
}
