export function toReactMarkup(html: string) {
  if (!html) return html
  return (
    html
      // class -> className
      .replace(/\bclass=/g, "className=")
      // common SVG hyphenated -> camelCase
      .replace(/\bstrokeWidth=/g, "strokeWidth=")
      .replace(/\bstrokeLinecap=/g, "strokeLinecap=")
      .replace(/\bstrokeLinejoin=/g, "strokeLinejoin=")
      .replace(/\bstrokeDasharray=/g, "strokeDasharray=")
      .replace(/\bstrokeDashoffset=/g, "strokeDashoffset=")
      .replace(/\bfillRule=/g, "fillRule=")
      .replace(/\bclipRule=/g, "clipRule=")
      .replace(/\bstopColor=/g, "stopColor=")
  )
}
