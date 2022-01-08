import createAlignmentPlugin from "@draft-js-plugins/alignment";
import "@draft-js-plugins/alignment/lib/plugin.css";
import createBlockDndPlugin from "@draft-js-plugins/drag-n-drop";
import Editor, { composeDecorators } from "@draft-js-plugins/editor";
import createFocusPlugin from "@draft-js-plugins/focus";
import createImagePlugin from "@draft-js-plugins/image";
import "@draft-js-plugins/image/lib/plugin.css";
import createLinkifyPlugin from "@draft-js-plugins/linkify";
import "@draft-js-plugins/linkify/lib/plugin.css";
import createResizeablePlugin from "@draft-js-plugins/resizeable";
import "@draft-js-plugins/static-toolbar/lib/plugin.css";
import {
  convertFromRaw,
  DefaultDraftBlockRenderMap,
  EditorState,
} from "draft-js";
import Immutable from "immutable";
import "prismjs/themes/prism.css";
import React from "react";
import AppBlockQuote from "../../PostWritting/RichTextEditor/AppBlockQuote";
import AppSyntaxHighLighter from "../../PostWritting/RichTextEditor/AppSyntaxHighLighter";
import "../../PostWritting/RichTextEditor/RichTextEditor.css";

const linkifyPlugin = createLinkifyPlugin();
const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin();
const blockDndPlugin = createBlockDndPlugin();
const alignmentPlugin = createAlignmentPlugin();
const decorator = composeDecorators(
  resizeablePlugin.decorator,
  alignmentPlugin.decorator,
  focusPlugin.decorator,
  blockDndPlugin.decorator
);
const imagePlugin = createImagePlugin({ decorator });

const plugins = [
  linkifyPlugin,
  blockDndPlugin,
  focusPlugin,
  resizeablePlugin,
  imagePlugin,
  alignmentPlugin,
];

export class PostRender extends React.Component {
  constructor(props) {
    super(props);
    const storedState = JSON.parse(this.props.rawState);
    const newEditorState = convertFromRaw(storedState);
    // this.setState({ editorState: newEditorState });
    this.state = { editorState: EditorState.createWithContent(newEditorState) };
    this.syntaxHighlightHandlerBlockRenderFn =
      this.syntaxHighlightHandlerBlockRenderFn.bind(this);

    this.focus = () => this.editor.focus();
    this.onChange = (editorState) => {
      this.setState({ editorState });
    };
  }

  syntaxHighlightHandlerBlockRenderFn(contentBlock) {
    const type = contentBlock.getType();
    if (type === "code-block") {
      return {
        component: AppSyntaxHighLighter,
        props: { codeLines: contentBlock.getText() },
      };
    }
  }

  render() {
    const { editorState } = this.state;

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = "RichEditor-editor";
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== "unstyled") {
        className += " RichEditor-hidePlaceholder";
      }
    }

    const blockRenderMap = DefaultDraftBlockRenderMap.merge(
      Immutable.Map({
        "header-five": {
          wrapper: <AppSyntaxHighLighter />,
        },

        "block-quote": {
          wrapper: <AppBlockQuote />,
        },
      })
    );

    return (
      <div>
        <div className={className} onClick={this.focus}>
          <Editor
            blockRenderMap={blockRenderMap}
            // customStyleMap={styleMap}
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            handlePastedText={this.handlePastedText}
            keyBindingFn={this.mapKeyToEditorCommand}
            onChange={this.onChange}
            placeholder="Write on favourite topic..."
            ref="editor"
            readOnly={true}
            plugins={plugins}
            ref={(element) => {
              this.editor = element;
            }}
          />
        </div>
      </div>
    );
  }
}

export default PostRender;
