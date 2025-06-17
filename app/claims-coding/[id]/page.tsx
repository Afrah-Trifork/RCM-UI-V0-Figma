import ClaimsCodingScreen from "../../../claims-coding-screen"


export default async function ClaimsCodingScreenPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return <ClaimsCodingScreen claimId={id} />
}
