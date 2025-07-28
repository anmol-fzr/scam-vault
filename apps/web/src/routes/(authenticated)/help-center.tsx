import { Bug, Sparkles, Shield, ScrollText } from "lucide-react"
import { H1, H2, P } from '@/components/ui/typography'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/(authenticated)/help-center')({
  component: RouteComponent,
})

const issues = [
  {
    title: "Have a cool feature idea?",
    subTitle: "Vote on upcoming features or suggest your own",
    icon: Sparkles,
    to: "/feedback?type=feature"
  },
  {
    title: "Found a non - critical bug ?",
    subTitle: "UI glitches or formatting issues ? Report them here :)",
    icon: Bug,
    to: "/feedback?type=bug"
  },
  {
    title: "Privacy Policy",
    subTitle: "Read our privacy policy and data handling practices",
    icon: Shield,
    to: "/privacy"
  },
  {
    title: "Terms of Service",
    subTitle: "Review our terms of service and usage guidelines",
    icon: ScrollText,
    to: "/terms"
  },
]

function RouteComponent() {
  return <div>
    <H1>Help Center</H1>
    <P>We're here to help!</P>

    <div className='space-y-4 md:max-w-lg mt-8' >
      {issues.map((issue) => (
        <Link className="block rounded-lg border border-secondary p-4 transition-colors hover:bg-secondary/40" to={issue.to} target="_blank" >
          <div className="flex items-center gap-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-sparkles h-5 w-5 text-primary">
              <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path><path d="M20 3v4"></path><path d="M22 5h-4"></path><path d="M4 17v2"></path><path d="M5 18H3"></path></svg>
            <div>
              <h3 className="font-medium">{issue.title}</h3>
              <p className="text-sm text-muted-foreground/80">{issue.subTitle}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>
}
