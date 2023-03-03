import {
  CompositeDecorator,
  convertFromRaw,
  DefaultDraftBlockRenderMap,
  Editor,
  EditorState,
} from "draft-js";
import Immutable from "immutable";
import React, { Component } from "react";
import AppSyntaxHighLighter from "../../PostWritting/RichTextEditor/AppSyntaxHighLighter";
import "../../PostWritting/RichTextEditor/RichTextEditor.css";
import { styleMap } from "../../PostWritting/RichTextEditor/StyleControl";
import "../Comment/CommentEditor/CommentEditor.css";
import "../Comment/CommentText.css";

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

export class CommentText extends Component {
  constructor(props) {
    super(props);
    const linkDecorator = new CompositeDecorator([
      {
        strategy: linkStrategy,
        component: linkHandle,
      },
    ]);

    const commentTextInString = this.props.commentText;
    const commentTextInJSON = JSON.parse(commentTextInString);
    const storedContentState = convertFromRaw(commentTextInJSON);
    this.state = {
      editorState: EditorState.createWithContent(
        storedContentState,
        linkDecorator
      ),
    };

    this.focus = () => this.refs.editor.focus();

    this.onChange = (editorState) => {
      this.setState({ editorState });
    };
  }

  render() {
    const { editorState } = this.state;

    let className = "RichEditor-editor";

    const blockRenderMap = DefaultDraftBlockRenderMap.merge(
      Immutable.Map({
        "header-five": {
          wrapper: <AppSyntaxHighLighter />,
        },
      })
    );

    return (
      <div className="RichEditor-editor">
        <Editor
          blockRenderMap={blockRenderMap}
          customStyleMap={styleMap}
          editorState={editorState}
          onChange={this.onChange}
          ref="editor"
          spellCheck={false}
          readOnly={true}
        />
      </div>
    );
  }
}

export default CommentText;
