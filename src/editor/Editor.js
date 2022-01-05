import { useCallback, useMemo, useState, useRef } from 'react'
import * as React from 'react'
import ReactDOM from 'react-dom'
import isHotkey from 'is-hotkey'
import Icon from '@ant-design/icons'
import { Image, Bold, Italic, Underline, Code, Type, Codepen, List } from 'react-feather'
import { Editable, withReact, useSlate, Slate, ReactEditor } from 'slate-react'
import { Editor, Transforms, createEditor, Range } from 'slate'
import { withHistory } from 'slate-history'
//import { uploadFile, giphySearch } from '../../../model/Api'
//import { useTrackedState } from '../../../contexts/Store'
import { emojiIndex } from 'emoji-mart'
import { Element, serialize, Leaf } from './functions'
import {
	withMentions,
	withHtml,
	withShortcuts,
	withChecklists,
	withEmojis,
	withImages,
	withUploads,
	editorButtons,
	withTables,
	customeditorButtons
} from './Helper'

import { findWordRegex } from '../../../utils/Helper'

import { css } from '@emotion/css'

import styles from './editor.module.less'

const HOTKEYS = {
	'mod+b': 'bold',
	'mod+i': 'italic',
	'mod+u': 'underline',
	'mod+`': 'code'
}
const Portal = ({ children }) => {
	return ReactDOM.createPortal(children, document.body)
}
const LIST_TYPES = ['numbered-list', 'bulleted-list']

const defaultValue = [
	{
		type: 'paragraph',
		children: [{ text: '' }]
	}
]

const PortalContent = ({ chars, selector, index, CommonClick, target }) => {
	return chars.map((char, i) => {
		if (selector === ':') {
			return (
				<div
					key={new Date().getTime() + i}
					style={{
						background: i === index ? '#B4D5FF' : 'transparent'
					}}
					className={styles.PortalRow}
					onClick={(event) => CommonClick(event, char, target)}>
					{`${char.native} - ${char.name}`}
				</div>
			)
		} else if (selector === '@') {
			return (
				<div
					key={new Date().getTime() + i}
					style={{
						background: i === index ? '#B4D5FF' : 'transparent'
					}}
					className={styles.PortalRow}
					onClick={(event) => CommonClick(event, char, target)}>
					{char.name}
				</div>
			)
		} else if (selector === '/') {
			return (
				<div
					key={new Date().getTime() + i}
					style={{
						background: i === index ? '#B4D5FF' : 'transparent'
					}}
					tabIndex={i}
					className={styles.PortalRow}
					onClick={(event) => CommonClick(event, char, target)}>
					{char.icon}
					{char.title}
				</div>
			)
		} else if (selector === 'gif:' || selector === 'stickers:') {
			return (
				<div
					key={new Date().getTime() + i}
					style={{
						background: i === index ? '#B4D5FF' : 'transparent'
					}}
					tabIndex={i}
					className={styles.PortalRow}
					onClick={(event) => CommonClick(event, char, target)}>
					{char.images && <img src={char.images.original.url} style={{ width: 100, height: 'auto' }} />}
				</div>
			)
		} else {
			return null
		}
	})
}

const initialOption = {
	table: true,
	html: true,
	upload: true,
	image: true,
	emoji: true,
	checklist: true,
	shortcut: true,
	mention: true,
	toolbar: true,
	hoveringtoolbar: true,
	hotkeys: true,
	menu: true,
	gif: true,
	stickers: true
}

