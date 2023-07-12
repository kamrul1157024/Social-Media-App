import { toast } from "react-toastify";

const doesCommentHasProblem = (rawState) => {
  if (!rawState) return true;

  if (rawState.blocks.length == 0) {
    toast.error("Touch your keyboard before typing!");
    return true;
  }

  let title = rawState.blocks[0];
  let combined_text = "";
  let numberOfNewLines = 0;
  rawState.blocks.forEach((block) => {
    combined_text += block.text;
    numberOfNewLines++;
  });

  let isCharExist = false;

  if (!combined_text.length) {
    toast.error("Type Something!");
    return true;
  }

  const fractionOfNewLines = numberOfNewLines / combined_text.length;
  console.log(fractionOfNewLines);

  if (fractionOfNewLines > 0.6) {
    toast.error("Remove unnecessary Blank lines");
    return true;
  }

  return false;
};

export { doesCommentHasProblem };
