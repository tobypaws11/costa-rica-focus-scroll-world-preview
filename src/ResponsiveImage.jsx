const originalPrefix = "/assets/original/";

function responsiveStem(src) {
  if (!src.startsWith(originalPrefix)) return null;
  const filename = src.slice(originalPrefix.length);
  const dot = filename.lastIndexOf(".");
  return dot > 0 ? filename.slice(0, dot) : filename;
}

export function ResponsiveImage({
  src,
  alt,
  sizes = "100vw",
  loading = "lazy",
  decoding = "async",
  wide = false,
  ...props
}) {
  const stem = responsiveStem(src);

  if (!stem) {
    return <img src={src} alt={alt} loading={loading} decoding={decoding} {...props} />;
  }

  return (
    <img
      src={`/assets/responsive/${stem}-${wide ? "1920" : "1280"}.webp`}
      srcSet={wide
        ? `/assets/responsive/${stem}-640.webp 640w, /assets/responsive/${stem}-1280.webp 1280w, /assets/responsive/${stem}-1920.webp 1920w`
        : `/assets/responsive/${stem}-640.webp 640w, /assets/responsive/${stem}-1280.webp 1280w`}
      sizes={sizes}
      alt={alt}
      loading={loading}
      decoding={decoding}
      {...props}
    />
  );
}
