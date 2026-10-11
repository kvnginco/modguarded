import { createFileRoute } from '@tanstack/react-router';
import { GuidePage } from '@/components/guide-page';
export const Route = createFileRoute('/staff-rules')({
 head: () => ({ meta: [{ title: 'Modguard — Staff rules' }, { name: 'description', content: 'The standards that keep your team fair, accountable, and consistent.' }, { property: 'og:title', content: 'Modguard — Staff rules' }, { property: 'og:description', content: 'The standards that keep your team fair, accountable, and consistent.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }),
 component: () => <GuidePage kind="staff" title="Staff rules" description="The standards that keep your team fair, accountable, and consistent."/>,
});
