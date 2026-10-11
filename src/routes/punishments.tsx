import { createFileRoute } from '@tanstack/react-router';
import { GuidePage } from '@/components/guide-page';
export const Route = createFileRoute('/punishments')({
 head: () => ({ meta: [{ title: 'Modguard — Punishment guide' }, { name: 'description', content: 'Every violation and escalation, straight from your server handbook.' }, { property: 'og:title', content: 'Modguard — Punishment guide' }, { property: 'og:description', content: 'Every violation and escalation, straight from your server handbook.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }),
 component: () => <GuidePage kind="punishments" title="Punishment guide" description="Every violation and escalation, straight from your server handbook."/>,
});
