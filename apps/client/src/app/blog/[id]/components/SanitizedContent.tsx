"use client";

interface SanitizedContentProps {
  content: string;
  className?: string;
};

const SanitizedContent = (props: SanitizedContentProps) => {
  return (
    <div
      className={props.className}
      dangerouslySetInnerHTML={{ __html: props.content }}
    />
  );
};

export default SanitizedContent;