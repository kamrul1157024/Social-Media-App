import axios from "axios";
import React from "react";
import ReactTags from "react-tag-autocomplete";
import { getAllTagsURL } from "../../../RestUrls/RestURL";
import "./TagStyle.css";

/*Convert Tags for supporing to React Plugin*/
const serverToPluginFormat = (tags) => {
  let plugInFormat = [];
  tags.forEach((tag) =>
    plugInFormat.push({ id: tag.tagId, name: tag.tagName })
  );
  return plugInFormat;
};

const pluginToSeverFormat = (tags) => {
  let serverFormat = [];
  tags.forEach((tag) =>
    serverFormat.push({ tagId: tag.id, tagName: tag.name })
  );
  return serverFormat;
};

class TagEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: [],
      suggestions: [],
    };

    this.reactTags = React.createRef();
  }

  componentDidMount() {
    axios
      .get(getAllTagsURL())
      .then((res) => {
        let plugInFormat = serverToPluginFormat(res.data);
        this.setState({ suggestions: plugInFormat });
      })
      .catch((err) => console.log(err));
  }

  onDelete(i) {
    const tags = this.state.tags.slice(0);
    tags.splice(i, 1);
    this.setState({ tags });
    this.props.setPostTags(pluginToSeverFormat(tags));
  }

  onAddition(tag) {
    const tags = [].concat(this.state.tags, tag);
    this.setState({ tags });
    console.log(this.props);
    this.props.setPostTags(pluginToSeverFormat(tags));
  }

  render() {
    return (
      <div>
        <ReactTags
          ref={this.reactTags}
          tags={this.state.tags}
          suggestions={this.state.suggestions}
          onDelete={this.onDelete.bind(this)}
          onAddition={this.onAddition.bind(this)}
        />
      </div>
    );
  }
}

export default TagEditor;
