import AreaDetailPage from '@/components/Areas/Areas_Detail'
import React from 'react'

const Page = async ({ params }) => {
  const { slug } = await params

  return (
    <div>
      <AreaDetailPage slug={slug} />
    </div>
  )
}

export default Page