const RichEditor = (props) => {
	const { initialValue, setMessage, setHtml, editorStyle, containerStyle, footerRight, resetEditor, mentions } = props
	const channel  = {}
	const ref = useRef(null)
	const fileInputRef = useRef(null)
	const [value, setValue] = useState(initialValue.length ? initialValue : defaultValue)
	//const value = initialValue.length ? initialValue : defaultValue
	const [target, setTarget] = useState(null)
	const [chars, setChars] = useState([])
	const [index, setIndex] = useState(0)
	const [search, setSearch] = useState('')
	const [selector, setSelector] = useState('')
	const finaloption = { ...initialOption, ...props.option }
	const renderElement = useCallback((props) => <Element {...props} />, [])
	const renderLeaf = useCallback((props) => <Leaf {...props} />, [])
	const editor = useMemo(() => {
		let instance = withHistory(withReact(createEditor()))
		if (finaloption.table) {
			instance = withTables(instance)
		}
		if (finaloption.html) {
			instance = withHtml(instance)
		}
		if (finaloption.upload) {
			instance = withUploads(instance)
		}
		if (finaloption.image) {
			instance = withImages(instance)
		}
		if (finaloption.emoji) {
			instance = withEmojis(instance)
		}
		if (finaloption.checklist) {
			instance = withChecklists(instance)
		}
		if (finaloption.shortcut) {
			instance = withShortcuts(instance)
		}
		if (finaloption.mention) {
			instance = withMentions(instance)
		}
		return instance
	}, [])

	const getData = async (type = 'gifs', search) => {
		// const response = await giphySearch(type, search)
		// return response.data
	}

	const findChar = async (selector, search) => {
		if (selector === ':') {
			const data = search ? emojiIndex.search(search).slice(0, 10) : emojiIndex.search('sm').slice(0, 30)
			setChars(data)
		} else if (selector === '@') {
			const data =
				search !== ''
					? mentions.filter((c) => c.name.toLowerCase().startsWith(search?.toLowerCase())).slice(0, 10)
					: mentions
			setChars(data)
		} else if (selector === '/') {
			const data = finaloption.menu
				? editorButtons.filter((c) => c.title?.toLowerCase().startsWith(search?.toLowerCase()))
				: customeditorButtons
			setChars(data)
		} else if (selector === 'gif:') {
			const data = await getData('gifs', search)
			setChars(data)
		} else if (selector === 'stickers:') {
			const data = await getData('stickers', search)
			setChars(data)
		} else {
			setChars([])
		}
	}

	const buttonTypeAction = (char) => {
		if (char.type === 'bold' || char.type === 'italic' || char.type === 'underline' || char.type === 'code') {
			toggleMark(editor, char.type)
		} else if (char.type === 'image') {
		} else {
			toggleBlock(editor, char.type)
		}
	}
	const CommonClick = (event, char, target) => {
		event.preventDefault()
		if (selector === '@') {
			Transforms.select(editor, target)
			insertMention(editor, char)
		} else if (selector === ':') {
			Transforms.select(editor, target)
			insertEmoji(editor, char)
		} else if (selector === '/') {
			Transforms.select(editor, target)
			buttonTypeAction(char)
			Transforms.insertText(editor, '', target)
		} else if (selector === 'gif:' || selector === 'stickers:') {
			Transforms.select(editor, target)
			insertImage(editor, char.images.original.url)
		}
		setTarget(null)
		setChars([])
	}
	const onKeyDown = useCallback(
		(event) => {
			if (finaloption.hotkeys) {
				for (const hotkey in HOTKEYS) {
					if (isHotkey(hotkey, event)) {
						event.preventDefault()
						const mark = HOTKEYS[hotkey]
						toggleMark(editor, mark)
					}
				}
			}
			if (event.key === 'Enter') {
			}
			if (target) {
				// eslint-disable-next-line default-case
				switch (event.key) {
					case 'ArrowDown':
						event.preventDefault()
						const prevIndex = index >= chars.length - 1 ? 0 : index + 1
						setIndex(prevIndex)
						break
					case 'ArrowUp':
						event.preventDefault()
						const nextIndex = index <= 0 ? chars.length - 1 : index - 1
						setIndex(nextIndex)
						break
					case 'Tab':
					case 'Enter':
						event.preventDefault()
						const nIndex = index <= 0 ? 0 : index
						CommonClick(event, chars[nIndex], target)
						break
					case 'Escape':
						event.preventDefault()
						setTarget(null)
						setChars([])
						break
				}
			}
		},
		[index, search, target, chars]
	)
	const onChange = (value) => {
		setValue(value)
		if (setMessage) {
			setMessage(value)
		}
		if (setHtml) {
			setHtml(serialize(editor))
		}
		const { selection } = editor
		if (selection && Range.isCollapsed(selection)) {
			const [start] = Range.edges(selection)

			const wordBefore = Editor.before(editor, start, { unit: 'word' })
			const before = wordBefore && Editor.before(editor, wordBefore)
			const beforeRange = before && Editor.range(editor, before, start)
			const beforeText = beforeRange && Editor.string(editor, beforeRange)

			//const beforeMatchMentions = beforeText && beforeText.match(/^@(\w+)$/)-
			const beforeMatchEmoji = beforeText && beforeText.match(/^\:(\w+)$/)
			const beforeMatchButtons = beforeText && beforeText.match(/^\/(\w+)$/)

			const after = Editor.after(editor, start)
			const afterRange = Editor.range(editor, start, after)
			const afterText = Editor.string(editor, afterRange)
			const afterMatch = afterText.match(/^(\s|$)/)

			let eleselect = { ...selection }
			eleselect['anchor'] = { ...eleselect['anchor'], offset: 0 }
			const wholeText = Editor.string(editor, eleselect)

			const beforeMatchGif = wholeText && wholeText.match(/(gif:)|(\w+)$/gm)

			const beforeMatchStickers = wholeText && wholeText.match(/(stickers:)|(\w+)$/gm)

			const beforeMatchMentions = wholeText && wholeText.match(/(@:)|(\w+)$/gm)
			//const trex = /(stickers:|gif:|:|@|\/)(\w+)$/gm
			const trex = /((stickers:)|(gif:)|(@)|(:)|(\/))|(\w+)$/gm
			const word = wholeText || ''
			const match = findWordRegex(word, trex)

			if (match[0] === 'gif:' && finaloption.gif) {
				setSelector('gif:')
				setTarget(beforeRange)
				setSearch(match[1] || 'a')
				setIndex(0)
				findChar('gif:', match[1] || 'a')
				return
			} else if (match[0] === 'stickers:' && finaloption.sticker) {
				setSelector('stickers:')
				setTarget(beforeRange)
				setSearch(match[1] || 'a')
				setIndex(0)
				findChar('stickers:', match[1] || 'a')
				return
			} else if (match[0] === '@' && finaloption.mention) {
				const offset = wholeText.length - match.join('').length
				eleselect['anchor'] = { ...eleselect['anchor'], offset: offset }
				setSelector('@')
				setTarget(eleselect)
				setSearch(match[1] || '')
				setIndex(0)
				findChar('@', match[1] || '')
				return
			} else if (match[0] === ':' && finaloption.emoji) {
				const offset = wholeText.length - match.join('').length
				eleselect['anchor'] = { ...eleselect['anchor'], offset: offset }
				setSelector(':')
				setTarget(eleselect)
				setSearch(match[1] || '')
				setIndex(0)
				findChar(':', match[1] || '')
				return
			} else if (match[0] === '/' && finaloption.buttonTypeAction) {
				setSelector('/')
				setTarget(beforeRange)
				setSearch(match[1] || 'a')
				setIndex(0)
				findChar('/', match[1] || 'a')
				return
			}
		}
		setTarget(null)
		setChars([])
	}
	const fileSelectHandler = async (event) => {
		const files = event.target.files
		if (files && files.length > 0) {
			for (let i = 0; i < files.length; i++) {
				insertUpload(editor, files[i], uploadTrigger)
			}
			const text = { type: 'paragraph', children: [{ text: '' }] }
			Transforms.insertNodes(editor, text)
		}
		event.target.value = null
	}

	const uploadTrigger = async (file, element) => {
		var config = {
			onUploadProgress: (progressEvent) => {
				const path = ReactEditor.findPath(editor, element)
				var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
				const upload = { progress: percentCompleted }
				Transforms.setNodes(editor, upload, { at: path })
			}
		}
		const formData = new FormData()
		formData.append('file', file)
		const response = await uploadFile(channel.id, formData, config)
		if (response.status === 200) {
			const image = { type: 'image', children: [{ text: '' }], file: response.data, url: response.data.file_url }
			const path = ReactEditor.findPath(editor, element)
			Transforms.setNodes(editor, image, { at: path })
		}
	}
	const fileClick = () => {
		fileInputRef.current.click()
	}
	React.useEffect(() => {
		if (resetEditor) {
			setValue(defaultValue)
		}
	}, [resetEditor])
	React.useEffect(() => {
		if (target && chars.length > 0) {
			const el = ref.current
			const domRange = ReactEditor.toDOMRange(editor, target)
			const rect = domRange.getBoundingClientRect()
			el.style.top =
				rect.top + 200 > window.innerHeight
					? `${rect.top + window.pageYOffset + 24 - 224}px`
					: `${rect.top + window.pageYOffset + 24}px`
			el.style.left = `${rect.left + window.pageXOffset + 20}px`
		}
	}, [chars.length, editor, index, search, target])
	React.useEffect(() => {
		setMessage(value)
		setHtml(serialize(editor))
	}, [initialValue])
	return (
		<div className={styles.Editor} style={containerStyle}>
			<input
				accept='image/*'
				style={{ display: 'none' }}
				id='upload-image'
				type='file'
				multiple
				onChange={fileSelectHandler}
				ref={fileInputRef}
			/>
			<Slate editor={editor} value={value} onChange={onChange}>
				<Editable
					renderElement={renderElement}
					renderLeaf={renderLeaf}
					placeholder='Type Here…'
					spellCheck
					autoFocus
					onKeyDown={onKeyDown}
					className={styles.Editbox}
					style={editorStyle}
				/>
				{finaloption.toolbar === false ? null : (
					<div className={styles.Footer}>
						<div className={styles.FooterLeft}>
							<MarkButton format='bold' Icon={() => <Icon component={() => <Bold size={15} />} />} />
							<MarkButton format='italic' Icon={() => <Icon component={() => <Italic size={15} />} />} />
							<MarkButton
								format='underline'
								Icon={() => <Icon component={() => <Underline size={15} />} />}
							/>
							<MarkButton format='code' Icon={() => <Icon component={() => <Code size={15} />} />} />
							<BlockButton
								format='heading-one'
								Icon={() => <Icon component={() => <Type size={15} />} />}
							/>
							<BlockButton
								format='heading-two'
								Icon={() => <Icon component={() => <Type size={15} />} />}
							/>
							<BlockButton
								format='block-quote'
								Icon={() => <Icon component={() => <Codepen size={15} />} />}
							/>
							<BlockButton
								format='numbered-list'
								Icon={() => <Icon component={() => <List size={15} />} />}
							/>
							<BlockButton
								format='bulleted-list'
								Icon={() => <Icon component={() => <List size={15} />} />}
							/>
							<ImageUploadButton
								fileClick={fileClick}
								Icon={() => <Icon component={() => <Image size={15} />} />}
							/>
						</div>
						<div className={styles.FooterRight}>{footerRight}</div>
					</div>
				)}
				{target && chars.length ? (
					<Portal>
						<div ref={ref} className={styles.Portal}>
							<PortalContent
								chars={[...chars]}
								selector={selector}
								index={index}
								CommonClick={CommonClick}
								target={target}
							/>
						</div>
					</Portal>
				) : null}
				{finaloption.hoveringtoolbar === false ? null : <HoveringToolbar />}
			</Slate>
		</div>
	)
}

