import Link from "next/link"

import getProjects from "@/utils/getProjects"

import Projects from "./Projects"
import Query from "./Query"

export default async function Page({ searchParams }: { searchParams: Record<string, string> }) {
	const projects = await getProjects()
	const projectsTags = [...new Set(projects.flatMap(p => p.tags))]

	const search = new URLSearchParams(searchParams)
	const tags = (search.get("tags")?.split(",") ?? []).filter(t => projectsTags.includes(t))
	const order = search.get("order") ?? "desc"
	const orderBy = search.get("orderBy") ?? "date"

	return (
		<main className="container mx-auto xs:px-4 sm:px-6 xs:py-8 sm:py-12 lg:py-16">
			<Link
				href="/#projects"
				className="inline-block hover:scale-105 font-montserrat-regular xs:text-sm sm:text-base lg:text-md">
				&larr; Home
			</Link>

			<h1 className="xs:mt-2 sm:mt-4 lg:mt-6 xs:text-3xl sm:text-4xl lg:text-5xl w-fit font-montserrat-bold">
				Projects
			</h1>

			<Query
				projectsTags={projectsTags}
				tags={tags}
				order={order}
				orderBy={orderBy}
			/>

			<Projects
				projects={projects}
				tags={tags}
				order={order}
				orderBy={orderBy}
			/>
		</main>
	)
}
