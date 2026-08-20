type LexicalTextNode = {
  type: 'text'
  text?: string
  format?: number
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean
}

type LexicalLinebreakNode = {
  type: 'linebreak'
}

type LexicalLinkNode = {
  type: 'link' | 'autolink'
  url?: string
  fields?: { url?: string; newTab?: boolean }
  children?: LexicalInlineNode[]
}

type LexicalInlineNode = LexicalTextNode | LexicalLinebreakNode | LexicalLinkNode

type LexicalParagraphNode = {
  type: 'paragraph'
  children?: LexicalInlineNode[]
}

type LexicalHeadingNode = {
  type: 'heading'
  tag?: string
  children?: LexicalInlineNode[]
}

type LexicalListItemNode = {
  type: 'listitem'
  children?: LexicalInlineNode[]
}

type LexicalListNode = {
  type: 'list'
  listType?: 'bullet' | 'number'
  children?: LexicalListItemNode[]
}

type LexicalBlockNode =
  | LexicalParagraphNode
  | LexicalHeadingNode
  | LexicalListNode

type LexicalRichText = {
  root?: {
    children?: LexicalBlockNode[]
  }
}

type RichTextContent = LexicalRichText | string | null | undefined

interface ContentSection {
  number: string
  title: string
  content: RichTextContent
}

interface ContentSectionsProps {
  sections: ContentSection[]
}

// Convert text containing • bullet characters into proper list elements
function convertBulletsToList(text: string): React.ReactNode {
  // Check if text contains bullet points (• character)
  if (!text.includes('•')) return null

  // Split by • and filter empty strings
  const parts = text.split('•').map(s => s.trim()).filter(Boolean)

  // If the first part doesn't start with •, it's intro text before the bullets
  const fullText = text.trim()
  const startsWithBullet = fullText.startsWith('•')

  if (parts.length <= 1) return null

  const introText = startsWithBullet ? null : parts[0]
  const bulletItems = startsWithBullet ? parts : parts.slice(1)

  return (
    <>
      {introText && <p className="mb-2">{introText}</p>}
      <ul className="list-disc pl-6 mb-2">
        {bulletItems.map((item, i) => (
          <li key={i} className="mb-1">{item}</li>
        ))}
      </ul>
    </>
  )
}

function serializeRichText(content: RichTextContent): React.ReactNode {
  if (!content) return null

  // If content is a string, try parsing as JSON (Lexical rich text stored in textarea)
  if (typeof content === 'string') {
    try {
      const parsed = JSON.parse(content) as LexicalRichText
      if (parsed?.root?.children) {
        return serializeRichText(parsed)
      }
    } catch {
      // Not JSON — check for bullet points, otherwise render as plain text
      const bulletList = convertBulletsToList(content)
      if (bulletList) return bulletList
      return <div className="whitespace-pre-line">{content}</div>
    }
    return null
  }

  // Handle Payload's rich text format
  if (content.root?.children) {
    return content.root.children.map((node, index) => {
      // Handle paragraphs
      if (node.type === 'paragraph') {
        // Check if paragraph text contains • bullets
        const fullText =
          node.children
            ?.map((child) => (child.type === 'text' ? child.text || '' : ''))
            .join('') || ''
        const bulletList = convertBulletsToList(fullText)
        if (bulletList) return <div key={index}>{bulletList}</div>

        return (
          <p key={index} className="mb-2">
            {node.children?.map((child, childIndex) =>
              renderTextNode(child, childIndex)
            )}
          </p>
        )
      }

      // Handle headings
      if (node.type === 'heading') {
        const Tag = (node.tag || 'h2') as keyof JSX.IntrinsicElements
        return (
          <Tag key={index} className="font-semibold mb-2">
            {node.children?.map((child, childIndex) =>
              renderTextNode(child, childIndex)
            )}
          </Tag>
        )
      }

      // Handle lists
      if (node.type === 'list') {
        const ListTag = node.listType === 'bullet' ? 'ul' : 'ol'
        return (
          <ListTag key={index} className="list-disc ml-9 mb-4">
            {node.children?.map((listItem, liIndex) => {
              if (listItem.type === 'listitem') {
                return (
                  <li key={liIndex}>
                    {listItem.children?.map((child, contentIndex) =>
                      renderTextNode(child, contentIndex)
                    )}
                  </li>
                )
              }
              return null
            })}
          </ListTag>
        )
      }

      return null
    })
  }

  return null
}

