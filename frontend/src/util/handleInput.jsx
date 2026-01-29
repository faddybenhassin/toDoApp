export default function handleInput(input) {
  if (!input.trim()) return;

  const [rawTitle, ...descParts] = input.split("/");

  const priorityMap = {
    critical: 1,
    high: 2,
    medium: 3,
    low: 4,
    lowest: 5
  };

  const tagMatch = rawTitle.match(/@(\w+)/);
  const tagWord = tagMatch ? tagMatch[1].toLowerCase() : "";

  // FALLBACK: If the tag is missing or not in our list, default to 3 (Medium)
  const tagValue = priorityMap[tagWord] || 3; 

  return {
    text: rawTitle.replace(/@\w+/, "").trim(),
    desc: descParts.join("/").trim() || "no description provided",
    tag: tagValue, // This is now guaranteed to be a number
  };
};