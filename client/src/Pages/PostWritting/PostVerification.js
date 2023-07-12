import { toast } from "react-toastify";

const doesPostHasProblem = (rawState) => {
  let title = rawState.blocks[0];
  if (title.type != "header-one" && title.type != "header-two") {
    toast.error(
      "First Line Of your Post Must Be headline And Type of H1 Or H2!"
    );
    return true;
  }

  let combined_text = "";

  rawState.blocks.forEach((block) => (combined_text += block.text));
  if (combined_text.length < 200) {
    toast.warning("Please Elaborate Your Concept Adding More Text!");

    return true;
  }
  return false;
};

export { doesPostHasProblem };
