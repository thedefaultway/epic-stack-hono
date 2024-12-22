import { generateSitemap } from '@nasa-gcn/remix-seo'
import { type ServerBuild, type ServerRouter } from 'react-router'
import { type RouteManifest } from 'remix-flat-routes'
import { getDomainUrl } from '#app/utils/misc.tsx'
import { type Route } from './+types/sitemap[.]xml.ts'

export async function loader({ request, context }: Route.LoaderArgs) {
	const serverBuild = (await context.serverBuild) as ServerBuild
	const routes = serverBuild?.routes as RouteManifest<
		Omit<typeof ServerRouter, 'children'>
	>
	return generateSitemap(request, routes, {
		siteUrl: getDomainUrl(request),
		headers: {
			'Cache-Control': `public, max-age=${60 * 5}`,
		},
	})
}
