import PreAuthorizationRequest from "../../../pre-authorization-request"

export default async function PreAuthorizationRequestPage({ params }: { params: Promise<{ id: string }> }) {

  const { id } = await params; 
  return <PreAuthorizationRequest requestId={id} />
}







