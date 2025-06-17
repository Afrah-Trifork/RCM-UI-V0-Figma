import ResubmissionScreen from "../../../resubmission-screen"

export default async function ResubmissionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ResubmissionScreen claimId={id} />
}

