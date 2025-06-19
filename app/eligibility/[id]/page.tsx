import EligibilityDetailScreen from "../../../eligibility-detail-screen"

export default async function EligibilityDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <EligibilityDetailScreen civilId={id} />
}


