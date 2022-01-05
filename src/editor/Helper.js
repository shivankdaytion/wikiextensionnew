import { jsx } from 'slate-hyperscript'
import { Editor, Transforms, createEditor, Node, Range, Text, Point, Element } from 'slate'
import imageExtensions from 'image-extensions'
import isUrl from 'is-url'
import Styles from './editor.module.less'

const ELEMENT_TAGS = {
	A: (el) => ({ type: 'link', url: el.getAttribute('href') }),
	BLOCKQUOTE: () => ({ type: 'block-quote' }),
	H1: () => ({ type: 'heading-one' }),
	H2: () => ({ type: 'heading-two' }),
	H3: () => ({ type: 'heading-three' }),
	H4: () => ({ type: 'heading-four' }),
	H5: () => ({ type: 'heading-five' }),
	H6: () => ({ type: 'heading-six' }),
	IMG: (el) => ({ type: 'image', url: el.getAttribute('src'), file: [] }),
	LI: () => ({ type: 'list-item' }),
	OL: () => ({ type: 'numbered-list' }),
	P: () => ({ type: 'paragraph' }),
	PRE: () => ({ type: 'code' }),
	UL: () => ({ type: 'bulleted-list' })
}
const TEXT_TAGS = {
	CODE: () => ({ code: true }),
	DEL: () => ({ strikethrough: true }),
	EM: () => ({ italic: true }),
	I: () => ({ italic: true }),
	S: () => ({ strikethrough: true }),
	STRONG: () => ({ bold: true }),
	U: () => ({ underline: true })
}
export const deserialize = (el) => {
	if (el.nodeType === 3) {
		return el.textContent
	} else if (el.nodeType !== 1) {
		return null
	} else if (el.nodeName === 'BR') {
		return '\n'
	}

	const { nodeName } = el
	let parent = el

	if (nodeName === 'PRE' && el.childNodes[0] && el.childNodes[0].nodeName === 'CODE') {
		parent = el.childNodes[0]
	}
	const children = Array.from(parent.childNodes).map(deserialize).flat()

	if (el.nodeName === 'BODY') {
		return jsx('fragment', {}, children)
	}

	if (ELEMENT_TAGS[nodeName]) {
		const attrs = ELEMENT_TAGS[nodeName](el)
		return jsx('element', attrs, children)
	}

	if (TEXT_TAGS[nodeName]) {
		const attrs = TEXT_TAGS[nodeName](el)
		return children.filter((child) => Text.isText(child)).map((child) => jsx('text', attrs, child))
	}

	return children
}
export const withHtml = (editor) => {
	const { insertData, isInline, isVoid } = editor

	editor.isInline = (element) => {
		return element.type === 'link' ? true : isInline(element)
	}

	editor.isVoid = (element) => {
		return element.type === 'image' ? true : isVoid(element)
	}

	editor.insertData = (data) => {
		const html = data.getData('text/html')

		if (html) {
			const parsed = new DOMParser().parseFromString(html, 'text/html')
			const fragment = deserialize(parsed.body)
			Transforms.insertFragment(editor, fragment)
			return
		}

		insertData(data)
	}

	return editor
}

export const withMentions = (editor) => {
	const { isInline, isVoid } = editor

	editor.isInline = (element) => {
		return element.type === 'mention' ? true : isInline(element)
	}

	editor.isVoid = (element) => {
		return element.type === 'mention' ? true : isVoid(element)
	}

	return editor
}

const SHORTCUTS = {
	'*': 'list-item',
	'-': 'list-item',
	'+': 'list-item',
	'>': 'block-quote',
	'#': 'heading-one',
	'##': 'heading-two',
	'###': 'heading-three',
	'####': 'heading-four',
	'#####': 'heading-five',
	'######': 'heading-six'
}

