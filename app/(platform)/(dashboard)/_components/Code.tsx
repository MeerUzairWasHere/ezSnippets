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
    const lines = highlightedLines?.map((n) => Number(n))

    return (
        <Link href={`/snippets/${id}`}>
            <CodeBlock
                highlightLines={lines}
                filename={filename}
                language={language}
                code={code}
            />
        </Link>
    )
}

export default DynamicCodeBlock
