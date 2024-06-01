import {
  CompositeDecorator,
  convertToRaw,
  DefaultDraftBlockRenderMap,
  Editor,
  EditorState,
  RichUtils,
} from "draft-js";
import Immutable from "immutable";
import React from "react";
import { BsCodeSlash } from "react-icons/bs";
import AppSyntaxHighLighter from "../../../PostWritting/RichTextEditor/AppSyntaxHighLighter";
import "./CommentEditor.css";

const LINK_EXP =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

const LINK_REGEX = new RegExp(LINK_EXP);

const linkStrategy = (contentBlock, callBack, contentState) => {
  const text = contentBlock.getText();
  let matchArr, start;
  while ((matchArr = LINK_REGEX.exec(text)) !== null) {
    start = matchArr.index;
    callBack(start, start + matchArr[0].length);
  }
};

const linkHandle = (props) => {
  const url = props.decoratedText;
  return (
    <a href={url} style={{ color: "blue" }}>
      {props.children}
    </a>
  );
};

export class CommentEditor extends React.Component {
  constructor(props) {
    super(props);
    const linkDecorator = new CompositeDecorator([
      {
        strategy: linkStrategy,
        component: linkHandle,
      },
    ]);

    this.state = {
      editorState: EditorState.createEmpty(linkDecorator),
      boldButtonColor: "grey",
      codeButtonColor: "grey",
    };

    this.focus = () => this.refs.editor.focus();

    this.onChange = (editorState) => {
      this.setState({ editorState });
      const contentState = this.state.editorState.getCurrentContent();

      this.props.setcommentTextInRaw(convertToRaw(contentState));
    };

    this.toggleColor = (color) => (color === "grey" ? "red" : "grey");

    this.onBoldClick = this._onBoldClick.bind(this);
    this.onCodeClick = this._onCodeClick.bind(this);
    this.onPastedText = this._onPastedText.bind(this);
  }

  _onBoldClick() {
    const { editorState, boldButtonColor } = this.state;
    this.setState({ boldButtonColor: this.toggleColor(boldButtonColor) });

    this.onChange(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  }

  _onCodeClick() {
    const { editorState, codeButtonColor } = this.state;
    this.setState({ codeButtonColor: this.toggleColor(codeButtonColor) });
    this.onChange(RichUtils.toggleBlockType(editorState, "header-five"));
  }

  _onPastedText() {
    this.onChange(this.state.editorState);
  }

  render() {
    const { editorState } = this.state;

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
      })
    );

    return (
      <div className="RichEditor-root" style={{ width: "100%" }}>
        <button
          className="tool-button"
          onMouseDown={this.onBoldClick}
          style={{ color: this.state.boldButtonColor }}
        >
          B
        </button>
        <button
          className="tool-button"
          onMouseDown={this.onCodeClick}
          style={{ color: this.state.codeButtonColor }}
        >
          <BsCodeSlash />
        </button>
        <div className={className} onClick={this.focus}>
          <Editor
            blockRenderMap={blockRenderMap}
            handlePastedText={window.focus()}
            editorState={editorState}
            onChange={this.onChange}
            placeholder="Write Comment..."
            ref="editor"
            stripPastedStyles={true}
            spellCheck={true}
          />
          <div className="comment-post-button-position">
            <button
              className="comment-post-button"
              onMouseDown={this.props.onCommentPostClick}
            >
              Post Comment
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default CommentEditor;
