import { CodeBlock } from '@/components/ui/code-block'
import Link from 'next/link'

interface DynamicCodeBlockProps {
    language: string
    filename: string
    highlightedLines?: string[]
    code: string
    id: string
}

const DynamicCodeBlock: React.FC<DynamicCodeBlockProps> = ({
    language,
    filename,
    code,
    highlightedLines,
    id,
}) => {
    const lines = highlightedLines
        ?.join(',')
        .split(',')
        ?.map((n) => Number(n))
    return (
        // @
        <CodeBlock
            highlightLines={lines}
            id={id}
            filename={filename}
            tabs={[
                {
                    name: 'JavaScript',
                    code: code,
                    language: 'javascript',
                },
                {
                    name: 'Css',
                    code: 'CSS',
                    language: 'javascript',
                },
            ]}
            language={language}
        />
    )
}

export default DynamicCodeBlock