export const withShortcuts = (editor) => {
	const { deleteBackward, insertText } = editor

	editor.insertText = (text) => {
		const { selection } = editor

		if (text === ' ' && selection && Range.isCollapsed(selection)) {
			const { anchor } = selection
			const block = Editor.above(editor, {
				match: (n) => Editor.isBlock(editor, n)
			})
			const path = block ? block[1] : []
			const start = Editor.start(editor, path)
			const range = { anchor, focus: start }
			const beforeText = Editor.string(editor, range)
			const type = SHORTCUTS[beforeText]

			if (type) {
				Transforms.select(editor, range)
				Transforms.delete(editor)
				Transforms.setNodes(editor, { type }, { match: (n) => Editor.isBlock(editor, n) })

				if (type === 'list-item') {
					const list = { type: 'bulleted-list', children: [] }
					Transforms.wrapNodes(editor, list, {
						match: (n) => n.type === 'list-item'
					})
				}

				return
			}
		}

		insertText(text)
	}

	editor.deleteBackward = (...args) => {
		const { selection } = editor

		if (selection && Range.isCollapsed(selection)) {
			const match = Editor.above(editor, {
				match: (n) => Editor.isBlock(editor, n)
			})

			if (match) {
				const [block, path] = match
				const start = Editor.start(editor, path)

				if (block.type !== 'paragraph' && Point.equals(selection.anchor, start)) {
					Transforms.setNodes(editor, { type: 'paragraph' })

					if (block.type === 'list-item') {
						Transforms.unwrapNodes(editor, {
							match: (n) => n.type === 'bulleted-list',
							split: true
						})
					}

					return
				}
			}

			deleteBackward(...args)
		}
	}

	return editor
}

export const withChecklists = (editor) => {
	const { deleteBackward } = editor

	editor.deleteBackward = (...args) => {
		const { selection } = editor

		if (selection && Range.isCollapsed(selection)) {
			const [match] = Editor.nodes(editor, {
				match: (n) => n.type === 'check-list-item'
			})

			if (match) {
				const [, path] = match
				const start = Editor.start(editor, path)

				if (Point.equals(selection.anchor, start)) {
					Transforms.setNodes(editor, { type: 'paragraph' }, { match: (n) => n.type === 'check-list-item' })
					return
				}
			}
		}

		deleteBackward(...args)
	}

	return editor
}

export const withEmojis = (editor) => {
	const { isInline, isVoid } = editor

	editor.isInline = (element) => {
		return element.type === 'emoji' ? true : isInline(element)
	}

	editor.isVoid = (element) => {
		return element.type === 'emoji' ? true : isVoid(element)
	}

	return editor
}
const insertImage = (editor, url) => {
	const text = { text: '' }
	const image = { type: 'image', url, children: [text] }
	Transforms.insertNodes(editor, image)
}
export const withImages = (editor) => {
	const { insertData, isVoid } = editor

	editor.isVoid = (element) => {
		return element.type === 'image' ? true : isVoid(element)
	}

	editor.insertData = (data) => {
		const text = data.getData('text/plain')
		const { files } = data

		if (files && files.length > 0) {
			for (const file of files) {
				const reader = new FileReader()
				const [mime] = file.type.split('/')

				if (mime === 'image') {
					reader.addEventListener('load', () => {
						const url = reader.result
						insertImage(editor, url)
					})

					reader.readAsDataURL(file)
				}
			}
		} else if (isImageUrl(text)) {
			insertImage(editor, text)
		} else {
			insertData(data)
		}
	}

	return editor
}
const isImageUrl = (url) => {
	if (!url) return false
	if (!isUrl(url)) return false
	const ext = new URL(url).pathname.split('.').pop()
	return imageExtensions.includes(ext)
}

export const withUploads = (editor) => {
	const { insertData, isVoid } = editor

	editor.isVoid = (element) => {
		return element.type === 'upload' ? true : isVoid(element)
	}

	return editor
}

/* Tables */

export const withTables = (editor) => {
	const { deleteBackward, deleteForward, insertBreak } = editor

	editor.deleteBackward = (unit) => {
		const { selection } = editor

		if (selection && Range.isCollapsed(selection)) {
			const [cell] = Editor.nodes(editor, {
				match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === 'table-cell'
			})

			if (cell) {
				const [, cellPath] = cell
				const start = Editor.start(editor, cellPath)

				if (Point.equals(selection.anchor, start)) {
					return
				}
			}
		}

		deleteBackward(unit)
	}

	editor.deleteForward = (unit) => {
		const { selection } = editor

		if (selection && Range.isCollapsed(selection)) {
			const [cell] = Editor.nodes(editor, {
				match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === 'table-cell'
			})

			if (cell) {
				const [, cellPath] = cell
				const end = Editor.end(editor, cellPath)

				if (Point.equals(selection.anchor, end)) {
					return
				}
			}
		}

		deleteForward(unit)
	}

	editor.insertBreak = () => {
		const { selection } = editor

		if (selection) {
			const [table] = Editor.nodes(editor, {
				match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === 'table'
			})

			if (table) {
				return
			}
		}

		insertBreak()
	}

	return editor
}
