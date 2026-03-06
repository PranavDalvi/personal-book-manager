"use client";

import { TAG_OPTIONS } from "@/constants/tags";
import Select from "react-select";

const tagOptions = TAG_OPTIONS.map((tag) => ({
  value: tag,
  label: tag,
}));

export default function TagsMultiSelect({ tags, setTags }) {
  return (
    <Select
      options={tagOptions}
      isMulti
      className="text-sm"
      classNamePrefix="react-select"
      value={tagOptions.filter((opt) => tags.includes(opt.value))}
      onChange={(selected) => setTags(selected.map((opt) => opt.value))}
      placeholder="Select tags..."
    />
  );
}
