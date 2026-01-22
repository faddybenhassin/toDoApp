export default function handleInput(input) {
  if (!input.trim()) return;
  // 1. Parse the input into a structured object
  const [rawTitle, ...descParts] = input.split("/");
  // const tagMatch = rawTitle.match(/@(\w+)/);
  
  const newTask = {
    text: rawTitle.replace(/@\w+/, "").trim(),
    desc: descParts.join("/").trim() || "no description provided",
    // tag: tagMatch ? tagMatch[1] : "general",
  };
  return newTask;
};