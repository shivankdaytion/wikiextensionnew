import { useCallback, useMemo } from 'react'
import { Editable, withReact, Slate } from 'slate-react'
import { createEditor } from 'slate'
import { withHistory } from 'slate-history'
import { withMentions, withHtml, withShortcuts, withChecklists, withEmojis, withImages, withUploads } from './Helper'
import { Element, Leaf } from './functions'

import Styles from './editor.module.less'

const PreviewEditor = (props) => {
	const { initialValue, style, id } = props
	const renderElement = useCallback((props) => <Element {...props} />, [])
	const renderLeaf = useCallback((props) => <Leaf {...props} />, [])
	const editor = useMemo(
		() =>
			withHtml(
				withUploads(
					withImages(
						withEmojis(withChecklists(withShortcuts(withMentions(withHistory(withReact(createEditor()))))))
					)
				)
			),
		[]
	)

	return (
		<div className={Styles.PrevEditor} style={style}>
			<Slate editor={editor} value={initialValue}>
				<Editable
					id={id}
					readOnly={true}
					renderElement={renderElement}
					renderLeaf={renderLeaf}
					placeholder='Type Here…'
					spellCheck
					autoFocus={false}
					className={Styles.Editbox}
				/>
			</Slate>
		</div>
	)
}

export default PreviewEditor
