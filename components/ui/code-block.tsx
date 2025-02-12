'use client'

import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { IconCheck, IconCopy } from '@tabler/icons-react'
import { Button } from './button'
import { CardFooter } from './card'
import { DeleteSnippet } from '@/app/(platform)/(dashboard)/_components/DeleteSnippet'
import Link from 'next/link'

type CodeBlockProps = {
    id?: string
    isInfoCard?: boolean
    language: string
    filename: string
    highlightLines?: number[]
    isScrollable?: boolean // New prop to conditionally add scroll
} & (
    | {
          code: string
          tabs?: never
      }
    | {
          code?: never
          tabs: Array<{
              name: string
              code: string
              language?: string
              highlightLines?: number[]
          }>
      }
)

export const CodeBlock = ({
    language,
    id,
    filename,
    code,
    isInfoCard,
    highlightLines = [],
    tabs = [],
    isScrollable = false, // Default to false
}: CodeBlockProps) => {
    const [copied, setCopied] = React.useState(false)
    const [activeTab, setActiveTab] = React.useState(0)

    const tabsExist = tabs.length > 0

    const copyToClipboard = async () => {
        const textToCopy = tabsExist ? tabs[activeTab].code : code
        if (textToCopy) {
            await navigator.clipboard.writeText(textToCopy)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    const activeCode = tabsExist ? tabs[activeTab].code : code
    const activeLanguage = tabsExist
        ? tabs[activeTab].language || language
        : language
    const activeHighlightLines = tabsExist
        ? tabs[activeTab].highlightLines || []
        : highlightLines

    return (
        <div className="relative w-full rounded-lg bg-slate-900 p-4 font-mono text-sm">
            <div className="flex flex-col gap-2">
                {tabsExist && (
                    <div className="flex overflow-x-auto">
                        {tabs.map((tab, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveTab(index)}
                                className={` !py-2 px-3 font-sans text-xs transition-colors ${
                                    activeTab === index
                                        ? 'text-white'
                                        : 'text-zinc-400 hover:text-zinc-200'
                                }`}
                            >
                                {tab.name}
                            </button>
                        ))}
                    </div>
                )}

                {!tabsExist && filename && (
                    <div className="flex items-center justify-between py-2">
                        <div className="text-xs text-zinc-400">{filename}</div>
                        <button
                            onClick={copyToClipboard}
                            className="flex items-center gap-1 font-sans text-xs text-zinc-400 transition-colors hover:text-zinc-200"
                        >
                            {copied ? (
                                <IconCheck size={14} />
                            ) : (
                                <IconCopy size={14} />
                            )}
                        </button>
                    </div>
                )}
            </div>
            <Link href={`/snippets/${id}`}>
                <div className={isScrollable ? 'max-h-96 overflow-y-auto' : ''}>
                    {/* Conditionally apply scroll based on isScrollable prop */}
                    <SyntaxHighlighter
                        language={activeLanguage}
                        style={atomDark}
                        customStyle={{
                            margin: 0,
                            padding: 0,
                            background: 'transparent',
                            fontSize: '0.875rem', // text-sm equivalent
                        }}
                        wrapLines={true}
                        showLineNumbers={true}
                        lineProps={(lineNumber) => ({
                            style: {
                                backgroundColor: activeHighlightLines.includes(
                                    lineNumber
                                )
                                    ? 'rgba(255,255,255,0.1)'
                                    : 'transparent',
                                display: 'block',
                                width: '100%',
                            },
                        })}
                        PreTag="div"
                    >
                        {String(activeCode)}
                    </SyntaxHighlighter>
                </div>
                {isInfoCard && (
                    <CardFooter className="flex">
                        <div className="g4 ml-auto flex gap-4">
                            <Button size="default" variant="secondary" asChild>
                                <Link href={`/snippets/edit/${id}`}>Edit</Link>
                            </Button>
                            <DeleteSnippet id={id || 'id'} />
                        </div>
                    </CardFooter>
                )}
            </Link>
        </div>
    )
}