function renderTextNode(node: LexicalInlineNode | undefined, key: number): React.ReactNode {
  if (!node) return null;

  if (node.type === 'text') {
    let text: React.ReactNode = node.text;

    // Check for format property (used in Lexical/Payload v3)
    const format = node.format || 0;

    // Lexical format flags: 1 = bold, 2 = italic, 4 = strikethrough, 8 = underline
    const isBold = (format & 1) !== 0 || node.bold;
    const isItalic = (format & 2) !== 0 || node.italic;
    const isUnderline = (format & 8) !== 0 || node.underline;
    const isStrikethrough = (format & 4) !== 0 || node.strikethrough;

    // Apply formatting in proper nesting order
    if (isStrikethrough) {
      text = <s>{text}</s>;
    }
    if (isUnderline) {
      text = <u>{text}</u>;
    }
    if (isItalic) {
      text = <em>{text}</em>;
    }
    if (isBold) {
      text = <strong>{text}</strong>;
    }

    return <span key={key}>{text}</span>;
  }

  // Handle linebreak nodes
  if (node.type === 'linebreak') {
    return <br key={key} />;
  }

  // Handle link nodes (Payload v3 Lexical format)
  if (node.type === 'link' || node.type === 'autolink') {
    const url = node.fields?.url || node.url || '#';
    const newTab = node.fields?.newTab ?? true;

    return (
      <a
        key={key}
        href={url}
        target={newTab ? "_blank" : undefined}
        rel={newTab ? "noopener noreferrer" : undefined}
        className="text-gezairi-dark underline hover:opacity-70"
      >
        {node.children?.map((child, childIndex) =>
          renderTextNode(child, childIndex)
        )}
      </a>
    );
  }

  return null;
}

// Convert ALL CAPS titles to Title Case
function toTitleCase(str: string): string {
  // If the string is not mostly uppercase, return as-is
  const upperCount = str.replace(/[^A-Z]/g, '').length
  const letterCount = str.replace(/[^A-Za-z]/g, '').length
  if (letterCount === 0 || upperCount / letterCount < 0.7) return str

  const minorWords = ['a', 'an', 'and', 'as', 'at', 'but', 'by', 'for', 'in', 'of', 'on', 'or', 'the', 'to', 'with']
  return str
    .toLowerCase()
    .split(' ')
    .map((word, i) => {
      if (i === 0 || !minorWords.includes(word)) {
        return word.charAt(0).toUpperCase() + word.slice(1)
      }
      return word
    })
    .join(' ')
}

export function ContentSections({ sections }: ContentSectionsProps) {
  return (
    <section className="w-full flex flex-col gap-[50px] items-center py-[10px]">
      {sections.map((section, index) => (
        <div key={index} className="flex flex-col gap-[20px] items-start px-4 md:px-[10px] w-full max-w-[1330px]">
          {/* Title with gold underline */}
          <div className="flex flex-col gap-[10px] items-start w-full">
            <h2 className="text-[20px] md:text-[24px] lg:text-[28px] font-bold text-gezairi-blue leading-[28px] md:leading-[32px] tracking-[0.55px] md:tracking-[0.78px] relative w-fit">
              {section.number}. {toTitleCase(section.title)}
            </h2>
          </div>

          {/* Content */}
          <div className="text-[14px] md:text-[16px] lg:text-[20px] font-light text-gezairi-dark leading-[24px] md:leading-[28px] w-full ml-0 md:ml-[20px] [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6">
            {serializeRichText(section.content)}
          </div>
        </div>
      ))}
    </section>
  )
}
