import { useSelected, useFocused, useReadOnly, useSlate, ReactEditor } from 'slate-react'
import { Transforms } from 'slate'
import { css } from '@emotion/css'
import Styles from './editor.module.less'

export const MentionElement = ({ attributes, children, element }) => {
	const selected = useSelected()
	const focused = useFocused()
	return (
		<span
			{...attributes}
			contentEditable={false}
			style={{
				padding: '3px 3px 2px',
				margin: '0 1px',
				verticalAlign: 'baseline',
				display: 'inline-block',
				borderRadius: '4px',
				backgroundColor: '#eee',
				fontSize: '0.9em',
				boxShadow: selected && focused ? '0 0 0 2px #B4D5FF' : 'none'
			}}>
			@{element.character}
			{children}
		</span>
	)
}
export const EmojiElement = ({ attributes, children, element }) => {
	return (
		<span
			{...attributes}
			contentEditable={false}
			style={{
				padding: '3px 3px 2px',
				margin: '0 1px',
				verticalAlign: 'baseline',
				display: 'inline-block',
				borderRadius: '4px',
				fontSize: 'inherit'
			}}>
			{element.character.native}
			{children}
		</span>
	)
}

export const ImageUpload = ({ attributes, children, element }) => {
	return (
		<div key={Date.now()} {...attributes}>
			<div
				contentEditable={false}
				style={{
					padding: '10px',
					margin: '5px 0px',
					fontSize: '1em',
					maxWidth: '80%'
				}}>
				{element.name}
				<div style={{ backgroundColor: '#EAEAEA', width: '100%' }}>
					<div style={{ width: `${element.progress}%` }} className={Styles.Progressbar} />
				</div>
			</div>
			{children}
		</div>
	)
}
export const VideoUpload = ({ attributes, children, element }) => {
	return (
		<div key={Date.now()} {...attributes}>
			<div
				contentEditable={false}
				style={{
					padding: '10px',
					margin: '5px 0px',
					fontSize: '1em',
					maxWidth: '80%'
				}}>
				{element.name}
				<div style={{ backgroundColor: '#EAEAEA', width: '100%' }}>
					<div style={{ width: `${element.progress}%` }} className={Styles.Progressbar} />
				</div>
			</div>
			{children}
		</div>
	)
}

export const AudioUpload = ({ attributes, children, element }) => {
	return (
		<div key={Date.now()} {...attributes}>
			<div
				contentEditable={false}
				style={{
					padding: '10px',
					margin: '5px 0px',
					fontSize: '1em',
					maxWidth: '80%'
				}}>
				{element.name}
				<div style={{ backgroundColor: '#EAEAEA', width: '100%' }}>
					<div style={{ width: `${element.progress}%` }} className={Styles.Progressbar} />
				</div>
			</div>
			{children}
		</div>
	)
}

export const FileElement = ({ attributes, children, element }) => {
	return element.children.map((o, i) => {
		return (
			<div key={i + Date.now()} {...attributes}>
				<div
					contentEditable={false}
					style={{
						padding: '10px',
						margin: '5px 0px',
						fontSize: '1em',
						maxWidth: '80%'
					}}>
					{element.name}
					<div style={{ backgroundColor: '#EAEAEA', width: '100%' }}>
						<div style={{ width: `${element.progress}%` }} className={Styles.Progressbar} />
					</div>
				</div>
				{children}
			</div>
		)
	})
}

export const ImageElement = ({ attributes, children, element }) => {
	const selected = useSelected()
	const focused = useFocused()
	return (
		<div {...attributes}>
			<div contentEditable={false}>
				<img
					alt={element.url}
					src={element.url}
					className={css`
						display: block;
						max-width: 25%;
						max-height: 20em;
						box-shadow: ${selected && focused ? '0 0 0 3px #B4D5FF' : 'none'};
					`}
				/>
			</div>
			{children}
		</div>
	)
}

export const CheckListItemElement = ({ attributes, children, element }) => {
	const editor = useSlate()
	const readOnly = useReadOnly()
	const { checked } = element
	return (
		<div
			{...attributes}
			className={css`
		  display: flex;
		  flex-direction: row;
		  align-items: center;
		  & + & {
			margin-top: 0;
		  }
		`}>
			<span
				contentEditable={false}
				className={css`
			margin-right: 0.75em;
		  `}>
				<input
					type='checkbox'
					checked={checked}
					onChange={(event) => {
						const path = ReactEditor.findPath(editor, element)
						Transforms.setNodes(editor, { checked: event.target.checked }, { at: path })
					}}
				/>
			</span>
			<span
				contentEditable={!readOnly}
				suppressContentEditableWarning
				className={css`
			flex: 1;
			opacity: ${checked ? 0.666 : 1};
			text-decoration: ${checked ? 'none' : 'line-through'};
			&:focus {
			  outline: none;
			}
		  `}>
				{children}
			</span>
		</div>
	)
}
