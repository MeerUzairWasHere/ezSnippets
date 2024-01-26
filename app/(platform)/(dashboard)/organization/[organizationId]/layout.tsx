import { OrgControl } from './_components/OrgControl'

export default function OrgIdLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <OrgControl />
            {children}
        </>
    )
}