const HoveringToolbar = () => {
	const ref = React.useRef()
	const editor = useSlate()

	React.useEffect(() => {
		const el = ref.current
		const { selection } = editor

		if (!el) {
			return
		}

		if (
			!selection ||
			!ReactEditor.isFocused(editor) ||
			Range.isCollapsed(selection) ||
			Editor.string(editor, selection) === ''
		) {
			el.removeAttribute('style')
			return
		}

		const domSelection = window.getSelection()
		const domRange = domSelection.getRangeAt(0)
		const rect = domRange.getBoundingClientRect()
		el.style.opacity = '1'
		el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`
		el.style.left = `${rect.left + window.pageXOffset - el.offsetWidth / 2 + rect.width / 2}px`
	})

	return (
		<Portal>
			<div
				ref={ref}
				className={css`
					padding: 8px 7px 6px;
					position: absolute;
					z-index: 1;
					top: -10000px;
					left: -10000px;
					margin-top: -6px;
					opacity: 0;
					background-color: #222;
					border-radius: 4px;
					transition: opacity 0.75s;
					width: 100px;
					display: flex;
					justify-content: space-between;
					align-items: center;
				`}>
				<MarkButton format='bold' Icon={() => <Icon component={() => <Bold size={15} color='#FFF' />} />} />
				<MarkButton format='italic' Icon={() => <Icon component={() => <Italic size={15} color='#FFF' />} />} />
				<MarkButton
					format='underline'
					Icon={() => <Icon component={() => <Underline size={15} color='#FFF' />} />}
				/>
			</div>
		</Portal>
	)
}

const toggleBlock = (editor, format) => {
	const isActive = isBlockActive(editor, format)
	const isList = LIST_TYPES.includes(format)

	Transforms.unwrapNodes(editor, {
		match: (n) => LIST_TYPES.includes(n.type),
		split: true
	})

	Transforms.setNodes(editor, {
		type: isActive ? 'paragraph' : isList ? 'list-item' : format
	})

	if (!isActive && isList) {
		const block = { type: format, children: [] }
		Transforms.wrapNodes(editor, block)
	}
}

const toggleMark = (editor, format) => {
	const isActive = isMarkActive(editor, format)

	if (isActive) {
		Editor.removeMark(editor, format)
	} else {
		Editor.addMark(editor, format, true)
	}
}

const isBlockActive = (editor, format) => {
	const [match] = Editor.nodes(editor, {
		match: (n) => n.type === format
	})

	return !!match
}

const isMarkActive = (editor, format) => {
	const marks = Editor.marks(editor)
	return marks ? marks[format] === true : false
}

const BlockButton = ({ format, Icon }) => {
	const editor = useSlate()
	return (
		<div
			active={isBlockActive(editor, format).toString()}
			onMouseDown={(event) => {
				event.preventDefault()
				toggleBlock(editor, format)
			}}>
			<Icon />
		</div>
	)
}
const ImageUploadButton = ({ fileClick, Icon }) => {
	return (
		<div
			onMouseDown={(event) => {
				event.preventDefault()
				fileClick()
			}}>
			<Icon />
		</div>
	)
}

const MarkButton = ({ format, Icon }) => {
	const editor = useSlate()
	return (
		<div
			active={isMarkActive(editor, format).toString()}
			onMouseDown={(event) => {
				event.preventDefault()
				toggleMark(editor, format)
			}}>
			<Icon />
		</div>
	)
}

const insertMention = (editor, character) => {
	const mention = { type: 'mention', character: character.name, id: character.id, children: [{ text: '' }] }
	Transforms.insertNodes(editor, mention)
	Transforms.move(editor)
}

const insertEmoji = (editor, character) => {
	const emoji = { type: 'emoji', character, children: [{ text: '' }] }
	Transforms.insertNodes(editor, emoji)
	Transforms.move(editor)
}
const insertImage = (editor, url) => {
	const text = { text: '' }
	const image = [
		{ type: 'image', url, children: [text] },
		{
			type: 'paragraph',
			children: [{ text: '' }]
		}
	]
	Transforms.insertNodes(editor, image)
	Transforms.move(editor)
}
const insertUpload = (editor, file, uploadTrigger) => {
	const text = { text: '' }
	const upload = { type: 'upload', children: [text], progress: 0, name: file.name }
	Transforms.insertNodes(editor, upload)
	uploadTrigger(file, upload)
}
export default RichEditor
