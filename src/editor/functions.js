import escapeHtml from 'escape-html'
import { Node, Text } from 'slate'
import {
	EmojiElement,
	MentionElement,
	FileElement,
	ImageElement,
	CheckListItemElement,
	ImageUpload,
	VideoUpload,
	AudioUpload
} from './Element'

export const serialize = (node) => {
	if (Text.isText(node)) {
		if (node.bold) {
			return `<strong>${node.text}</strong>`
		}
		if (node.underline) {
			return `<u>${node.text}</u>`
		}
		if (node.italic) {
			return `<em>${node.text}</em>`
		}
		return escapeHtml(node.text)
	}

	const children = node.children.map((n) => serialize(n)).join('')

	switch (node.type) {
		case 'block-quote':
			return `<blockquote><p>${children}</p></blockquote>`
		case 'code':
			return `<pre><code>${children}</code></pre>`
		case 'heading-one':
			return `<h1>${children}</h1>`
		case 'heading-two':
			return `<h2>${children}</h2>`
		case 'heading-three':
			return `<h3>${children}</h3>`
		case 'heading-four':
			return `<h4>${children}</h4>`
		case 'heading-five':
			return `<h5>${children}</h5>`
		case 'heading-six':
			return `<h6>${children}</h6>`
		case 'paragraph':
			return `<p>${children}</p>`
		case 'bulleted-list':
			return `<ul>${children}</ul>`
		case 'list-item':
			return `<ul>${children}</ul>`
		case 'numbered-list':
			return `<ol>${children}</ol>`
		case 'link':
			return `<a href="${escapeHtml(node.url)}">{children}</a>`
		// case 'image':
		// 	return <ImageElement {...props} />
		// case 'check-list-item':
		// 	return <CheckListItemElement {...props} />
		// case 'table':
		// 	return `<table><tbody {...attributes}>{children}</tbody></table>`
		// case 'table-row':
		// 	return <tr {...attributes}>{children}</tr>
		// case 'table-cell':
		// 	return <td {...attributes}>{children}</td>
		// case 'upload':
		// 	return <FileElement {...props} />
		// case 'mention':
		// 	return <MentionElement {...props} />
		// case 'emoji':
		// 	return <EmojiElement {...props} />
		default:
			return `<div>${children}</div>`
	}
}

export const Element = (props) => {
	const { attributes, children, element } = props
	switch (element.type) {
		case 'block-quote':
			return <blockquote {...attributes}>{children}</blockquote>
		case 'code':
			return (
				<pre>
					<code {...attributes}>{children}</code>
				</pre>
			)
		case 'heading-one':
			return (
				<h1 style={{ fontSize: '1.8em' }} {...attributes}>
					{children}
				</h1>
			)
		case 'heading-two':
			return <h2 {...attributes}>{children}</h2>
		case 'heading-three':
			return <h3 {...attributes}>{children}</h3>
		case 'heading-four':
			return <h4 {...attributes}>{children}</h4>
		case 'heading-five':
			return <h5 {...attributes}>{children}</h5>
		case 'heading-six':
			return <h6 {...attributes}>{children}</h6>
		case 'paragraph':
			return <p {...attributes}>{children}</p>
		case 'bulleted-list':
			return <ul {...attributes}>{children}</ul>
		case 'list-item':
			return <li {...attributes}>{children}</li>
		case 'numbered-list':
			return <ol {...attributes}>{children}</ol>
		case 'link':
			return (
				<a href={element.url} {...attributes}>
					{children}
				</a>
			)
		case 'image':
			return <ImageElement {...props} />
		case 'check-list-item':
			return <CheckListItemElement {...props} />
		case 'table':
			return (
				<table>
					<tbody {...attributes}>{children}</tbody>
				</table>
			)
		case 'table-row':
			return <tr {...attributes}>{children}</tr>
		case 'table-cell':
			return <td {...attributes}>{children}</td>
		case 'upload':
			return <FileElement {...props} />
		case 'image-upload':
			return <ImageUpload {...props} />
		case 'video-upload':
			return <VideoUpload {...props} />
		case 'audio-upload':
			return <AudioUpload {...props} />
		case 'mention':
			return <MentionElement {...props} />
		case 'emoji':
			return <EmojiElement {...props} />
		default:
			return <div {...attributes}>{children}</div>
	}
}

export const Leaf = ({ attributes, children, leaf }) => {
	if (leaf.bold) {
		children = <strong>{children}</strong>
	}

	if (leaf.code) {
		children = <code>{children}</code>
	}

	if (leaf.italic) {
		children = <em>{children}</em>
	}

	if (leaf.underline) {
		children = <u>{children}</u>
	}

	if (leaf.strikethrough) {
		children = <del>{children}</del>
	}

	return <span {...attributes}>{children}</span>
}
