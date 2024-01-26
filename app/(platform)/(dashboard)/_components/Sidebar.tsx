'use client'

import { Accordion } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { useOrganization, useOrganizationList } from '@clerk/nextjs'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { useLocalStorage } from 'usehooks-ts'
import { NavItem, Organization } from './nav-item'

interface SidebarProps {
    storageKey?: string
}
export const Sidebar = ({ storageKey = 't-sidebar-state' }: SidebarProps) => {
    const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
        storageKey,
        {}
    )
    const { organization: activeOrganization, isLoaded: isLoadedOrg } =
        useOrganization()

    const { userMemberships, isLoaded: isLoadedOrgList } = useOrganizationList({
        userMemberships: {
            infinite: true,
        },
    })

    const defaultAccordionValue: string[] = Object.keys(expanded).reduce(
        (acc: string[], key: string) => {
            if (expanded[key]) {
                acc.push(key)
            }
            return acc
        },
        []
    )

    const onExpand = (id: string) => {
        setExpanded((curr) => ({
            ...curr,
            [id]: !expanded[id],
        }))
    }

    if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) {
        return (
            <>
                <Skeleton />
            </>
        )
    }
    return (
        <>
            <div className="mb-1 flex items-center text-xs font-medium">
                <span className="pl-4">Workspaces</span>
                <Button size="icon" asChild variant="ghost" className="ml-auto">
                    <Link href="/select-org">
                        <Plus className=" h-4 w-4" />
                    </Link>
                </Button>
            </div>
            <Accordion
                type="multiple"
                className="space-y-2"
                defaultValue={defaultAccordionValue}
            >
                {userMemberships.data.map(({ organization }) => (
                    <NavItem
                        key={organization.id}
                        isActive={activeOrganization?.id === organization.id}
                        isExpanded={expanded[organization.id]}
                        organization={organization as Organization}
                        onExpand={onExpand}
                    />
                ))}
            </Accordion>
        </>
    )
}
