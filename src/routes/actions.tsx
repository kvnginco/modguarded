import { createFileRoute } from '@tanstack/react-router';
import { GuidePage } from '@/components/guide-page';
export const Route = createFileRoute('/actions')({
 head: () => ({ meta: [{ title: 'Modguard — Action reference' }, { name: 'description', content: 'The right action, with the right reason.' }, { property: 'og:title', content: 'Modguard — Action reference' }, { property: 'og:description', content: 'The right action, with the right reason.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }),
 component: () => <GuidePage kind="actions" title="Action reference" description="The right action, with the right reason."/>,
});
