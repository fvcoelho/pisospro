import ProjectMediaManagement from './ProjectMediaManagement'

export default async function ProjectMediaPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params
  return <ProjectMediaManagement projectId={parseInt(id)} />
}