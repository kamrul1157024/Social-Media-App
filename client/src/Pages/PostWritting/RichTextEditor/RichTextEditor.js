import createAlignmentPlugin from "@draft-js-plugins/alignment";
import "@draft-js-plugins/alignment/lib/plugin.css";
import {
  BoldButton,
  ItalicButton,
  OrderedListButton,
  UnderlineButton,
  UnorderedListButton,
} from "@draft-js-plugins/buttons";
import createBlockDndPlugin from "@draft-js-plugins/drag-n-drop";
import Editor, { composeDecorators } from "@draft-js-plugins/editor";
import createFocusPlugin from "@draft-js-plugins/focus";
import createImagePlugin from "@draft-js-plugins/image";
import "@draft-js-plugins/image/lib/plugin.css";
import createLinkifyPlugin from "@draft-js-plugins/linkify";
import "@draft-js-plugins/linkify/lib/plugin.css";
import createResizeablePlugin from "@draft-js-plugins/resizeable";
import createToolbarPlugin, {
  Separator,
} from "@draft-js-plugins/static-toolbar";
import "@draft-js-plugins/static-toolbar/lib/plugin.css";
import {
  AtomicBlockUtils,
  convertToRaw,
  DefaultDraftBlockRenderMap,
  EditorState,
  getDefaultKeyBinding,
  KeyBindingUtil,
  RichUtils,
} from "draft-js";
import Immutable from "immutable";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import React from "react";
import { BsBlockquoteRight, BsCodeSlash } from "react-icons/bs";
import TagEditor from "../TagEditor/TagEditor";
import "./AlignmentToolStyle.css";
import AppBlockQuote from "./AppBlockQuote";
import AppSyntaxHighLighter from "./AppSyntaxHighLighter";
import "./ButtonStyle.css";
import "./RichTextEditor.css";
import "./StaticToolbarEditorStyle.css";
import { HeadlinesButton } from "./StaticToolbarHeadline";

const { hasCommandModifier } = KeyBindingUtil;

const toolbarPlugin = createToolbarPlugin();
const { Toolbar } = toolbarPlugin;

//Plugin Setup
const linkifyPlugin = createLinkifyPlugin();
const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin();
const blockDndPlugin = createBlockDndPlugin();
const alignmentPlugin = createAlignmentPlugin();
const { AlignmentTool } = alignmentPlugin;
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
  alignmentPlugin,
  resizeablePlugin,
  imagePlugin,
  toolbarPlugin,
];

class RichTextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      codeButtonColor: "black",
      blockQuoteButtonColor: "black",
    };
    this.focus = () => this.editor.focus();
    this.onChange = (editorState) => {
      this.setState({ editorState });
      console.log(convertToRaw(this.state.editorState.getCurrentContent()));
      this.props.updateEditorState(
        convertToRaw(this.state.editorState.getCurrentContent())
      );
    };

    this.onBlockQuoteClick = this._onBlockQuoteClick.bind(this);
    this.onCodeClick = this._onCodeClick.bind(this);
    this.getSelectedText = this.getSelectedText.bind(this);
    this.syntaxHighlightHandlerBlockRenderFn =
      this.syntaxHighlightHandlerBlockRenderFn.bind(this);
    this.addImageHandler = this.addImageHandler.bind(this);
    this.addVideoHandler = this.addVideoHandler.bind(this);
    this.handlePastedText = this._handlePastedText.bind(this);
    this.handleKeyCommand = this._handleKeyCommand.bind(this);
    this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
  }

  componentDidMount() {
    setTimeout(() => Prism.highlightAll(), 0);
  }

  _handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  _mapKeyToEditorCommand(e) {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(
        e,
        this.state.editorState,
        4 /* maxDepth */
      );
      if (newEditorState !== this.state.editorState) {
        this.onChange(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  }

  addImageHandler(imageSrc) {
    const contentState = this.state.editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "IMAGE",
      "IMMUTABLE",
      {
        src: imageSrc,
        style: "margin:10px",
      }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

    const newEditorState = AtomicBlockUtils.insertAtomicBlock(
      this.state.editorState,
      entityKey,
      " "
    );

    this.setState({ editorState: newEditorState });
  }

  addVideoHandler(videoSrc) {
    const contentState = this.state.editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "VIDEOTYPE",
      "IMMUTABLE",
      {
        src: videoSrc,
      }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

    const newEditorState = AtomicBlockUtils.insertAtomicBlock(
      this.state.editorState,
      entityKey,
      " "
    );

    this.setState({ editorState: newEditorState });
  }

  _handlePastedText = (pastedText) => {
    let imageRegex = new RegExp(
      "https?://.*.(?:png|PNG|jpg|JPG|gif|GIF|jpeg|JPEG)"
    );
    let isImageUrl = imageRegex.test(pastedText);
    if (isImageUrl) {
      setTimeout(this.addImageHandler.bind(this, pastedText), 0);
    }

    return false;
  };

  getSelectedText() {
    /*
    const contentState = this.state.editorState.getCurrentContent();
    const selectionState = this.state.editorState.getSelection();
    const startKey=selectionState.getStartKey()
    const endKey=selectionState.getEndKey()
    const isSameBlock = startKey === endKey;
    const startingBlock = contentState.getBlockForKey(startKey);
    let codeLines=''
    try {
      codeLines+=startingBlock.getText()+'\n'    
    if (!isSameBlock) {
      let blockKey = startKey;
  
      while (blockKey !== endKey) {
        const nextBlock = contentState.getBlockAfter(blockKey);
        codeLines+=nextBlock.getText()+'\n'
        blockKey = nextBlock.getKey();
      }
    }
  
    }
    catch(err) {}
    return codeLines;
    */
  }

  //for later Update

  _onCodeClick(e) {
    /*

    //works Same as Rich Util but it does not have togggle feature 

    const contentState = this.state.editorState.getCurrentContent();
    const selectionState = this.state.editorState.getSelection();

    const modifiedContentState= Modifier.setBlockType(
      contentState,
      selectionState,
      'header-five'
      )



    const newEditorState= EditorState.push(
      this.state.editorState,
      modifiedContentState,
      'Modified to Header'
    )



    this.setState((prevState,props)=>{return { editorState: newEditorState }})

*/

    const toggleColor = (color) => (color === "red" ? "black" : "red");

    this.setState({ codeButtonColor: toggleColor(this.state.codeButtonColor) });

    this.onChange(
      RichUtils.toggleBlockType(this.state.editorState, "header-five")
    );

    e.preventDefault();
  }

  _onBlockQuoteClick(e) {
    const toggleColor = (color) => (color === "green" ? "black" : "green");

    this.setState({
      blockQuoteButtonColor: toggleColor(this.state.blockQuoteButtonColor),
    });

    this.onChange(
      RichUtils.toggleBlockType(this.state.editorState, "block-quote")
    );

    e.preventDefault();
  }

  syntaxHighlightHandlerBlockRenderFn(contentBlock) {
    const type = contentBlock.getType();
    if (type === "header-five") {
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
      <div className="container-sm">
        <div className="sticky-top" style={{ paddingTop: "60px" }}>
          <TagEditor setPostTags={this.props.setPostTags} />
          <span onClick={this.focus}>
            <Toolbar>
              {
                // may be use React.Fragment instead of div to improve perfomance after React 16
                (externalProps) => (
                  <div>
                    <BoldButton {...externalProps} />
                    <ItalicButton {...externalProps} />
                    <UnderlineButton {...externalProps} />
                    <Separator {...externalProps} />
                    <HeadlinesButton {...externalProps} />
                    <UnorderedListButton {...externalProps} />
                    <OrderedListButton {...externalProps} />
                    <button
                      className="headlineButton"
                      style={{ color: this.state.blockQuoteButtonColor }}
                      onMouseDown={this.onBlockQuoteClick}
                    >
                      <BsBlockquoteRight />
                    </button>
                    <button
                      className="headlineButton"
                      style={{ color: this.state.codeButtonColor }}
                      onMouseDown={this.onCodeClick}
                    >
                      <BsCodeSlash />
                    </button>
                  </div>
                )
              }
            </Toolbar>
          </span>
        </div>

        <div className={className}>
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
            spellCheck={false}
            plugins={plugins}
            ref={(element) => {
              this.editor = element;
            }}
          />
          <AlignmentTool />
        </div>
      </div>
    );
  }
}

// Custom overrides for "code" style.

export default RichTextEditor;
